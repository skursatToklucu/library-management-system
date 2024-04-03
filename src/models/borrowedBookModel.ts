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

  @Column({ type: 'datetime', nullable: true })
  borrowedAt?: Date | null;

  @Column({ type: 'datetime', nullable: true })
  returnedAt?: Date | null;
}


