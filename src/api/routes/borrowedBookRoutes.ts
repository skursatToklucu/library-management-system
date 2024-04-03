import express from 'express';
import { BorrowedBookController } from '../controllers/borrowedBookController';

const router = express.Router();

/**
 * @swagger
 * /borrow/{userId}/{bookId}:
 *   post:
 *     summary: Borrow
 *     description: User borrowing a book with his score
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user borrowing the book
 *         schema:
 *           type: integer
 *       - name: bookId
 *         in: path
 *         required: true
 *         description: The ID of the book to borrow
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: User borrowed a book succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BorrowedBook'
 *       409:
 *         description: Book is currently borrowed by another user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book is currently borrowed by another user"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/borrow/:userId/:bookId', BorrowedBookController.borrowBook);

/**
 * @swagger
 * /return/{userId}/{bookId}/{score}:
 *   post:
 *     summary: Return
 *     description: User returning a book with his score
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user borrowing the book
 *         schema:
 *           type: integer
 *       - name: bookId
 *         in: path
 *         required: true
 *         description: The ID of the book to borrow
 *         schema:
 *           type: integer
 *       - name: score
 *         in: path
 *         required: true
 *         description: The Score of the book returned
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: User returning a book with his score
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BorrowedBook'
 *       400:
 *         description: Bad request. Validation failed for the input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Score must be between 0 and 5."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/return/:userId/:bookId/:score', BorrowedBookController.returnBook);

export default router;