import { AppDataSource } from "../data-source";
import { User } from "../models/userModel";
import { BorrowedBook } from "../models/borrowedBookModel";
import { UserAlreadyExistsError } from "../api/errors/userAlreadyExistsError";

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async createUser(userData: User) {
        const existingUser = await this.userRepository.findOne({
            where: {
                name: userData.name
            }
        });
    
        // Eğer kullanıcı zaten varsa, bir hata fırlatın veya mevcut kullanıcıyı geri döndürün.
        if (existingUser) {
            throw new UserAlreadyExistsError(); // veya return existingUser; kullanabilirsiniz.
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
            relations: ['borrowedBooks', 'borrowedBooks.book'] 
        });
    
        if (!user) {
            throw new Error('User not found');
        }
    
        const pastBorrowedBooks: {
            name: string; userScore: number | undefined; 
        }[] = [];
        const presentBorrowedBooks: { name: string; }[] = [];
    

        user.borrowedBooks.forEach(borrowedBook => {
            const bookInfo = {
                name: borrowedBook.book.name,
                userScore: borrowedBook.score 
            };
    
            if (borrowedBook.returnedAt) {
                pastBorrowedBooks.push(bookInfo);
            } else {
                presentBorrowedBooks.push({ name: borrowedBook.book.name });
            }
        });

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