import { Injectable } from '@nestjs/common';

@Injectable()
export class PizzaService {
  getAllPizza() {
    // console.log("Service hits")
    return ['cheese pizza', 'Veg Pizza'];
  }

  getPizzaById(id: string) {
    // console.log("service id",id)
    return `Pizza ${id} ready.`;
  }

  createPizza(data: unknown) {
    // console.log('Service data', zamzam);
    return {
      message: 'Pizza created 🍕',
      data,
    };
  }
}
