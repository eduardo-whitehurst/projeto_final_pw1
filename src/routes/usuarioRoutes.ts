import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController";
import { usuarioExiste } from "../middlewares/usuarioExiste";
import { autenticacao } from "../middlewares/autenticacao";

const router = Router();

router.post("/", usuarioController.criarUsuario);
router.use(autenticacao);

router.get("/", usuarioController.buscarTodosUsuarios);
router.get("/:email", usuarioExiste, usuarioController.buscarUsuarioPorEmail);
router.put("/:id", usuarioController.editarUsuario);
router.delete("/:email", usuarioController.deletarUsuario);

export default router;