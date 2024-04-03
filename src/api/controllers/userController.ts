import { Request, Response } from "express";
import { UserService } from "../../services/userService";
import Joi from "joi";

export class UserController {
    static userService = new UserService();

    static createUser = async (req: Request, res: Response) => {
        const userSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
        });

        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Name length must be between 3 and 30" });
        }

        try {
            const result = await this.userService.createUser(req.body);
            res.status(201).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    static allUsers = async (req: Request, res: Response) => {
        try {
            const result = await this.userService.allUsers();
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    static getUser = async (req: Request, res: Response) => {
        try {
            const result = await this.userService.getUser(parseInt(req.params.id));
            res.status(201).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}