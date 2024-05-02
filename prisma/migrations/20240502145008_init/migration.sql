-- CreateTable
CREATE TABLE "paciente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "identificacion" TEXT NOT NULL,

    CONSTRAINT "paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "signo_vital" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "minimo" TEXT NOT NULL,
    "maximo" TEXT NOT NULL,

    CONSTRAINT "signo_vital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "control" (
    "id" SERIAL NOT NULL,
    "id_paciente" INTEGER NOT NULL,
    "id_signo_vital" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora" TIMESTAMP(3) NOT NULL,
    "valor" INTEGER NOT NULL,

    CONSTRAINT "control_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "control" ADD CONSTRAINT "control_id_paciente_fkey" FOREIGN KEY ("id_paciente") REFERENCES "paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "control" ADD CONSTRAINT "control_id_signo_vital_fkey" FOREIGN KEY ("id_signo_vital") REFERENCES "signo_vital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
