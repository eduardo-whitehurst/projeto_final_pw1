import { Router } from "express";
import { ocorrenciaController } from "../controllers/ocorrenciaController";
import { autenticacao } from "../middlewares/autenticacao";

const router = Router();

router.use(autenticacao);

router.get("/", ocorrenciaController.buscarTodasOcorrencias);
router.get("/:id", ocorrenciaController.buscarOcorrenciaPeloId);
router.post("/", ocorrenciaController.criarOcorrencia);
router.put("/:id", ocorrenciaController.editarOcorrencia);
router.delete("/:id", ocorrenciaController.deletarOcorrencia);

export default router;