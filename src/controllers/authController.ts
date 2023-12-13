import { authService } from "../services/authService";
import { Request, Response } from "express";

const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    try {
        const login = await authService.login(email, senha);
        res.status(200).send(login);
    } catch (error) {
        res.status(400).send("Erro ao tentar login!");
    }
}

export const authController = {
    login,
}