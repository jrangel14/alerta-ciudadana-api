import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/service/users.service';
import * as bcrypt from 'bcrypt';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: { email: string; password: string }): Promise<{
    code: HttpStatus;
    message: string;
    data?: any;
  }> {
    const userSearch = await this.usersService.findOneUserByQuery({
      email: user.email,
    });
    console.log(userSearch);
    if (!userSearch)
      return {
        code: HttpStatus.NOT_FOUND,
        message: 'Usuario no encontrado',
      };
    const { password } = userSearch;
    const passwordIsValid = bcrypt.compareSync(user.password, password);
    if (!passwordIsValid)
      return {
        code: HttpStatus.BAD_REQUEST,
        message: 'Credenciales no validas',
      };

    const payload = { email: userSearch.email, sub: userSearch.id };

    return {
      code: HttpStatus.OK,
      message: 'Inicio de sesion exitoso',
      data: {
        token: this.jwtService.sign(payload),
      },
    };
  }
}
