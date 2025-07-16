import { Data, DataView, DataCreate } from "../model/interfaceData";
import EstoqueService from "../service/serviceEstoque";

class EstoqueController {
    static async adicionarProduto(data: DataCreate){
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
            if (produtos.length == 0){
                console.log("Estoque vazio!");
                return;
            }
            console.log("Produtos em estoque:\n");
            produtos.map(produto => {
                console.log(`[${produto.id}] ${produto.nome} (${produto.peso.toFixed(2)}kg) (R$${produto.valor.toFixed(2)}) - ${produto.quantidade} unidade(s)`)
            })

        }
        catch (error){
            console.log(`Erro ao listar produtos: ${error}`);
        }
    }

    static async pegarProdutoPorId(id: number){
        try{
            const produto = await EstoqueService.pegar_produto_por_id(id);
            return produto;

        }
        catch (error){
            console.log(`Erro ao pegar produto: ${error}`);
        }
    }

    static async removerProduto(id: number){
        try{
            const produto = await EstoqueService.pegar_produto_por_id(id);
            await EstoqueService.deletar_produto_por_id(id);
            console.log(`Produto '${produto.nome}' (id ${id}) removido com sucesso!`);

        }
        catch (error){
            console.log(`Erro ao remover produto: ${error}`);
        }
    }
    
    static async valorTotalEstoque(){
        try{
            const produtos = (await EstoqueService.listar_produtos()).filter(produto => produto.deletado === 0);
            let total = 0;
            produtos.map((produto)=>{
                total += produto.quantidade*produto.valor;
            });
            console.log(`Valor total do estoque: R$${total.toFixed(2)}`);
        }
        catch (error){
            console.log(`Erro ao verificar valor total do estoque: ${error}`);
        }
    }

    static async pesoTotalEstoque(){
        try{
            const produtos = (await EstoqueService.listar_produtos()).filter(produto => produto.deletado === 0);
            let total = 0;
            produtos.map((produto)=>{
                total += produto.quantidade*produto.peso;
            });
            console.log(`Peso total do estoque: ${total.toFixed(2)}kg`);
        }
        catch (error){
            console.log(`Erro ao verificar peso total do estoque: ${error}`);
        }
    }

    static async valorMedioEstoque(){
        try{
            const produtos = (await EstoqueService.listar_produtos()).filter(produto => produto.deletado === 0);
            let precoTotal = 0;
            let quantidadeTotal = 0;
            produtos.map((produto)=>{
                precoTotal += produto.valor * produto.quantidade;
                quantidadeTotal += produto.quantidade;
            });
            let precoMedio = precoTotal / quantidadeTotal;
            if (Number.isNaN(precoMedio))  precoMedio = 0;
            console.log(`Valor médio do estoque: R$${precoMedio.toFixed(2)}`);
        }
        catch (error){
            console.log(`Erro ao verificar valor médio do estoque: ${error}`);
        }
    }

    static async pesoMedioEstoque(){
        try{
            const produtos = (await EstoqueService.listar_produtos()).filter(produto => produto.deletado === 0);
            let pesoTotal = 0;
            let quantidadeTotal = 0;
            produtos.map((produto)=>{
                pesoTotal += produto.peso * produto.quantidade;
                quantidadeTotal += produto.quantidade;
            });
            let pesoMedio = pesoTotal / quantidadeTotal;
            if (Number.isNaN(pesoMedio))  pesoMedio = 0;
            console.log(`Peso médio do estoque: ${pesoMedio.toFixed(2)}kg`);
        }
        catch (error){
            console.log(`Erro ao verificar peso médio do estoque: ${error}`);
        }
    }

    static async quantidadeItensEstoque(){
        try{
            const produtos = (await EstoqueService.listar_produtos()).filter(produto => produto.deletado === 0);
            let quantidadeTotal = 0;
            produtos.map((produto)=>{
                quantidadeTotal += produto.quantidade;
            });
            console.log(`Quantidade de itens em estoque: ${quantidadeTotal} unidades`);
        }
        catch (error){
            console.log(`Erro ao verificar quantidade de itens em estoque: ${error}`);
        }
    }

    static async quantidadeProdutosEstoque(){
        try{
            const produtos = (await EstoqueService.listar_produtos()).filter(produto => produto.deletado === 0);
            const quantidadeTotal = produtos.length;
            console.log(`Quantidade de produtos em estoque: ${quantidadeTotal} produtos`);
        }
        catch (error){
            console.log(`Erro ao verificar quantidade de produtos em estoque: ${error}`);
        }
    }
}

export default EstoqueController;