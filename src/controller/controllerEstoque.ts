import { Data } from "../model/interfaceData";
import EstoqueService from "../service/serviceEstoque";

class EstoqueController {
    static async adicionarProduto(data: Data){
        try {
            await EstoqueService.criar(data);
            console.log(`Produto '${data.nome}' adicionado com sucesso!`);
        }
        catch (error){
            console.log(`Erro ao adicionar produto '${data.nome}': ${error}`);
        }
    }
}

export default EstoqueController;