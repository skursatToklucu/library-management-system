import { Request, Response } from 'express';
import { BorrowedBookService } from '../../services/borrowedBookService';
import Joi from 'joi';

export class BorrowedBookController {
    static borrowedBookService = new BorrowedBookService();

    static borrowBook = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.params.userId);
            const bookId = parseInt(req.params.bookId);
            const result = await this.borrowedBookService.borrowBook(userId, bookId);
            res.status(200).send(result);
        } catch (error: any) {
            if (error.message === 'User not found' || error.message === 'Book not found') {
                res.status(404).send({ message: error.message });
            } else if (error.message === 'Book is currently borrowed') {
                res.status(409).send({ message: error.message });
            } else {
                res.status(500).send({ message: 'Internal Server Error' });
            }
        }
    };


    static returnBook = async (req: Request, res: Response) => {
        const scoreSchema = Joi.object({
            score: Joi.number().min(0).max(5).required()
        })

        const { error } = scoreSchema.validate({ score: parseInt(req.params.score) });
        if (error) {
            return res.status(400).json({ message: "Score must be between 0 and 5." });
        }

        try {
            const userId = parseInt(req.params.userId);
            const bookId = parseInt(req.params.bookId);
            const score = parseInt(req.params.score);
            const result = await this.borrowedBookService.returnBook(userId, bookId, score);
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    };
}
