import { AppDataSource } from "../data-source";
import { User } from "../models/userModel";
import { BorrowedBook } from "../models/borrowedBookModel";

export class UserService {
    private userRepository = AppDataSource.getRepository(User);
    private borrowedRepository = AppDataSource.getRepository(BorrowedBook);

    async createUser(userData: User) {
        const existingUser = await this.userRepository.findOne({
            where: {
                name: userData.name
            }
        });
    
        // Eğer kullanıcı zaten varsa, bir hata fırlatın veya mevcut kullanıcıyı geri döndürün.
        if (existingUser) {
            throw new Error('User already exists'); // veya return existingUser; kullanabilirsiniz.
        }
    
        // Eğer kullanıcı mevcut değilse, yeni bir kullanıcı oluşturun ve kaydedin.
        const newUser = this.userRepository.create(userData);
        await this.userRepository.save(newUser);
    }

    async allUsers() {
        return this.userRepository.find();
    }

    async getUser(id: number) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['borrowedBooks', 'borrowedBooks.book'] // ilişkili borrowedBooks ve kitapları dahil edin
        });
    
        if (!user) {
            throw new Error('User not found');
        }
    
        const pastBorrowedBooks: {
            name: string; userScore: number | undefined; // score null ise bu alan dönüşte olmayacak
        }[] = [];
        const presentBorrowedBooks: { name: string; }[] = [];
    
        // Şu an ödünç alınan kitapları ve geçmişte ödünç alınan kitapları ayrıştır
        user.borrowedBooks.forEach(borrowedBook => {
            const bookInfo = {
                name: borrowedBook.book.name,
                userScore: borrowedBook.score // score null ise bu alan dönüşte olmayacak
            };
    
            if (borrowedBook.returnedAt) {
                pastBorrowedBooks.push(bookInfo);
            } else {
                presentBorrowedBooks.push({ name: borrowedBook.book.name });
            }
        });
    
        // Yeni JSON yapısını oluştur
        const userBorrowedBooksInfo = {
            id: user.id,
            name: user.name,
            books: {
                past: pastBorrowedBooks,
                present: presentBorrowedBooks
            }
        };
    
        return userBorrowedBooksInfo;
    }
    
}