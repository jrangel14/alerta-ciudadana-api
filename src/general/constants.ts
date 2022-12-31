import { HttpStatus } from '@nestjs/common';

export const GENERIC_RESPONSES = {
  NOT_FOUND: (message: string) => {
    return {
      code: HttpStatus.NOT_FOUND,
      message: message,
    };
  },
  INVALID_DATA: (message: string) => {
    return {
      code: HttpStatus.UNAUTHORIZED,
      message: message,
    };
  },
  SUCCES: (message: string, data?: any) => {
    return {
      code: HttpStatus.OK,
      message: message,
      data,
    };
  },
};
