import { Router } from "express";
import { administradorController } from "../controllers/administradorController";

const router = Router();

router.get("/", administradorController.buscarTodosAdministradores);
router.get("/:email", administradorController.buscarAdministradorPorEmail);
router.post("/", administradorController.criarAdministrador);
router.put("/:id", administradorController.editarAdministrador);
router.delete("/:email", administradorController.deletarAdministrador);

export default router;