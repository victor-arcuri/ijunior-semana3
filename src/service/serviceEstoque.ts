import { writeCSV } from "../model/writeCSV";
import { readCSV } from "../model/readCSV";
import { Data } from "../model/interfaceData";

const filePath = 'db/estoqueService.csv'

export class estoqueService{
    async listar_produtos(): Promise<Data[]> {
        return await readCSV(filePath);
    }
    
    async criar(data: Data) {
        if (typeof data.nome !== 'string' || isNaN(data.peso) || isNaN(data.quantidade) || isNaN(data.valor)){

            throw new Error('Dados inválidos para o produto!');
        }
        else {
            let produtos = await this.listar_produtos();
            await writeCSV(filePath, [...produtos,data]);
        }
    }

    async pegar_produto_por_nome(nome: string): Promise<Data> {
        const produtos = await this.listar_produtos()
        const produto = produtos.find((element) => element.nome == nome);
        if (produto === undefined){
            throw new Error('Nenhum produto com o nome especificado!');
        } else {
            return produto;
        }
    }
}