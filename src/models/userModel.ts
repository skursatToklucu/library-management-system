import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BorrowedBook } from './borrowedBookModel'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => BorrowedBook, borrowedBook => borrowedBook.user)
    borrowedBooks!: BorrowedBook[];
}