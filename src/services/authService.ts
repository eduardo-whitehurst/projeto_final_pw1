import { PrismaClient } from "@prisma/client";

const { sign } = require('jsonwebtoken');
const { compare } = require('bcryptjs');

const prisma = new PrismaClient();

const login = async (email: string, senha: string) => {
    const usuario = await prisma.usuario.findUnique({
        where: {
            email,
        }
    })

    if(!usuario){
        throw new Error('Usuário não cadastrado!');
    }

    const senhaIgual = await compare(senha, usuario.senha);

    if(!senhaIgual){
        throw new Error('Email ou senha invalido!');
    }

    const acessToken = sign({
        id: usuario.id,
        email: usuario.email,
    }, process.env.JSON_SECRET, {
        expiresIn: '1y',
    })

    return { acessToken };
}

export const authService = {
    login,
}