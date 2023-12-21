import { Injectable } from "@nestjs/common";
import { UpdateSeatDto } from "./dto/update-seat.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Seat } from "src/entity/seat.entity";
import { Repository } from "typeorm";
import { Show } from "src/entity/show.entity";
import { CreateSeat } from "./interfaces/create-seat.interface";

@Injectable()
export class SeatService {
    constructor(
        @InjectRepository(Seat)
        private readonly seatRepository: Repository<Seat>,
    ) {}

    async generateSeatsForShow(show: Show) {
        const seatNumbers: CreateSeat[] = [];

        for (let i=1; i<show.totalSeat+1; i++) {
            seatNumbers.push({ show, seatNumber: i });
        }

        const seats = await this.createManySeat(seatNumbers);

        return seats;
    }

    private async create(show: Show, seatNumber: number) {
        const seat = await this.seatRepository.save({
            show,
            seatNumber
        })

        return seat;
    }

    private async createManySeat(createSeats: CreateSeat[]) {
        const seats = await this.seatRepository.save(createSeats);

        return seats;
    }

    findAll() {
        return `This action returns all seat`;
    }

    findOne(id: number) {
        return `This action returns a #${id} seat`;
    }

    update(id: number, updateSeatDto: UpdateSeatDto) {
        return `This action updates a #${id} seat`;
    }

    remove(id: number) {
        return `This action removes a #${id} seat`;
    }
}
