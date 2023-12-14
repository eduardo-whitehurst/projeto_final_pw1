-- DropForeignKey
ALTER TABLE "Imagens" DROP CONSTRAINT "Imagens_ocorrenciaId_fkey";

-- DropForeignKey
ALTER TABLE "Ocorrencias" DROP CONSTRAINT "Ocorrencias_usuarioId_fkey";

-- AddForeignKey
ALTER TABLE "Ocorrencias" ADD CONSTRAINT "Ocorrencias_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagens" ADD CONSTRAINT "Imagens_ocorrenciaId_fkey" FOREIGN KEY ("ocorrenciaId") REFERENCES "Ocorrencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
