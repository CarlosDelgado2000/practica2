"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function llenar() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Crear pacientes
            const pacientes = [];
            for (let i = 0; i < 10; i++) {
                const paciente = yield prisma.paciente.create({
                    data: {
                        nombre: `Nombre del Paciente ${i + 1}`,
                        identificacion: `ID-${i + 1}`
                    }
                });
                pacientes.push(paciente);
            }
            // Crear signos vitales
            const signosVitales = [];
            for (let i = 0; i < 5; i++) {
                const signoVital = yield prisma.signo_vital.create({
                    data: {
                        descripcion: `Descripción del Signo Vital ${i + 1}`,
                        minimo: `${i + 1}`,
                        maximo: `${i + 5}`
                    }
                });
                signosVitales.push(signoVital);
            }
            // Crear controles realizados
            for (const paciente of pacientes) {
                for (const signoVital of signosVitales) {
                    yield prisma.control.create({
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
        }
        catch (error) {
            console.error("Error al llenar la base de datos:", error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.default = llenar;
