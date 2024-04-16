import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import * as S from './style';

import { useAuth } from '@/hooks/Auth';

import Input from '../components/Input';
import Button from '../components/Button';

interface FormValues {
  email: string;
  password: string;
  confirm_password: string;
}

const RegisterPage: React.FC = () => {
  const { signupEmail } = useAuth();
  const [error, setError] = useState<string>('');
  const [isFormSubmitting, setFormSubmitting] = useState<boolean>(false);

  const initialValues = {
    email: '',
    password: '',
    confirm_password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O campo e-mail é obrigatório'),
    password: Yup.string().required('O campo senha é obrigatório'),
    confirm_password: Yup.string().required(
      'O campo confirmar senha é obrigatório'
    )
  });

  async function handleSubmit(
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) {
    setFormSubmitting(true);
    try {
      if (values.password !== values.confirm_password) {
        renderError('As senhas não são iguais');
        resetForm();
        setFormSubmitting(false);
        return;
      }

      await signupEmail(values.email, values.password);

      setFormSubmitting(false);
    } catch (error) {
      setFormSubmitting(false);
      renderError('Erro ao criar conta, tente mais tarde!');
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
            <Input name="email" label="Email" type="email" required />
            <Input
              name="password"
              label="Senha"
              type="password"
              required
              icon
            />
            <Input
              name="confirm_password"
              label="Confirmar Senha"
              type="password"
              required
              icon
            />

            <Button
              type="submit"
              text={isFormSubmitting ? 'Carregando...' : 'Inscrever-se'}
              disabled={isFormSubmitting}
              secondary
            />

            {!values.email && !values.password && error && (
              <span style={{ color: 'red' }}>{error}</span>
            )}

            <span>
              Já possui uma conta?
              <strong>
                <Link href="/">Entre</Link>
              </strong>
            </span>
          </Form>
        )}
      </Formik>
    </S.Container>
  );
};

export default RegisterPage;
