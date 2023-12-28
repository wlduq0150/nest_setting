import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    Relation,
} from "typeorm";
import { Show } from "./show.entity";
import { Book } from "./book.entity";

@Entity({
    name: "seats", // 데이터베이스 테이블의 이름
})
export class Seat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    seatNumber: number;

    @OneToOne(() => Book, (book) => book.seat)
    book: Relation<Book>;

    @ManyToOne(() => Show, (show) => show.seats, {
        nullable: false,
        onDelete: "CASCADE",
    })
    show: Relation<Show>;
}
