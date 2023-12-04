interface ITransaction {
  data: string;
  tipo: string;
  titulo: string;
  descricao: string;
  valor: number | undefined;
}

export default ITransaction;
