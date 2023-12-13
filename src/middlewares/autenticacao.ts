import { Request, Response, NextFunction } from "express";

const {verify, decode} = require('jsonwebtoken');

export const autenticacao = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).send("Acess token não informado!");
    }

    const [, acessToken] = token.split(" ");

    try {
        verify(acessToken, process.env.JSON_SECRET);

        const {id, email} = await decode(acessToken);

        return next();
    } catch (error) {
        res.status(401).send('Usuário não autorizado!');
    }
}
