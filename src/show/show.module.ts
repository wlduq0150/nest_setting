import { Module } from "@nestjs/common";
import { ShowService } from "./show.service";
import { ShowController } from "./show.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Show } from "src/entity/show.entity";
import { AuthModule } from "src/auth/auth.module";
import { SeatModule } from "src/seat/seat.module";

@Module({
    imports: [TypeOrmModule.forFeature([Show]), AuthModule, SeatModule],
    controllers: [ShowController],
    providers: [ShowService],
})
export class ShowModule {}
