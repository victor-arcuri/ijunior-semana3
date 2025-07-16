import { writeCSV } from "../model/writeCSV";
import { readCSV } from "../model/readCSV";
import { Data, DataCreate } from "../model/interfaceData";
import { CSV_PATH as filePath } from "../config/conf";

class EstoqueService {

    static async listar_produtos(): Promise<Data[]> {
        return (await readCSV(filePath));
    }
    
    static async criar(data: DataCreate) {
        if (typeof data.nome !== 'string' || isNaN(data.peso) || isNaN(data.quantidade) || isNaN(data.valor)){

            throw new Error('Dados inválidos para o produto!');
        }
        else {
            let produtos = await this.listar_produtos();
            const lastId = produtos.length - 1;

            await writeCSV(filePath, [...produtos,{id: lastId + 1, ...data, deletado: 0}]);
        }
    }

    static async pegar_produto_por_id(id: number): Promise<Data> {
        const produtos = (await this.listar_produtos()).filter(produto => produto.deletado === 0);
        const produto = produtos.find((element) => element.id === id);
        if (produto === undefined){
            throw new Error('Nenhum produto com o id especificado!');
        } else {
            return produto;
        }
    }

    static async deletar_produto_por_id(id: number){
        const produto = await this.pegar_produto_por_id(id);
        let produtos = await this.listar_produtos();
        produtos[id].deletado = 1;
        await writeCSV(filePath, produtos);
    }

};

export default EstoqueService;