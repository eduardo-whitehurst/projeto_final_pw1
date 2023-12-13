-- CreateTable
CREATE TABLE "Usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administradores" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,

    CONSTRAINT "Administradores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ocorrencias" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "log" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Ocorrencias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imagens" (
    "id" TEXT NOT NULL,
    "caminho" TEXT NOT NULL,
    "ocorrenciaId" TEXT NOT NULL,

    CONSTRAINT "Imagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdministradorToOcorrencia" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_cpf_key" ON "Usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Administradores_cpf_key" ON "Administradores"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Administradores_email_key" ON "Administradores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_AdministradorToOcorrencia_AB_unique" ON "_AdministradorToOcorrencia"("A", "B");

-- CreateIndex
CREATE INDEX "_AdministradorToOcorrencia_B_index" ON "_AdministradorToOcorrencia"("B");

-- AddForeignKey
ALTER TABLE "Ocorrencias" ADD CONSTRAINT "Ocorrencias_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagens" ADD CONSTRAINT "Imagens_ocorrenciaId_fkey" FOREIGN KEY ("ocorrenciaId") REFERENCES "Ocorrencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdministradorToOcorrencia" ADD CONSTRAINT "_AdministradorToOcorrencia_A_fkey" FOREIGN KEY ("A") REFERENCES "Administradores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdministradorToOcorrencia" ADD CONSTRAINT "_AdministradorToOcorrencia_B_fkey" FOREIGN KEY ("B") REFERENCES "Ocorrencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
