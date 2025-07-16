const prompt = require('prompt-sync')({sigint: true});

import { Data, DataCreate } from "./model/interfaceData";
import EstoqueController from "./controller/controllerEstoque";
import { OpenDirOptions } from "fs";

interface Option {
    id: number;
    text: string;
    function: Function;
}


class App{

    async optionManager(options: Option[]): Promise<Option | undefined>{
        options.map(option => {
            console.log(`[${option.id}] ${option.text}`);
        });
        
        console.log();
        const optionId = prompt("Digite o número da opção desejada: ");
        if (optionId == ''){
            console.log("\nOpção inválida! Pressione 'enter' para voltar");
            prompt();
            return undefined;
        }
        const option = options.find((element) => {
            return Number(element.id) == Number(optionId);
        })

        if (option === undefined){
            console.log("\nOpção inválida! Pressione 'enter' para voltar");
            prompt();
        }

        return option;
    }

    async setupLogo(menu: string=''){
        if (menu == ''){
            console.log(`Gerenciador de Estoque iJunior\n`);
            return
        }
        console.log(`Gerenciador de Estoque iJunior | ${menu}\n`);
    }

    async clearTerminal(){
        console.clear();
    }

    async listarProdutosEstoque(){
        await this.clearTerminal();
        await this.setupLogo('Listagem de Produtos');
        await EstoqueController.listarProdutos();
        console.log();
        prompt("Pressione 'enter' para retornar");
    }

    async adicionarProduto(){
        const validarAdicao = (campo: string) => {
            if (campo == '')  {
                console.log("");
                prompt("Valor inválido! Pressione 'enter' para retornar");
            }
            return campo;
        }
        await this.clearTerminal();
        await this.setupLogo('Adição de Produto');
        console.log("Digite as informações do produto:");
        console.log("(Não adicione as unidades de medida)\n");
        const nome = validarAdicao(prompt("Nome: "));
        if (nome == '') return;
        const valor = validarAdicao(prompt("Valor (R$): ").replace(",", "."));
        if (valor == '') return;
        const peso = validarAdicao(prompt("Peso (kg): ").replace(",", "."));
        if (peso == '') return;
        const quantidade = validarAdicao(prompt("Quantidade (unidades): ").replace(",", "."));
        if (quantidade == '') return;
        const data: DataCreate = {
            nome: nome,
            valor: Number(valor),
            peso: Number(peso),
            quantidade: Number(quantidade)
        };
        console.log();
        await EstoqueController.adicionarProduto(data);
        console.log();
        prompt("Pressione 'enter' para retornar");


    }
    async removerProduto(){
        await this.clearTerminal();
        await this.setupLogo('Remoção de Produto');
        const id = prompt ("Digite o 'id' do produto: ");
        console.log();
        if (id == ''){
            console.log("Opção Inválida!");
            console.log();
            prompt("Pressione 'enter' para retornar");
            return;
        }
        const produto = await EstoqueController.pegarProdutoPorId(Number(id))
        if (produto !== undefined){
            const remove: string = prompt(`Deseja remover o produto '${produto.nome}'? [N/s] `);
            console.log();
            if (remove == '' || remove.toLowerCase() == 'n'){
                console.log("Produto não removido!");
            } else if (remove.toLowerCase() == 's'){
                await EstoqueController.removerProduto(produto.id);
            } else {
                console.log("Opção Inválida!");
            }
        }
        console.log();
        prompt("Pressione 'enter' para retornar");
    }

    async valorTotalEstoque(){
        await this.clearTerminal();
        await this.setupLogo("Valor Total do Estoque");
        await EstoqueController.valorTotalEstoque();
        console.log();
        prompt("Pressione 'enter' para retornar");
    }
    async pesoTotalEstoque(){
        await this.clearTerminal();
        await this.setupLogo("Peso Total do Estoque");
        await EstoqueController.pesoTotalEstoque();
        console.log();
        prompt("Pressione 'enter' para retornar");   
    }
    async mediaValorEstoque(){
        await this.clearTerminal();
        await this.setupLogo("Média de Valor do Estoque");
        await EstoqueController.valorMedioEstoque();
        console.log();
        prompt("Pressione 'enter' para retornar");  
    }
    async mediaPesoEstoque(){
        await this.clearTerminal();
        await this.setupLogo("Média de Peso do Estoque");
        await EstoqueController.pesoMedioEstoque();
        console.log();
        prompt("Pressione 'enter' para retornar");  
    }
    async quantidadeItensEstoque(){
        await this.clearTerminal();
        await this.setupLogo("Quantidade de Itens em Estoque");
        await EstoqueController.quantidadeItensEstoque();
        console.log();
        prompt("Pressione 'enter' para retornar");  
    }
    async quantidadeProdutosEstoque(){
        await this.clearTerminal();
        await this.setupLogo("Quantidade de Produtos em Estoque");
        await EstoqueController.quantidadeProdutosEstoque();
        console.log();
        prompt("Pressione 'enter' para retornar");  
    }


    async mainMenu(){
        const options: Option[] = [

            {
                id: 1,
                text: "Listar Produtos em Estoque",
                function: this.listarProdutosEstoque.bind(this)
            },
            {
                id: 2,
                text: "Adicionar Produto ao Estoque",
                function: this.adicionarProduto.bind(this)
            },
            {
                id: 3,
                text: "Remover Produto do Estoque",
                function: this.removerProduto.bind(this)
            },
            {
                id: 4,
                text: "Valor Total do Estoque",
                function: this.valorTotalEstoque.bind(this)
            },
            {
                id: 5,
                text: "Peso Total do Estoque",
                function: this.pesoTotalEstoque.bind(this)
            },
            {
                id: 6,
                text: "Média de Valor do Estoque",
                function: this.mediaValorEstoque.bind(this)
            },
            {
                id: 7,
                text: "Média de Peso do Estoque",
                function: this.mediaPesoEstoque.bind(this)
            },
            {
                id: 8,
                text: "Quantidade Total de Itens em Estoque",
                function: this.quantidadeItensEstoque.bind(this)
            },
            {
                id: 9,
                text: "Quantidade Total de Produtos em Estoque",
                function: this.quantidadeProdutosEstoque.bind(this)
            },
            {
                id: 0,
                text: "Sair",
                function: process.exit
            }
        ]
        while (true){
            await this.clearTerminal();
            await this.setupLogo();
            const option = await this.optionManager(options);
            if (option !== undefined){
                await option.function();
                break;
            }
        }
        
    }

    async main(){
        while (true){
            await this.mainMenu();
        }
    }

}

const app = new App();
app.main();