import { Request, Response } from "express";
import { UserService } from "../../services/userService";

export class UserController {
    static userService = new UserService();

    static createUser = async (req: Request, res: Response) => {
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