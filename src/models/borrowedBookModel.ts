import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './userModel';
import { Book } from './bookModel';

@Entity()
export class BorrowedBook {
  @PrimaryGeneratedColumn()
    id!: number;

  @ManyToOne(() => User, user => user.borrowedBooks)
    user!: User;

  @ManyToOne(() => Book, book => book.borrowedBooks)
    book!: Book;

  @Column({ nullable: true })
  score?: number;

  @Column('datetime') // 'timestamp' yerine 'datetime' kullanın
    borrowedAt!: Date; // Doğrudan Date nesnesi

  @Column({ type: 'datetime', nullable: true }) // Nullable olarak tanımlanabilir
  returnedAt?: Date; // Doğrudan Date nesnesi, henüz iade edilmemişse null
}


