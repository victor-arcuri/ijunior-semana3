import { Data, DataView } from "../model/interfaceData";
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

    static async listarProdutos(){
        try{
            const produtos = (await EstoqueService.listar_produtos()).filter(produto => produto.deletado === 0);
            console.log("Produtos em estoque:\n");
            produtos.map(produto => {
                console.log(`[${produto.id}] ${produto.nome} (${produto.peso}g) - ${produto.quantidade} unidade`)
            })

        }
        catch (error){
            console.log(`Erro ao listar produtos: ${error}`);
        }
    }
}

export default EstoqueController;