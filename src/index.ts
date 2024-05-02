import llenar from "./llenar";
import buscar from "./buscar";
import consultar from "./consultar";

async function main() {

    await llenar ();
    await buscar(1);
    await consultar();
    
}

main().catch((e) => console.error(e));