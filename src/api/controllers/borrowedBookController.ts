import { Request, Response } from 'express';
import { BorrowedBookService } from '../../services/borrowedBookService'; // Yolunuz doğru olduğunu varsayıyorum

export class BorrowedBookController {
    static borrowedBookService = new BorrowedBookService();

    static borrowBook = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.params.userId);
            const bookId = parseInt(req.params.bookId);
            const result = await this.borrowedBookService.borrowBook(userId, bookId);
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    };

    static returnBook = async (req: Request, res: Response) => {
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
