import { OcorrenciaDTO, PostOcorrencia } from "../dtos/ocorrenciaDto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ocorrenciaExiste = async (id: string) => {
    const ocorrencia = await prisma.ocorrencia.findUnique({
        where: {
            id,
        }
    })

    return ocorrencia ? true : false;
}

const criarOcorrencia = async (ocorrencia: PostOcorrencia) => {
    try {
        const novaOcorrencia = await prisma.ocorrencia.create({
            data:{
                descricao: ocorrencia.descricao,
                tipo: ocorrencia.tipo,
                data: ocorrencia.data,
                lat: Number(ocorrencia.lat),
                log: Number(ocorrencia.long),
                status: false,
                usuarioId: ocorrencia.usuarioId,
                imagens: ocorrencia.imagens,
            }
        })

        if(!novaOcorrencia){
            throw new Error('Erro ao tentar cadastrar uma nova ocorrencia!');
        }

        return novaOcorrencia;
    } catch (error) {
        console.log(error);
        throw new Error('Erro ao cadastrar uma ocorrência!');
    }
}

const buscarTodasOcorrencias = async () => {
    const ocorrencias = await prisma.ocorrencia.findMany();

    return ocorrencias;
}

const buscarOcorrenciaPorId = async (id: string) => {
    try {
        const ocorrencia = await prisma.ocorrencia.findUnique({
            where: {
                id,
            },
            include: {
                usuario: true,
                imagens: true,
            }
        })

        if(!ocorrencia){
            throw new Error('Ocorrencia não encontrada na base de dados!');
        }

        return ocorrencia;
    } catch (error) {
        throw new Error('Ocorrencia não encontrada!');
    }
}

const editarOcorrencia = async (ocorrencia: OcorrenciaDTO) => {
    try {
        const ocorrenciaAtualizada = await prisma.ocorrencia.update({
            where: {
                id: ocorrencia.id,
            },
            data: {
                descricao: ocorrencia.descricao,
                tipo: ocorrencia.tipo,
                data: ocorrencia.data,
                lat: ocorrencia.lat,
                log: ocorrencia.long,
                status: ocorrencia.status,
            }
        })

        if(!ocorrenciaAtualizada){
            throw new Error('Erro ao tentar atualizar ocorrencia!');
        }

        return ocorrenciaAtualizada;
    } catch (error) {
        throw new Error('Erro ao atualizar uma ocorrencia!');
    }
}

const deletarOcorrencia = async (id: string) => {
    try {
        const ocorrenciaDeletada = await prisma.ocorrencia.delete({
            where: {
                id,
            }
        })

        return ocorrenciaDeletada;
    } catch (error) {
        throw new Error('Erro ao deletar uma ocorrência!');
    }
}

export const ocorrenciaService = {
    buscarTodasOcorrencias,
    buscarOcorrenciaPorId,
    criarOcorrencia,
    editarOcorrencia,
    deletarOcorrencia,
}