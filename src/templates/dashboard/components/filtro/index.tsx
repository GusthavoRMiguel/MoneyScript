import React, { useState } from 'react';
import { Dropdown, Form, Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import * as S from './style';
import { FaFilterCircleDollar } from 'react-icons/fa6';

interface FilterProps {
  onApplyFilter: (filterParams: any) => void;
}

const Filtro: React.FC<FilterProps> = ({ onApplyFilter }) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [intervaloData, setIntervaloData] = useState<{
    inicio: Date;
    fim: Date;
  }>({
    inicio: new Date(),
    fim: new Date()
  });
  const [mostrarValores, setMostrarValores] = useState<string>('todos');
  const [tipoEntrada, setTipoEntrada] = useState<string>('Salário');
  const [tipoSaida, setTipoSaida] = useState<string>('Conta de Luz');

  const opcoesMostrarValores = [
    { key: 't', text: 'Todos', value: 'todos' },
    { key: 'e', text: 'Somente Entradas', value: 'entradas' },
    { key: 's', text: 'Somente Saídas', value: 'saidas' }
  ];

  const opcoesTipoEntrada = [
    { key: 'todasEntradas', text: 'Todas as Entradas', value: '' },
    { key: 'salario', text: 'Salário', value: 'Salário' },
    { key: 'bonus', text: 'Bônus', value: 'Bônus' },
    { key: 'outraEntrada', text: 'Outra Entrada', value: 'Outra Entrada' }
  ];

  const opcoesTipoSaida = [
    { key: 'todasSaidas', text: 'Todas as Saídas', value: '' },
    { key: 'contaLuz', text: 'Conta de Luz', value: 'Conta de Luz' },
    { key: 'agua', text: 'Conta de Água', value: 'Conta de Água' },
    { key: 'outraSaida', text: 'Outra Saída', value: 'Outra Saída' }
  ];

  const schemaFiltro = Yup.object().shape({
    mostrarValores: Yup.string().required('A exibição é obrigatória'),
    tipoEntrada: Yup.string(),
    tipoSaida: Yup.string(),
    intervaloData: Yup.lazy((value: any) => {
      if (value && value.tipoPeriodo === 'outros') {
        return Yup.object().shape({
          inicio: Yup.date().required('A data de início é obrigatória'),
          fim: Yup.date().required('A data final é obrigatória')
        });
      }
      return Yup.mixed().notRequired();
    })
  });

  const aplicarFiltro = async () => {
    try {
      const parametrosFiltro = {
        mostrarValores,
        tipoEntrada: mostrarValores === 'entradas' ? tipoEntrada : null,
        tipoSaida: mostrarValores === 'saidas' ? tipoSaida : null
      };
      await schemaFiltro.validate(parametrosFiltro, { abortEarly: false });
      onApplyFilter(parametrosFiltro);
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
                  value={intervaloData.inicio.toISOString().split('T')[0]}
                  onChange={(e) =>
                    setIntervaloData({
                      ...intervaloData,
                      inicio: new Date(e.target.value)
                    })
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Data Final</label>
                <input
                  type="date"
                  value={intervaloData.fim.toISOString().split('T')[0]}
                  onChange={(e) =>
                    setIntervaloData({
                      ...intervaloData,
                      fim: new Date(e.target.value)
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
                onChange={(e, { value }) => setMostrarValores(value as string)}
              />
            </Form.Field>
            {mostrarValores === 'entradas' && (
              <Form.Field>
                <label>Tipo de Entrada</label>
                <Dropdown
                  selection
                  options={opcoesTipoEntrada}
                  placeholder="Selecione o tipo de entrada"
                  onChange={(e, { value }) => setTipoEntrada(value as string)}
                />
              </Form.Field>
            )}
            {mostrarValores === 'saidas' && (
              <Form.Field>
                <label>Tipo de Saída</label>
                <Dropdown
                  selection
                  options={opcoesTipoSaida}
                  placeholder="Selecione o tipo de saída"
                  onChange={(e, { value }) => setTipoSaida(value as string)}
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
