import { administradorService } from "../services/administradorService";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

const criarAdministrador = async (req: Request, res: Response) => {
    const { nome, cpf, email, senha, cargo } = req.body;

    const administrador = {
        id: uuid(),
        nome,
        cpf,
        email,
        senha,
        cargo,
    }

    const novoAdministrador = await administradorService.criarAdministrador(administrador);

    if(!novoAdministrador){
        return res.status(400).send("Não foi possível criar um usuário!");
    }

    return res.status(201).send(novoAdministrador);
}

const buscarTodosAdministradores = async (req: Request, res: Response) => {
    const administradores = await administradorService.buscarTodosAdministradores();

    return res.status(200).send(administradores);
}

const buscarAdministradorPorEmail = async (req: Request, res: Response) => {
    const { email } = req.params;

    const administrador = await administradorService.buscarAdministradorPorEmail(email as string);

    return res.status(200).send(administrador);
}

const editarAdministrador = async (req: Request, res: Response) => {
    const { email, nome, cpf, senha, cargo } = req.body;
    const { id } = req.params;

    const administradorAtualizado = await administradorService.editarAdministrador({id, nome, cpf, senha, cargo, email: email as string});

    if(!administradorAtualizado){
        return res.status(400).send("Erro ao tentar editar o administrador!");
    }

    return res.status(200).send(administradorAtualizado);
}

const deletarAdministrador = async (req: Request, res: Response) => {
    const { email } = req.params;

    const administradorDeletado = await administradorService.deletarAdministrador(email as string);

    if(!administradorDeletado){
        return res.status(400).send("Erro ao tentar deletar o administrador");
    }

    return res.status(200).send("Administrador deletado com sucesso!");
}

export const administradorController = {
    buscarTodosAdministradores,
    buscarAdministradorPorEmail,
    criarAdministrador,
    editarAdministrador,
    deletarAdministrador,
}