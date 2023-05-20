import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FarmairModule } from './farmair/farmair.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/impetus-dev'),
    FarmairModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
