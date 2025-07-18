import fs from 'fs';
import { Data } from './interfaceData';

export class CreateCSV{
    static checkCSV(filePath: string): Promise<void>{
        return new Promise((resolve, reject) => {
            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (err) {
                    reject();
                } else {
                    resolve();
                }
            });
        });
    }


    static createCSV(filePath: string): Promise<void>{
        return new Promise((resolve, reject)=>{
            fs.open(filePath, 'w', (err) => {
                if (err){
                    reject();
                }
                else {
                    resolve();
                }
            })
        });
    }
}