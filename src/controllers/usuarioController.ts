import { Request, Response } from "express";
import { usuarioService } from "../services/usuarioService";
import { v4 as uuid } from "uuid";

const criarUsuario = async (req: Request, res: Response) => {
    const { nome, cpf, email, senha } = req.body;
    
    const usuario = {
        id: uuid(),
        nome, 
        cpf,
        email,
        senha,
    }

    const novoUsuario = await usuarioService.criarUsuario(usuario);

    if(!novoUsuario){
        return res.status(400).send("Não foi possível criar usuário!");
    } 

    return res.status(201).json(novoUsuario);
}

const buscarTodosUsuarios = async (req: Request, res: Response) => {
    const usuarios = await usuarioService.buscarTodosUsuarios();
    return res.json(usuarios);
}

const buscarUsuarioPorEmail = async (req: Request, res: Response) => {
    const { email } = req.params;
    const usuario = await usuarioService.buscarUsuarioPorEmail(email as string);
    return res.status(200).json(usuario);
}

const editarUsuario = async (req: Request, res: Response) => {
    const { id, nome, cpf, senha } = req.body;
    const { email } = req.params;

    const usuarioAtualizado = await usuarioService.editarUsuario({id, nome, cpf, senha, email: email as string});

    if(!usuarioAtualizado){
        return res.status(400).send("Erro ao editar o usuário!");
    }

    return res.status(200).json(usuarioAtualizado);
}

const deletarUsuario = async (req: Request, res: Response) => {
    const { email } = req.params;

    const usuarioDeletado = await usuarioService.deletarUsuario(email as string);
    
    if(!usuarioDeletado){
        return res.status(400).send("Erro ao deletar o usuário!");
    }

    return res.status(200).send("Usuario deletado com sucesso!");
}

export const usuarioController = {
    buscarTodosUsuarios,
    buscarUsuarioPorEmail,
    criarUsuario,
    editarUsuario,
    deletarUsuario,
}