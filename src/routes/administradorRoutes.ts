import { Router } from "express";
import { administradorController } from "../controllers/administradorController";
import { autenticacao } from "../middlewares/autenticacao";

const router = Router();

router.post("/", administradorController.criarAdministrador);
router.use(autenticacao);

router.get("/", administradorController.buscarTodosAdministradores);
router.get("/:id", administradorController.buscarAdministradorPorId);
router.put("/:id", administradorController.editarAdministrador);
router.delete("/:id", administradorController.deletarAdministrador);

export default router;