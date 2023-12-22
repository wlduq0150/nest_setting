import { Module } from "@nestjs/common";
import { BookService } from "./book.service";
import { BookController } from "./book.controller";
import { UserModule } from "src/user/user.module";
import { ShowModule } from "src/show/show.module";
import { SeatModule } from "src/seat/seat.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "src/entity/book.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Book]),
        UserModule,
        ShowModule,
        SeatModule,
    ],
    controllers: [BookController],
    providers: [BookService],
})
export class BookModule {}
