'use client';
import React, { useState } from 'react';

import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import * as S from './style';

import { useAuth } from '@/hooks/Auth';
import IUserData from '@/interfaces/IUserData';

import Input from '../components/Input';
import Button from '../components/Button';

const CompleteRegisterPage: React.FC = () => {
  const { signupComplete } = useAuth();
  const [error, setError] = useState<string>('');
  const [isFormSubmitting, setFormSubmitting] = useState<boolean>(false);

  const initialValues = {
    nome: '',
    sobrenome: '',
    dataNasc: '',
    telefone: '',
    fotoUrl: '',
    email: '',
    cidade: '',
    estado: ''
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('O campo nome é obrigatório'),
    sobrenome: Yup.string().required('O campo sobrenome é obrigatório'),
    dataNasc: Yup.date(),
    telefone: Yup.string().optional()
  });

  async function handleSubmit(
    values: IUserData,
    { resetForm }: FormikHelpers<IUserData>
  ) {
    setFormSubmitting(true);
    try {
      const { nome, sobrenome, dataNasc, telefone } = values;

      await signupComplete({
        nome: nome,
        sobrenome: sobrenome,
        dataNasc: dataNasc,
        telefone: telefone,
        fotoUrl: '',
        email: '',
        cidade: '',
        estado: ''
      });

      setFormSubmitting(false);
    } catch (error) {
      setFormSubmitting(false);
      renderError('Erro ao completar o cadastro. Tente novamente mais tarde!');
    }
  }

  function renderError(msg: string) {
    setError(msg);
    setTimeout(() => {
      setError('');
    }, 3000);
  }

  return (
    <S.Container>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form noValidate className="flexForm">
            <Input name="nome" label="Nome" type="text" required />
            <Input name="sobrenome" label="Sobrenome" type="text" required />
            <Input
              name="dataNasc"
              label="Data de Nascimento"
              type="date"
              required={false}
            />
            <Input
              name="telefone"
              label="Celular"
              type="phone"
              required={false}
            />

            <Button
              type="submit"
              text={isFormSubmitting ? 'Carregando...' : 'Inscrever-se'}
              disabled={isFormSubmitting}
              secondary
            />

            {!values.nome && !values.sobrenome && error && (
              <span style={{ color: 'red' }}>{error}</span>
            )}
          </Form>
        )}
      </Formik>
    </S.Container>
  );
};

export default CompleteRegisterPage;
