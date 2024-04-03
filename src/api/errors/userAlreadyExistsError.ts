import { CustomError } from './customError';

export class UserAlreadyExistsError extends CustomError {
    constructor(message: string = 'User already exists') {
        super(message, 409);
    }
}