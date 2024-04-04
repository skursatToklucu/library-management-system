import { DataSource } from 'typeorm';
import { Book } from './models/bookModel';
import { User } from './models/userModel';
import { BorrowedBook } from './models/borrowedBookModel';

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "path/to/database.sqlite", 
    entities: [Book, User, BorrowedBook],
    synchronize: true,
    logging: false,
});


AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((error) => console.error("Error during Data Source initialization", error));
