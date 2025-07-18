import fs from 'fs';
import csv from 'csv-parser';
import { Data } from './interfaceData';
import { CreateCSV } from './createCSV';

export const readCSV = async (filePath: string): Promise<Data[]> => {
    const results: Data[] = [];
    try {
        await CreateCSV.checkCSV(filePath);
    }
    catch {
        await CreateCSV.createCSV(filePath);
        return [];
    }
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data: Data) => results.push({
                id: Number(data.id),
                nome: data.nome,
                valor: Number(data.valor),
                peso: Number(data.peso),
                quantidade: Number(data.quantidade),
                deletado: Number(data.deletado)
            }))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}