import { Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from 'src/entity/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seat])],
  exports: [SeatService],
  providers: [SeatService],
})
export class SeatModule {}
