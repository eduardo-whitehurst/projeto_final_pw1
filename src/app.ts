import express from "express";
import "express-async-errors";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import administradorRoutes from "./routes/administradorRoutes.js";
import ocorrenciaRoutes from "./routes/ocorrenciaRoutes.js";
import path from "path";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use("/usuarios", usuarioRoutes);
app.use("/auth", authRoutes);
app.use("/administrador", administradorRoutes);
app.use("/ocorrencias", ocorrenciaRoutes);
app.use("/images", express.static(path.join(__dirname, "..", "uploads")));

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})

export default app;