import { BadRequestException, Body, Injectable, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

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

  async login(data: any) {
    const isUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!isUser) {
      throw new BadRequestException('User not found');
    }

    const isMatch = await bcrypt.compare(data.password, isUser.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid Password');
    }

    const accessToken = jwt.sign(
      { userId: isUser.id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' },
    );

    const refreshToken = jwt.sign(
      { userId: isUser.id },
      process.env.REFRESH_SECRET,
      { expiresIn: '7d' },
    );

    await this.prisma.user.update({
      where: { id: isUser.id },
      data: { refreshToken },
    });

    return {
      message: 'Login success',
      accessToken,
      refreshToken,
    };
  }
}
