import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigProjectModule } from './config/config.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { ShowModule } from './show/show.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { SeatModule } from './seat/seat.module';

@Module({
    imports: [
        ConfigProjectModule,
        TypeormModule.forRoot(),
        ShowModule,
        AuthModule,
        UserModule,
        BookModule,
        SeatModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
