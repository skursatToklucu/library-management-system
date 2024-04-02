import express from 'express';
import { BorrowedBookController } from '../controllers/borrowedBookController';

const router = express.Router();

/**
 * @swagger
 * /borrowedBooks/{userId}/{bookId}:
 *   post:
 *     summary: Creates a new book
 *     description: Add a new book to the library.
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
 *         description: The book was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BorrowedBook'
 */
router.post('/borrowedBooks/:userId/:bookId', BorrowedBookController.borrowBook);

/**
 * @swagger
 * /borrowedBooks/{userId}/{bookId}/{score}:
 *   post:
 *     summary: Creates a new book
 *     description: Add a new book to the library.
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
 *         description: The Scoure of the book returned
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: The book was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BorrowedBook'
 */
router.post('/borrowedBooks/:userId/:bookId/:score', BorrowedBookController.returnBook);

export default router;