import * as Yup from "yup";
import { ValidationError } from 'yup';
import { UsuarioDTO } from "../dtos/usuarioDto";

export async function validacaoUsuarioYup(usuario: UsuarioDTO){
    const schema = Yup.object().shape({
        nome: Yup.string().required('Error: Nome deve ser obrigatório!'),
        cpf: Yup.string().required('Error: CPF deve ser obrigatório!'),
        email: Yup.string().required('Error: Email deve ser obrigatório!'),
        senha: Yup.string().required('Error: Senha deve ser obrigatória!'),
    });

    try {
        await schema.validate(usuario, { abortEarly: false, });
    } catch (error) {
        if(error instanceof ValidationError){
            return error;
        }
    }
}