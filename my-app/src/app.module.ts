import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PizzaModule } from './pizza/pizza.module';

@Module({
  imports: [PizzaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
