export interface Data {
    id: number,
    nome: string;
    valor: number;
    peso: number;
    quantidade: number;
    deletado: number;
};

export interface DataCreate {
    nome: string;
    valor: number;
    peso: number;
    quantidade: number;
};
