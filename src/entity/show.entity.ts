import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
} from "typeorm";
import { Seat } from "./seat.entity";
import { Book } from "./book.entity";
import { User } from "./user.entity";

@Entity({
    name: "shows", // 데이터베이스 테이블의 이름
})
export class Show {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    date: Date;

    @Column()
    time: string;

    @Column()
    place: string;

    @Column({ nullable: true })
    thumbnail?: string;

    @Column()
    category: string;

    @Column()
    totalSeat: number;

    @Column()
    price: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Seat, (seat) => seat.show)
    seats: Relation<Seat>[];

    @OneToMany(() => Book, (book) => book.show)
    books: Relation<Book>[];

    // @ManyToMany(() => User, (user) => (user.shows))
    // @JoinTable()
    // users: Relation<User>[];
}
