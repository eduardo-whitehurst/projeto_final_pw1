import { AdministradorDTO } from "./administradorDto";
import { UsuarioDTO } from "./usuarioDto";

export interface OcorrenciaDTO {
    id: string;
    descricao: string;
    tipo: string;
    data: Date;
    lat: number;
    long: number;
    status: boolean;

    usuarioId: string;
    Usuario?: UsuarioDTO;

    imagens?: object;

    Administradores?: AdministradorDTO[];
}

export interface PostOcorrencia {
    descricao: string;
    tipo: string;
    data: Date;
    lat: number;
    long: number;
    status: boolean;

    usuarioId: string;
    Usuario?: UsuarioDTO;

    imagens?: object;

    Administradores?: AdministradorDTO[];
}

