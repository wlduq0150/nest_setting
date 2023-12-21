import { Show } from "src/entity/show.entity";

export interface CreateSeat {
    show: Show;
    seatNumber: number;
}