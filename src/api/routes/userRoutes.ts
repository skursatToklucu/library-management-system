import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Creates a new user
 *     description: Add a user to the library.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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
router.post('/user', UserController.createUser);



/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieves a list of users
 *     description: Get a list of all users in the library.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/user', UserController.allUsers);


/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retrieves a list of users
 *     description: Get a list of all users in the library.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer  
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/user/:id', UserController.getUser);


export default router;