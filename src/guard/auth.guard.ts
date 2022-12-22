import { ExecutionContext, Injectable } from '@nestjs/common';
import { CanActivate } from '@nestjs/common/interfaces/features/can-activate.interface';
import { AuthGuard } from '@nestjs/passport';
import { validate } from 'class-validator';

@Injectable()
//implements CanActivate
export class JwtAuthGuard extends AuthGuard('jwt') {}
