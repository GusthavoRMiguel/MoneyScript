'use client';
import React from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import * as S from './style';

import { useAuth } from '@/hooks/Auth';

import { FaGithub, FaGoogle, FaFacebook } from 'react-icons/fa';

import Input from '../components/Input';
import Button from '../components/Button';

const LoginPage: React.FC = () => {
  const { signinGitHub, signinGoogle, signinEmail, signinFacebook } = useAuth();

  const handleSigninGithub = () => {
    signinGitHub();
  };

  const handleSigninGoogle = () => {
    signinGoogle();
  };

  const handleSigninFacebook = () => {
    signinFacebook();
  };

  const initalValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O campo e-mail é obrigatório'),
    password: Yup.string().required('O campo senha é obrigatório')
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await signinEmail(values.email, values.password);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    } finally {
    }
  };

  return (
    <S.Container>
      <Formik
        validationSchema={validationSchema}
        initialValues={initalValues}
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

            <S.Flex>
              <S.IconButton type="button" onClick={handleSigninGoogle}>
                <FaGoogle size={25} />
                <p>Entrar com Google</p>
              </S.IconButton>
              <S.IconButton type="button" onClick={handleSigninFacebook}>
                <FaFacebook size={25} />
                <p>Entrar com Facebook</p>
              </S.IconButton>
              <S.IconButton type="button" onClick={handleSigninGithub}>
                <FaGithub size={25} />
                <p>Entrar com Github</p>
              </S.IconButton>
            </S.Flex>

            <Button type="submit" text="Entrar" />

            <span>
              Não possui uma conta?
              <strong>
                <Link href="/register">Inscreva-se</Link>
              </strong>
            </span>
          </Form>
        )}
      </Formik>
    </S.Container>
  );
};

export default LoginPage;
