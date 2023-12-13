import { UsuarioDTO } from "../dtos/usuarioDto";
import { PrismaClient } from "@prisma/client";

const {hash} = require("bcryptjs");

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

    if(await usuarioExiste(usuario.email)){
        throw new Error('Usuario já existe no nosso sistema!');
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

        if(!novoUsuario){
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

const buscarUsuarioPorEmail = async (email: string) => {
    const usuario = await prisma.usuario.findUnique({
        where: {
            email,
        }
    })

    return usuario;
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

    if(!usuarioAtualizado){
        throw new Error("Erro ao atualizar o usuário!");
    }

    return usuarioAtualizado;
}

const deletarUsuario = async (email: string) => {
    const usuario = await buscarUsuarioPorEmail(email);

    if(!usuario){
        throw new Error("Usuário não encontrado!");
    }

    const usuarioDeletado = await prisma.usuario.delete({
        where: {
            email: email,
        }
    })

    return usuarioDeletado;
}

export const usuarioService = {
    usuarioExiste,
    criarUsuario,
    buscarTodosUsuarios,
    buscarUsuarioPorEmail,
    editarUsuario,
    deletarUsuario,
}