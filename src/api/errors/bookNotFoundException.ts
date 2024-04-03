import { CustomError } from './customError';

export class BookNotFoundException extends CustomError {
  constructor(message: string = 'Book not found') {
    super(message, 404);
  }
}