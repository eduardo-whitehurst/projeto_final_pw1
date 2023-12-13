import { AdministradorDTO } from "../dtos/administradorDto";
import { PrismaClient } from "@prisma/client";

const { hash } = require("bcryptjs");
const prisma  = new PrismaClient();

const administradorExiste = async (email: string) => {
    const usuario = await prisma.administrador.findUnique({
        where: {
            email,
        }
    })

    return usuario ? true : false;
}

const criarAdministrador = async (administrador: AdministradorDTO) => {
    const adm = await administradorExiste(administrador.email);

    if(adm){
        throw new Error('Administrador já cadastrado!');
    }

    try {
        const senhaHash = await hash(administrador.senha, 8);

        const novoAdministrador = await prisma.administrador.create({
            data: {
                nome: administrador.nome,
                cpf: administrador.cpf,
                email: administrador.email,
                senha: senhaHash,
                cargo: administrador.cargo,
            }
        })

        if(!novoAdministrador){
            throw new Error('Erro ao tentar cadastrar administrador!');
        }

        return novoAdministrador;
    } catch (error) {
        throw new Error('Erro tentando cadastrar administrador!');
    }
}

const buscarTodosAdministradores = async () => {
    try {
        const administradores = await prisma.administrador.findMany();

        return administradores;
    } catch (error) {
        throw new Error('Erro ao buscar todos os administradores!');
    }
}

const buscarAdministradorPorEmail = async (email: string) => {
    try {
        const administrador = await prisma.administrador.findUnique({
            where: {
                email: email,
            }
        })

        return administrador;
    } catch (error) {
        throw new Error('Erro ao tentar buscar administrador por email!');
    }
}

const editarAdministrador = async (administrador: AdministradorDTO) => {
    try {
        const administradorAtualizado = await prisma.administrador.update({
            where: {
                id: administrador.id,
            }, data: {
                nome: administrador.nome,
                cpf: administrador.cpf,
                email: administrador.email,
                senha: await hash(administrador.senha, 8),
                cargo: administrador.cargo,
            }
        })

        if(!administradorAtualizado){
            throw new Error('Erro ao tentar atualizar o administrador!');
        }

        return administradorAtualizado;
    } catch (error) {
        throw new Error('Erro ao atualizar administrador!');
    }
}

const deletarAdministrador = async (email: string) => {
    try {
        const administradorDeletado = await prisma.administrador.delete({
            where: {
                email,
            }
        })

        return administradorDeletado;
    } catch (error) {
        throw new Error('Erro ao tentar deletar o administrador!');
    }
}

export const administradorService = {
    administradorExiste,
    buscarTodosAdministradores,
    buscarAdministradorPorEmail,
    criarAdministrador,
    editarAdministrador,
    deletarAdministrador,
}