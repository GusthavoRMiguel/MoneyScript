interface ITransaction {
  id: string;
  data: string;
  tipo: string;
  titulo: string;
  descricao: string;
  valor: number | undefined;
  isRecorrente?: boolean;
  recorrenciaMeses?: number;
}

export default ITransaction;
