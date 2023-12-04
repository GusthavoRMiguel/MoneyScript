'use client';
import React, { useState } from 'react';
import { Dropdown, Form, Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import * as S from './style';
import { FaFilterCircleDollar } from 'react-icons/fa6';
import ITransactionFilter from '@/interfaces/ITransactionFilter';

interface FilterProps {
  onApplyFilter: (filterParams: ITransactionFilter) => void;
}

const Filtro: React.FC<FilterProps> = ({ onApplyFilter }) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [intervaloData, setIntervaloData] = useState<{
    DataInicial: Date;
    DataFinal: Date;
  }>({
    DataInicial: new Date(),
    DataFinal: new Date()
  });
  const [tipo, setTipo] = useState<string>('');
  const [subtipoEntrada, setSubTipoEntrada] = useState<string>('');
  const [subtipoSaida, setSubTipoSaida] = useState<string>('');

  const opcoesMostrarValores = [
    { key: 't', text: 'Todos', value: 'todos' },
    { key: 'e', text: 'Somente Entradas', value: 'entradas' },
    { key: 's', text: 'Somente Saídas', value: 'saidas' }
  ];

  const opcoesTipoEntrada = [
    {
      key: 'todasEntradas',
      text: 'Todas as Entradas',
      value: 'todas as entradas'
    },
    { key: 'salario', text: 'Salário', value: 'salario' },
    { key: 'bonus', text: 'Bônus', value: 'bonus' },
    { key: 'comissao', text: 'Comissão', value: 'comissao' },
    { key: 'outraEntrada', text: 'Outra Entrada', value: 'outra entrada' }
  ];

  const opcoesTipoSaida = [
    { key: 'todasSaidas', text: 'Todas as Saídas', value: 'todas as saidas' },
    { key: 'contaLuz', text: 'Conta de Luz', value: 'conta de luz' },
    { key: 'agua', text: 'Conta de Água', value: 'conta de agua' },
    { key: 'gas', text: 'Conta de Gás', value: 'conta de agua' },
    { key: 'outraSaida', text: 'Outra Saída', value: 'outra saida' }
  ];

  const schemaFiltro = Yup.object().shape({
    tipo: Yup.string(),
    SubTipoEntrada: Yup.string(),
    SubTipoSaida: Yup.string(),
    intervaloData: Yup.lazy((value: any) => {
      if (value) {
        return Yup.object().shape({
          DataInicial: Yup.date().required('A data de início é obrigatória'),
          DataFinal: Yup.date().required('A data final é obrigatória')
        });
      }
      return Yup.mixed().notRequired();
    })
  });

  const aplicarFiltro = async () => {
    try {
      let parametrosFiltro: ITransactionFilter = {
        dataInicial: intervaloData.DataInicial.toISOString().split('T')[0],
        dataFinal: intervaloData.DataFinal.toISOString().split('T')[0]
      };

      console.log('Parametros iniciais do filtro:', parametrosFiltro);
      if (tipo !== 'todos') {
        parametrosFiltro.tipo = tipo;
        if (tipo === 'entradas' && subtipoEntrada !== 'todas as entradas') {
          parametrosFiltro.titulo = subtipoEntrada;
        } else if (tipo === 'saidas' && subtipoSaida !== 'todas as saidas') {
          parametrosFiltro.titulo = subtipoSaida;
        }
      }

      console.log(
        'Parametros do filtro após a lógica de tipo e subtipo:',
        parametrosFiltro
      );

      await schemaFiltro.validate(parametrosFiltro, { abortEarly: false });
      onApplyFilter(parametrosFiltro);
      console.log('Filtro aplicado:', parametrosFiltro); // Log após aplicar filtro
    } catch (error) {
      console.error('Erro ao aplicar filtro:', error);
    }
  };

  return (
    <S.Container>
      {!showFilter ? (
        <>
          <S.Icone>
            <button onClick={() => setShowFilter(true)}>
              Filtro
              <FaFilterCircleDollar size={20} />
            </button>
          </S.Icone>
        </>
      ) : (
        <S.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Data de Início</label>
                <input
                  type="date"
                  value={intervaloData.DataInicial.toISOString().split('T')[0]}
                  onChange={(e) =>
                    setIntervaloData({
                      ...intervaloData,
                      DataInicial: new Date(e.target.value)
                    })
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Data Final</label>
                <input
                  type="date"
                  value={intervaloData.DataFinal.toISOString().split('T')[0]}
                  onChange={(e) =>
                    setIntervaloData({
                      ...intervaloData,
                      DataFinal: new Date(e.target.value)
                    })
                  }
                />
              </Form.Field>
            </Form.Group>

            <Form.Field>
              <label>Tipo de Movimentação</label>
              <Dropdown
                selection
                options={opcoesMostrarValores}
                placeholder="Selecione o que exibir"
                onChange={(e, { value }) => setTipo(value as string)}
              />
            </Form.Field>
            {tipo === 'entradas' && (
              <Form.Field>
                <label>Tipo de Entrada</label>
                <Dropdown
                  selection
                  options={opcoesTipoEntrada}
                  placeholder="Selecione o tipo de entrada"
                  onChange={(e, { value }) =>
                    setSubTipoEntrada(value as string)
                  }
                />
              </Form.Field>
            )}
            {tipo === 'saidas' && (
              <Form.Field>
                <label>Tipo de Saída</label>
                <Dropdown
                  selection
                  options={opcoesTipoSaida}
                  placeholder="Selecione o tipo de saída"
                  onChange={(e, { value }) => setSubTipoSaida(value as string)}
                />
              </Form.Field>
            )}
            <S.Flex>
              <Button onClick={aplicarFiltro}>Aplicar Filtro</Button>

              <Button type="button" onClick={() => setShowFilter(false)}>
                Fechar Filtro
              </Button>
            </S.Flex>
          </Form>
        </S.Content>
      )}
    </S.Container>
  );
};

export default Filtro;
