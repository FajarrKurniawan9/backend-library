import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  getInfo(): object {
    return {
      message: `Library API v1`,
      feature: `books`,
    };
  }
}
