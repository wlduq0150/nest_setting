import {
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
} from "@nestjs/common";
import { CreateBookWithoutSelect } from "./dto/createBookWithoutSelect.dto";
import { CreateBookWithSelect } from "./dto/createBookWithSelect.dto";
import { UserService } from "src/user/user.service";
import { ShowService } from "src/show/show.service";
import { SeatService } from "src/seat/seat.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "src/entity/book.entity";
import { DataSource, Repository } from "typeorm";
import { compareDateTime } from "./function/timeCompare.function";
import { getCurrentTime } from "./function/currentTime.function";

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
        private readonly userService: UserService,
        private readonly showService: ShowService,
        private readonly seatService: SeatService,
        private readonly dataSource: DataSource,
    ) {}

    async bookWithoutSelect(
        userId: number,
        createBookDto: CreateBookWithoutSelect,
    ) {
        const { showId } = createBookDto;

        const user = await this.userService.findUserById(userId);
        if (!user) {
            throw new NotFoundException("존재하지 않는 유저입니다.");
        }

        const showData = await this.showService.findShowDetail(showId);
        if (!showData) {
            throw new NotFoundException("존재하지 않는 공연입니다.");
        }

        if (!showData.isBookPossible) {
            throw new UnprocessableEntityException("이미 예약이 다 찼습니다.");
        }

        if (user.money < showData.price) {
            throw new ForbiddenException("소지금이 부족합니다.");
        }

        await this.userService.update(userId, {
            money: user.money - showData.price,
        });

        const show = await this.showService.findShowById(showId);

        const book = await this.bookRepository.save({
            user,
            show,
        });

        return {
            bookId: book.id,
            date: show.date,
            time: show.time,
            place: show.place,
            price: show.price,
        };
    }

    async bookWithSelect(userId: number, createBookDto: CreateBookWithSelect) {
        const { showId, seatNumber } = createBookDto;

        const user = await this.userService.findUserById(userId);
        if (!user) {
            throw new NotFoundException("존재하지 않는 유저입니다.");
        }

        const show = await this.showService.findShowById(showId);
        const showData = await this.showService.findShowDetail(showId);
        if (!showData) {
            throw new NotFoundException("존재하지 않는 공연입니다.");
        }
        if (!showData.isBookPossible) {
            throw new UnprocessableEntityException("이미 예약이 다 찼습니다.");
        }

        const seat = await this.seatService.findSeatByCondition(
            showId,
            seatNumber,
        );
        if (!seat) {
            throw new NotFoundException("존재하지 않는 좌석입니다.");
        }

        if (user.money < showData.price) {
            throw new ForbiddenException("소지금이 부족합니다.");
        }

        /// 트랜잭션
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            user.money = user.money - showData.price;

            await queryRunner.manager.save(user);

            const isBook = await this.findBookByCondition(showId, seat.id);
            if (isBook) {
                throw new ConflictException("이미 예약되어 있습니다.");
            }

            const book = this.bookRepository.create({
                seat,
                show,
                user,
            });

            await queryRunner.manager.save(Book, book);

            await queryRunner.commitTransaction();

            return {
                bookId: book.id,
                date: show.date,
                time: show.time,
                place: show.place,
                price: show.price,
                seat: seatNumber,
            };
        } catch (e) {
            await queryRunner.rollbackTransaction();
            throw e;
        } finally {
            await queryRunner.release();
        }
    }

    async findMyBooks(userId: number) {
        const books = await this.bookRepository
            .createQueryBuilder("book")
            .leftJoinAndSelect("book.user", "user")
            .select(["book.id", "user.id"])
            .where("user.id = :userId", { userId })
            .getMany();

        return books;
    }

    private async findBookByCondition(showId: number, seatId: number) {
        const book = await this.bookRepository
            .createQueryBuilder("book")
            .leftJoinAndSelect("book.show", "show")
            .leftJoinAndSelect("book.seat", "seat")
            .where("show.id = :showId", { showId })
            .where("seat.id = :seatId", { seatId })
            .getOne();

        return book;
    }

    async cancleBook(bookId: number, userId: number) {
        const book = await this.bookRepository.findOne({
            where: { id: bookId },
            relations: {
                user: true,
                show: true,
                seat: true,
            },
        });
        if (!book) {
            throw new NotFoundException("존재하지 않는 예약입니다.");
        }

        const user = await this.userService.findUserById(book.user.id);

        if (user.id !== userId) {
            throw new ForbiddenException("본인의 예약만 취소할 수 있습니다.");
        }

        const currentTime = getCurrentTime();
        const showTime =
            `${book.show.date.toISOString().slice(0, 10)}` +
            `/${book.show.time}`;

        const isCancle = compareDateTime(currentTime, showTime);

        if (!isCancle) {
            throw new UnprocessableEntityException(
                "예약은 공연 시작 시점으로 3시간 이전에만 취소가 가능합니다.",
            );
        }

        await this.userService.update(user.id, {
            money: user.money + book.show.price,
        });

        await this.bookRepository.remove(book);

        return true;
    }
}
