import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { Show } from "./show.entity";
import { Seat } from "./seat.entity";
import { User } from "./user.entity";

@Entity({
    name: "books", // 데이터베이스 테이블의 이름
})
export class Book {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Seat, (seat) => (seat.book))
    @JoinColumn()
    seat: Relation<Seat>;

    @ManyToOne(() => Show, (show) => (show.books))
    show: Relation<Show>;

    @ManyToOne(() => User, (user) => (user.books))
    user: Relation<User>;
}