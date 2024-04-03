import { Request, Response } from "express";
import { BookService } from "../../services/bookService";
import Joi from "joi";

export class BookController {
    static bookService = new BookService();

    static getAllBook = async (req: Request, res: Response) => {
        try {
            const result = await this.bookService.allBooks();
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    };

    static getBook = async (req: Request, res: Response) => {
        try {
            const result = await this.bookService.getBook(parseInt(req.params.id));
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    };


    static createBook = async (req: Request, res: Response) => {
        const bookSchema = Joi.object({
            name: Joi.string().min(1).max(30).required(),
        });

        const { error } = bookSchema.validate(req.body);
        if (error) {
            bookSchema
            return res.status(400).json({ message: "Name length must be between 3 and 30" });
        }

        try {
            const result = await this.bookService.createBook(req.body);
            res.status(201).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    };
}