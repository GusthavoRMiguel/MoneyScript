'use client';
import React from 'react';
import ModelsWrapper from './components/Model/ModelsWrapper';
import ModelSection from './components/Model/ModelSection';
import DefaultOverlayContent from './components/DefaultOverlayContent';
import UniqueOverlay from './components/UniqueOverlay';
import { Container, Spacer } from './styles';
import Menu from '@/components/menu';

const HomePage: React.FC = () => {
  const modelData = [
    {
      id: 0,
      modelName: 'Bem-vindo ao Money Script',
      description: '',
      text: 'O Money Script é sua plataforma completa para gerenciamento financeiro pessoal. Organize suas finanças, monitore seus gastos e mantenha o controle total sobre suas receitas e despesas, tudo em um único lugar.',
      items: [],
      listTitle: ''
    },
    {
      id: 1,
      modelName: 'Gerencie Suas Finanças de Forma Inteligente',
      description: '',
      text: '',
      listTitle: 'Com o Money Script, você pode:',
      items: [
        {
          title: 'Registrar suas transações:',
          text: 'Adicione facilmente suas receitas e despesas para manter um registro claro de seus gastos diários.'
        },
        {
          title: 'Acompanhar suas metas financeiras:',
          text: 'Defina objetivos financeiros e acompanhe seu progresso para realizá-los.'
        },
        {
          title: 'Visualizar relatórios detalhados: ',
          text: 'Obtenha insights valiosos com gráficos e relatórios personalizados para entender melhor seus padrões de gastos.'
        },
        {
          title: 'Financiamentos Simulares:',
          text: 'Calcule seus empréstimos, visualize amortizações e planeje pagamentos de forma inteligente.'
        }
      ]
    },
    {
      id: 2,
      modelName: 'Segurança e Facilidade de Uso',
      description: '',
      text: 'Estamos comprometidos em garantir a segurança dos seus dados. O Money Script utiliza as mais avançadas tecnologias de segurança para proteger suas informações financeiras. Além disso, nossa interface amigável torna a gestão financeira uma tarefa simples e intuitiva, permitindo que você se concentre no que realmente importa: atingir suas metas financeiras.',
      listTitle: '',
      items: []
    },
    {
      id: 3,
      modelName: 'Comece agora!',
      description: '',
      text: 'Cadastre-se gratuitamente e dê o primeiro passo rumo a uma gestão financeira mais eficiente e consciente. Experimente o Money Script hoje mesmo!',
      listTitle: '',
      items: []
    }
  ];

  return (
    <Container>
      <ModelsWrapper>
        <Menu />
        <div>
          {modelData.map(
            ({ id, modelName, text, description, items, listTitle }) => (
              <ModelSection
                key={id}
                className="colored"
                modelName={modelName}
                overlayNode={
                  <DefaultOverlayContent
                    label={modelName}
                    description={description}
                    text={text}
                    listItems={items}
                    listTitle={listTitle}
                  />
                }
              />
            )
          )}
        </div>

        <Spacer />

        <UniqueOverlay />
      </ModelsWrapper>
    </Container>
  );
};

export default HomePage;
