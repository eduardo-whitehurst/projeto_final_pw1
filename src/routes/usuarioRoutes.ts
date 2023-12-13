import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController";
import { usuarioExiste } from "../middlewares/usuarioExiste";

const router = Router();

router.get("/", usuarioController.buscarTodosUsuarios);
router.get("/:email", usuarioExiste, usuarioController.buscarUsuarioPorEmail);
router.post("/", usuarioController.criarUsuario);
router.put("/:id", usuarioController.editarUsuario);
router.delete("/:email", usuarioController.deletarUsuario);

export default router;