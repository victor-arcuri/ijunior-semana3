import fs from 'fs';
import csv from 'csv-parser';
import { Data } from './interfaceData';

const readCSV = async (filePath: string): Promise<Data[]> => {
    const results: Data[] = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data: Data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}