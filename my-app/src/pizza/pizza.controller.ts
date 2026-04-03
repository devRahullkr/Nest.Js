import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PizzaService } from './pizza.service';

@Controller('pizza')
export class PizzaController {
  constructor(private pizzaService: PizzaService) {}
  @Get()
  getPizza() {
    // console.log("controller hits")
    return this.pizzaService.getAllPizza();
  }

  @Get(':id')
  getPizzaById(@Param('id') id: string) {
    // console.log("controller id",id)
    return this.pizzaService.getPizzaById(id);
  }

  @Post()
  createPizza(@Body() body: any) {
    console.log('controller body: ', body);
    return this.pizzaService.createPizza(body);
  }
}
