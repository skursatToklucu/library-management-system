import { CustomError } from './customError';

export class UserNotFoundException extends CustomError {
  constructor(message: string = 'User not found') {
    super(message, 404);
  }
}