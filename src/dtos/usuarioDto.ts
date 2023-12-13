import { OcorrenciaDTO } from "./ocorrenciaDto";

export type UsuarioDTO = {
    id: string;
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    Ocorrencias?: OcorrenciaDTO[];
}