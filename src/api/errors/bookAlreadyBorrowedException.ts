import { CustomError } from './customError';

export class BookAlreadyBorrowedException extends CustomError {
  constructor(message: string = 'Book is currently borrowed by another user') {
    super(message, 409);
  }
}