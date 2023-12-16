import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController";
import { usuarioExiste } from "../middlewares/usuarioExiste";
import { autenticacao } from "../middlewares/autenticacao";

const router = Router();

router.post("/", usuarioController.criarUsuario);
router.use(autenticacao);

router.get("/", usuarioController.buscarTodosUsuarios);
router.get("/:id", usuarioExiste, usuarioController.buscarUsuarioPorId);
router.put("/:id", usuarioController.editarUsuario);
router.delete("/:id", usuarioController.deletarUsuario);

export default router;