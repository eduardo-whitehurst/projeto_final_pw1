import { UsuarioDTO } from "../dtos/usuarioDto";
import { response as res } from "express";
import { PrismaClient } from "@prisma/client";
import { validacaoUsuarioYup } from "../utils/validacaoUsuarioYup";

const { hash } = require("bcryptjs");

const prisma = new PrismaClient();

const usuarioExiste = async (email: string) => {
    const usuario = await prisma.usuario.findUnique({
        where: {
            email,
        }
    })

    return usuario ? true : false;
}

const criarUsuario = async (usuario: UsuarioDTO) => {
    const validacaoDeErros = await validacaoUsuarioYup(usuario);

    if (validacaoDeErros) {
        return { message: [...validacaoDeErros.errors], statusCode: 400 };
    }

    if (await usuarioExiste(usuario.email)) {
        return res.status(400).send("Usuário já existe no nosso sistema!");
    }

    try {
        const senhaHash = await hash(usuario.senha, 8);

        const novoUsuario = await prisma.usuario.create({
            data: {
                nome: usuario.nome,
                cpf: usuario.cpf,
                email: usuario.email,
                senha: senhaHash
            }
        })

        if (!novoUsuario) {
            throw new Error('Usuario não foi cadastrado!');
        }

        return novoUsuario;
    } catch (error) {
        throw new Error('Erro ao cadastrar usuario!');
    }
}

const buscarTodosUsuarios = async () => {
    return await prisma.usuario.findMany();
}

const buscarUsuarioPorId = async (id: string) => {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: id,
            }
        })
        return usuario;

    } catch (error) {
        throw new Error('Erro ao tentar buscar usuário por id!');
    }


}

const editarUsuario = async (usuario: UsuarioDTO) => {
    const usuarioAtualizado = await prisma.usuario.update({
        where: {
            id: usuario.id,
        },
        data: {
            nome: usuario.nome,
            cpf: usuario.cpf,
            email: usuario.email,
            senha: await hash(usuario.senha, 8),
        }
    })

    if (!usuarioAtualizado) {
        throw new Error("Erro ao atualizar o usuário!");
    }

    return usuarioAtualizado;
}

const deletarUsuario = async (id: string) => {
    const usuario = await buscarUsuarioPorId(id);

    if (!usuario) {
        throw new Error("Usuário não encontrado!");
    }

    const usuarioDeletado = await prisma.usuario.delete({
        where: {
            id: id,
        }
    })

    return usuarioDeletado;
}

export const usuarioService = {
    usuarioExiste,
    criarUsuario,
    buscarTodosUsuarios,
    buscarUsuarioPorId,
    editarUsuario,
    deletarUsuario,
}