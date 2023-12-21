import { Module } from '@nestjs/common';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from 'src/entity/show.entity';
import { UserRoleGuard } from 'src/auth/guard/user-role.guard';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Show]), AuthModule],
  controllers: [ShowController],
  providers: [ShowService],
})
export class ShowModule {}
