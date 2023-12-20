import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { Book } from "./book.entity";
import { Show } from "./show.entity";

enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

@Entity({
    name: "users", // 데이터베이스 테이블의 이름
})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    currentRefreshToken?: string;

    @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
    role: UserRole

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Book, (book) => (book.user))
    books: Relation<Book>[];

    @ManyToMany(() => Show, (show) => (show.users))
    shows: Relation<Show>[];
}