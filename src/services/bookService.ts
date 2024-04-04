import { BookNotFoundException } from '../api/errors/bookNotFoundException';
import { AppDataSource } from '../data-source';
import { Book } from '../models/bookModel';
import { BorrowedBook } from '../models/borrowedBookModel';

export class BookService {
    private bookRepository = AppDataSource.getRepository(Book);

    async allBooks() {
        return this.bookRepository.find();
    }

    async getBook(id: number) {
        // Kitabın kendisini bul
        const book = await this.bookRepository.findOne({
          where: { id },
          relations: ['borrowedBooks'],
        });
      
        if (!book) {
          throw new BookNotFoundException();
        }
      
        const scores = book.borrowedBooks
          .filter(borrowedBook => borrowedBook.score != null)
          .map(borrowedBook => borrowedBook.score as number);
      
        const averageScore = scores.length
          ? scores.reduce((acc, cur) => acc + cur, 0) / scores.length
          : null; 
      
        return {
          name: book.name,
          averageScore: averageScore,
        };
      }
      

    async createBook(bookData: Book) {
        const book = this.bookRepository.create(bookData);
        return this.bookRepository.save(book);
    }
}
