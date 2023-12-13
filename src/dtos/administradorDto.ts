import { OcorrenciaDTO } from "./ocorrenciaDto";

export type AdministradorDTO = {
    id: string;
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    cargo: string;

    Ocorrencias?: OcorrenciaDTO[];
}