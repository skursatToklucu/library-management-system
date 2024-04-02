import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BorrowedBook } from './borrowedBookModel';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    name!: string;

  // Kitap puanlarını tutmak için ilişki
  @OneToMany(() => BorrowedBook, borrowedBook => borrowedBook.book)
    borrowedBooks!: BorrowedBook[];
}
