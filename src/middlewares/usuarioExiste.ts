import { Request, Response, NextFunction } from "express";
import { usuarioService } from "../services/usuarioService";

export const usuarioExiste = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;
    const usuario = await usuarioService.buscarUsuarioPorEmail(email as string);

    if(!usuario){
        return res.status(404).send("Usuário não encontrado!");
    }

    next();
}