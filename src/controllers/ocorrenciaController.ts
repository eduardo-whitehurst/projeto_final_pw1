import { ocorrenciaService } from "../services/ocorrenciaService";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

const criarOcorrencia = async (req: Request, res: Response) => {
    const { descricao, tipo, data, lat, long, status, usuarioId } = req.body;
    const reqImagens  = req.files as Express.Multer.File[];

    const images = reqImagens.map((img) => {
        return {
            caminho: img.filename,
        }
    });

    const ocorrencia = {
        descricao,
        tipo,
        data,
        lat,
        long,
        status,
        imagens: {
            create: images,
        },
        usuarioId,
    }

    const novaOcorrencia = await ocorrenciaService.criarOcorrencia(ocorrencia);

    if(!novaOcorrencia){
        return res.status(400).send("Não foi possível criar uma ocorrência!");
    }

    return res.status(201).send(novaOcorrencia);
}

const buscarTodasOcorrencias = async (req: Request, res: Response) => {
    const ocorrencias = await ocorrenciaService.buscarTodasOcorrencias();

    return res.status(200).send(ocorrencias);
}

const buscarOcorrenciaPeloId = async (req: Request, res: Response) => {
    const { id } = req.params;

    const ocorrencia = await ocorrenciaService.buscarOcorrenciaPorId(id as string);

    return res.status(200).send(ocorrencia);
}

const editarOcorrencia = async (req: Request, res: Response) => {
    const { descricao, tipo, data, lat, long, status } = req.body;
    const { id, usuarioId } = req.params;

    const ocorrenciaAtualizada = await ocorrenciaService.editarOcorrencia({descricao, tipo, data, lat, long, status, id: id as string, usuarioId: usuarioId as string});

    if(!ocorrenciaAtualizada){
        return res.status(400).send('Erro ao tentar editar uma ocorrencia!');
    }

    return res.status(200).send(ocorrenciaAtualizada);
}

const deletarOcorrencia = async (req: Request, res: Response) => {
    const { id } = req.params;

    const ocorrenciaDeletada = await ocorrenciaService.deletarOcorrencia(id as string);

    if(!ocorrenciaDeletada){
        return res.status(400).send('Erro ao deletar uma ocorrencia!');
    }

    return res.status(200).send('Ocorrencia deletada com sucesso!');
}

export const ocorrenciaController = {
    buscarTodasOcorrencias,
    buscarOcorrenciaPeloId,
    criarOcorrencia,
    editarOcorrencia,
    deletarOcorrencia,
}

