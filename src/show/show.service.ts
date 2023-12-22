import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateShowDto } from "./dto/create-show.dto";
import { UpdateShowDto } from "./dto/update-show.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Show } from "src/entity/show.entity";
import { Repository } from "typeorm";
import { SeatService } from "src/seat/seat.service";

@Injectable()
export class ShowService {
    constructor(
        @InjectRepository(Show)
        private readonly showRepository: Repository<Show>,
        private readonly seatService: SeatService,
    ) {}

    async createShow(createShowDto: CreateShowDto) {
        const show = await this.showRepository.save(createShowDto);

        const seats = await this.seatService.generateSeatsForShow(show);

        return show;
    }

    async findAllShow(onlyName: boolean) {
        return await this.showRepository.find({
            select: onlyName ? ["name"] : [],
        });
    }

    async findShowDetail(id: number) {
        const show = await this.showRepository.findOne({
            where: { id },
            relations: {
                seats: true,
                books: true,
            },
        });

        if (!show) {
            throw new NotFoundException("존재하지 않는 공연입니다.");
        }

        const isBookPossible =
            show.totalSeat - show.books.length > 0 ? true : false;

        return {
            ...show,
            isBookPossible,
        };
    }

    async findShowByName(name: string) {
        const show = await this.showRepository.findOne({
            where: { name },
        });

        if (!show) {
            throw new NotFoundException("존재하지 않는 공연입니다.");
        }

        return show;
    }

    async findShowById(id: number) {
        const show = await this.showRepository.findOne({
            where: { id },
        });

        if (!show) {
            throw new NotFoundException("존재하지 않는 공연입니다.");
        }

        return show;
    }

    // update(id: number, updateShowDto: UpdateShowDto) {
    //     return `This action updates a #${id} show`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} show`;
    // }
}
