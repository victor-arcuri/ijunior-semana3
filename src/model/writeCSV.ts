import { createObjectCsvWriter as createCsvWriter } from "csv-writer";
import { Data } from "./interfaceData";
import { CreateCSV } from "./createCSV";

export const writeCSV = async (filePath: string, data: Data[]): Promise<void> => {
    try {
        await CreateCSV.checkCSV(filePath);
    }
    catch {
        await CreateCSV.createCSV(filePath);
    }
    const csvWriter = createCsvWriter({
        path: filePath,
        header: [
            {   id: 'id', title: 'id'       },
            {   id: 'nome', title: 'nome'       },
            {   id: 'valor', title: 'valor'     },
            {   id: 'peso', title: 'peso'     },
            {   id: 'quantidade', title: 'quantidade'     },
            {   id: 'deletado', title: 'deletado'     },
        ],
    });
    return csvWriter.writeRecords(data);
};