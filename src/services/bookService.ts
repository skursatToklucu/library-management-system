import { AppDataSource } from '../data-source';
import { Book } from '../models/bookModel';
import { BorrowedBook } from '../models/borrowedBookModel';

export class BookService {
    private bookRepository = AppDataSource.getRepository(Book);
    private borrowedRepository = AppDataSource.getRepository(BorrowedBook);

    async allBooks() {
        return this.bookRepository.find();
    }

    async getBook(id: number) {
        // Kitabın kendisini bul
        const book = await this.bookRepository.findOne({
          where: { id },
          relations: ['borrowedBooks'],
        });
      
        // Kitap bulunamazsa hata fırlat
        if (!book) {
          throw new Error('Book not found');
        }
      
        // İlgili kitaba ait ödünç kayıtlarından puanları çıkar
        const scores = book.borrowedBooks
          .filter(borrowedBook => borrowedBook.score != null)
          .map(borrowedBook => borrowedBook.score as number);
      
        // Puanların ortalamasını hesapla
        const averageScore = scores.length
          ? scores.reduce((acc, cur) => acc + cur, 0) / scores.length
          : null; // Eğer puan yoksa, ortalama null olabilir
      
        // Sonucu JSON olarak döndür
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
