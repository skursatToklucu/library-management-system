import { Router } from 'express';
import { BookController } from '../controllers/bookController';

const router = Router();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieves a list of books
 *     description: Get a list of all books in the library.
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/books', BookController.getAllBook);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Creates a new book
 *     description: Add a new book to the library.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: The book was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
router.post('/books', BookController.createBook);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Retrieves a single book
 *     description: Get a book by its ID from the library.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the book to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
router.get('/books/:id', BookController.getBook);

export default router;
