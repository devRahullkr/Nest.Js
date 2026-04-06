import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('signup')
  signup(@Body() body: any) {
    return this.authservice.signup(body);
  }

  @Post("login")
  login(@Body() body:any){
    return this.authservice.login(body)
  }
}
