import { AppDataSource } from '../data-source';
import { Book } from '../models/bookModel';
import { User } from '../models/userModel';
import { BorrowedBook } from '../models/borrowedBookModel';
import { IsNull } from 'typeorm';
import { BookAlreadyBorrowedException } from '../api/errors/bookAlreadyBorrowedException';
import { BookNotFoundException } from '../api/errors/bookNotFoundException';

export class BorrowedBookService {
    private bookRepository = AppDataSource.getRepository(Book);
    private userRepository = AppDataSource.getRepository(User);
    private borrowRepository = AppDataSource.getRepository(BorrowedBook);

    async borrowBook(userId: number, bookId: number) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const book = await this.bookRepository.findOne({ where: { id: bookId } });

        if (!user || !book)
            throw new Error('User or Book not found');

        const borrowedBookRecord = await this.borrowRepository.findOne({
            where: {
                book: { id: bookId },
                returnedAt: IsNull()
            }
        });

        if (borrowedBookRecord)
            throw new BookAlreadyBorrowedException();


        const borrowedBook = this.borrowRepository.create({
            user,
            book,
            borrowedAt: new Date(),
            returnedAt: null
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
            throw new BookNotFoundException();

        borrowedBook.borrowedAt = null;
        borrowedBook.returnedAt = new Date();
        borrowedBook.score = score;

        await this.borrowRepository.save(borrowedBook);
    }
}