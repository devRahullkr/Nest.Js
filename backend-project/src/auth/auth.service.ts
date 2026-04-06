import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(data: any) {
    const userExist = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExist) {
      throw new BadRequestException('User already exists');
    }

    const hashed = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashed,
      },
    });

    return {
      message: 'signup successfully',
      user,
    };
  }
}
