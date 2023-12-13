import express from "express";
import "express-async-errors";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes";
import administradorRoutes from "./routes/administradorRoutes"

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use("/usuarios", usuarioRoutes);
app.use("/administrador", administradorRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})

export default app;