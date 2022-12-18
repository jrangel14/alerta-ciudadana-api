import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'Primer nombre es requerido' })
  @IsString()
  firstName: string;

  @IsOptional()
  secondName: string;

  @IsNotEmpty({ message: 'Primer apellido es requerido' })
  @IsString()
  surname: string;

  @IsOptional()
  secondSurname: string;

  @IsNotEmpty()
  document: string;

  @IsNotEmpty({ message: 'Email es requerido' })
  @IsEmail({}, { message: 'Email no valido' })
  email: string;

  @IsNotEmpty({ message: 'Contraseña es requerida' })
  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;
}
