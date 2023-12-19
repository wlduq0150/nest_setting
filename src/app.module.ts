import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigProjectModule } from './config/config.module';
import { TypeormModule } from './typeorm/typeorm.module';

@Module({
  imports: [ConfigProjectModule, TypeormModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
