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
function buscarControlPorId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const control = yield prisma.control.findUnique({
                where: { id },
                include: {
                    paciente: true,
                    signo_vital: true
                }
            });
            if (control) {
                console.log("Control encontrado:");
                console.log(control);
            }
            else {
                console.log("No se encontró ningún control con el ID proporcionado.");
            }
        }
        catch (error) {
            console.error("Error al buscar el control:", error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.default = buscarControlPorId;
