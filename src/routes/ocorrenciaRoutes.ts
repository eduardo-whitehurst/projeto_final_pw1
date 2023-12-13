import { Router } from "express";
import { ocorrenciaController } from "../controllers/ocorrenciaController";
import uploadsConfig from "../config/multer";
import multer from "multer";
import { autenticacao } from "../middlewares/autenticacao";

const router = Router();
const upload = multer(uploadsConfig);

router.use(autenticacao);

router.get("/", ocorrenciaController.buscarTodasOcorrencias);
router.get("/:id", ocorrenciaController.buscarOcorrenciaPeloId);
router.post("/", upload.array("images"),ocorrenciaController.criarOcorrencia);
router.put("/:id", ocorrenciaController.editarOcorrencia);
router.delete("/:id", ocorrenciaController.deletarOcorrencia);

export default router;