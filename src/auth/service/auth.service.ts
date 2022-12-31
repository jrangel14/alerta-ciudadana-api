import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/service/users.service';
import * as bcrypt from 'bcrypt';
import { GENERIC_RESPONSES } from '../../general/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userLogin: { email: string; password: string }) {
    const user = await this.usersService.findOneUserByQuery({
      email: userLogin.email,
      active: true,
    });

    if (!user) return GENERIC_RESPONSES.INVALID_DATA('credenciales invalidas');

    const { password, ...userResponse } = user.toObject();

    if (!bcrypt.compareSync(userLogin.password, password))
      return GENERIC_RESPONSES.INVALID_DATA('credenciales invalidas');

    const payload = { email: user.email, userId: user.id };

    return GENERIC_RESPONSES.SUCCES('Inicio exitoso', {
      token: this.jwtService.sign(payload),
      user: userResponse,
    });
  }
}
