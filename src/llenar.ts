import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function llenar() {
    try {

        const pacientes = [];
        for (let i = 0; i < 10; i++) {
            const paciente = await prisma.paciente.create({
                data: {
                    nombre: `Nombre del Paciente ${i + 1}`,
                    identificacion: `ID-${i + 1}`
                }
            });
            pacientes.push(paciente);
        }

        const signosVitales = [];
        for (let i = 0; i < 5; i++) {
            const signoVital = await prisma.signo_vital.create({
                data: {
                    descripcion: `Descripción del Signo Vital ${i + 1}`,
                    minimo: `${i + 1}`,
                    maximo: `${i + 5}`
                }
            });
            signosVitales.push(signoVital);
        }

        for (const paciente of pacientes) {
            for (const signoVital of signosVitales) {
                await prisma.control.create({
                    data: {
                        paciente: { connect: { id: paciente.id } },
                        signo_vital: { connect: { id: signoVital.id } },
                        fecha: new Date(),
                        hora: Math.random() * 24,
                        valor: Math.floor(Math.random() * (parseInt(signoVital.maximo) - parseInt(signoVital.minimo) + 1)) + parseInt(signoVital.minimo)
                    }
                });
            }
        }

        console.log("Se han insertado los datos correctamente.");
    } catch (error) {
        console.error("Error al llenar la base de datos:", error);
    } finally {
        await prisma.$disconnect();
    }
}

export default llenar;
