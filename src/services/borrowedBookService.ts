import { AppDataSource } from '../data-source';
import { Book } from '../models/bookModel';
import { User } from '../models/userModel';
import { BorrowedBook } from '../models/borrowedBookModel';
import { IsNull } from 'typeorm';

export class BorrowedBookService {
    private bookRepository = AppDataSource.getRepository(Book);
    private userRepository = AppDataSource.getRepository(User);
    private borrowRepository = AppDataSource.getRepository(BorrowedBook);

    async borrowBook(userId: number, bookId: number) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const book = await this.bookRepository.findOne({ where: { id: bookId } });

        if (!user || !book)
            throw new Error('User or Book not found');

        const borrowedBook = this.borrowRepository.create({
            user,
            book,
            borrowedAt: new Date()
        });

        await this.borrowRepository.save(borrowedBook);
    }

    async returnBook(userId: number, bookId: number, score: number) {
        const borrowedBook = await this.borrowRepository.findOne({
            where: {
                user: { id: userId },
                book: { id: bookId },
                returnedAt: IsNull()
            },
            relations: ['user', 'book']
        });

        if (!borrowedBook)
            throw new Error('Borrowed book record not found');

        borrowedBook.borrowedAt = new Date(0);
        borrowedBook.returnedAt = new Date();
        borrowedBook.score = score;

        await this.borrowRepository.save(borrowedBook);
    }
}