interface IProfissionalData {
  profissao: string;
  cargo: string;
  salario: {
    fixo: number;
    comissao: number;
    variavel: number;
  };
}

export default IProfissionalData;
