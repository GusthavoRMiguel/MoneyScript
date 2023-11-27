import React, { useState, useEffect } from 'react';
import * as S from './styles';
import Menu from '@/components/menu';
import { useAuth } from '@/hooks/Auth';
import { useDB } from '@/hooks/Database';
import IUserData from '@/interfaces/IUserData';
import IProfissionalData from '@/interfaces/IProfissonalData';

import {
  FaGithub,
  FaGoogle,
  FaFacebook,
  FaUserEdit,
  FaRegEdit,
  FaRegSave
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

const Account: React.FC = () => {
  const { linkFacebook, linkGitHub, linkGoogle, user } = useAuth();
  const { userData, getUserData, updateUserData, profissionalData } = useDB();
  const [content, setContent] = useState('Info');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const [editableData, setEditableData] = useState<IUserData>({
    nome: userData.nome || '',
    sobrenome: userData.sobrenome || '',
    telefone: userData.telefone || '',
    dataNasc: userData.dataNasc || '',
    email: userData.email || '',
    cidade: userData.cidade || '',
    estado: userData.estado || '',
    fotoUrl: userData.fotoUrl || ''
  });

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value });
  };

  return (
    <S.Container>
      <Menu />

      <S.ContentWrapper>
        <S.SideBar>
          <S.SideButton onClick={() => setContent('Info')}>
            Informações do perfil
          </S.SideButton>
          <S.SideButton onClick={() => setContent('Config')}>
            Configurações
          </S.SideButton>
          <S.SideButton onClick={() => setContent('Safe')}>
            Segurança
          </S.SideButton>
        </S.SideBar>

        <S.Content>
          {content === 'Info' && userData && (
            <>
              <S.Heading>
                <S.Avatar>
                  {userData.fotoUrl ? (
                    <img src={userData.fotoUrl} alt="avatar" />
                  ) : (
                    <FaUserEdit />
                  )}
                </S.Avatar>

                <S.Info>
                  <h1>
                    {userData.nome} {userData.sobrenome}
                  </h1>
                  <h2>
                    {profissionalData.profissao} {profissionalData.cargo}
                  </h2>
                  <h2>{userData.email}</h2>
                </S.Info>
                <S.Link>
                  <h1>Sincronizar contas.</h1>
                  <div>
                    <button
                      onClick={linkGoogle}
                      disabled={user?.provider?.some(
                        (provider) => provider?.providerId === 'google.com'
                      )}
                    >
                      <FaGoogle size={40} />
                      {user?.provider?.some(
                        (provider) => provider?.providerId === 'google.com'
                      ) && <MdVerified className="verify" />}
                    </button>
                    <button
                      onClick={linkFacebook}
                      disabled={user?.provider?.some(
                        (provider) => provider?.providerId === 'facebook.com'
                      )}
                    >
                      <FaFacebook size={40} />
                      {user?.provider?.some(
                        (provider) => provider?.providerId === 'facebook.com'
                      ) && <MdVerified className="verify" />}
                    </button>
                    <button
                      onClick={linkGitHub}
                      disabled={user?.provider?.some(
                        (provider) => provider?.providerId === 'github.com'
                      )}
                    >
                      <FaGithub size={40} />
                      {user?.provider?.some(
                        (provider) => provider?.providerId === 'github.com'
                      ) && <MdVerified className="verify" />}
                    </button>
                  </div>
                </S.Link>
              </S.Heading>
              <S.Body>
                <S.Option>
                  <label htmlFor="nome">Nome:</label>
                  <div>
                    {!edit ? (
                      <span>{userData.nome}</span>
                    ) : (
                      <input
                        type="text"
                        name="nome"
                        value={editableData.nome || userData.nome}
                        onChange={handleInputChange}
                      />
                    )}
                    <button onClick={handleEdit}>
                      {!edit ? <FaRegEdit /> : <FaRegSave />}
                    </button>
                  </div>
                </S.Option>

                <S.Option>
                  <label htmlFor="sobrenome">Sobrenome:</label>
                  <div>
                    {!edit ? (
                      <span>{userData?.sobrenome}</span>
                    ) : (
                      <input
                        type="text"
                        name="sobrenome"
                        value={editableData.sobrenome || userData?.sobrenome}
                        onChange={handleInputChange}
                      />
                    )}
                    <button onClick={handleEdit}>
                      {!edit ? <FaRegEdit /> : <FaRegSave />}
                    </button>
                  </div>
                </S.Option>

                <S.Option>
                  <label htmlFor="telefone">Telefone:</label>
                  <div>
                    {!edit ? (
                      <span>{userData?.telefone}</span>
                    ) : (
                      <input
                        type="tel"
                        name="telefone"
                        value={editableData.telefone || userData?.telefone}
                        onChange={handleInputChange}
                      />
                    )}
                    <button onClick={handleEdit}>
                      {!edit ? <FaRegEdit /> : <FaRegSave />}
                    </button>
                  </div>
                </S.Option>

                <S.Option>
                  <label htmlFor="dataNasc">Data de Nascimento:</label>
                  <div>
                    {!edit ? (
                      <span>{userData?.dataNasc}</span>
                    ) : (
                      <input
                        type="date"
                        name="dataNasc"
                        value={editableData.dataNasc || userData.dataNasc}
                        onChange={handleInputChange}
                      />
                    )}
                    <button onClick={handleEdit}>
                      {!edit ? <FaRegEdit /> : <FaRegSave />}
                    </button>
                  </div>
                </S.Option>

                <S.Option>
                  <label htmlFor="cidade">Cidade:</label>
                  <div>
                    {!edit ? (
                      <span>{userData?.cidade}</span>
                    ) : (
                      <input
                        type="text"
                        name="cidade"
                        value={editableData.cidade || userData?.cidade}
                        onChange={handleInputChange}
                      />
                    )}
                    <button onClick={handleEdit}>
                      {!edit ? <FaRegEdit /> : <FaRegSave />}
                    </button>
                  </div>
                </S.Option>

                <S.Option>
                  <label htmlFor="estado">Estado:</label>
                  <div>
                    {!edit ? (
                      <span>{userData?.estado}</span>
                    ) : (
                      <input
                        type="text"
                        name="estado"
                        value={editableData.estado || userData?.estado}
                        onChange={handleInputChange}
                      />
                    )}
                    <button onClick={handleEdit}>
                      {!edit ? <FaRegEdit /> : <FaRegSave />}
                    </button>
                  </div>
                </S.Option>
              </S.Body>
            </>
          )}

          {content === 'Config' && <div>Config</div>}

          {content === 'Safe' && (
            <>
              <S.Heading>
                <h1>Alteração de Senha</h1>
              </S.Heading>
              <S.Body>
                <S.Option>
                  <label htmlFor="novaSenha">Nova Senha: </label>
                  <div>
                    <input type="password" />
                    <button>ver senha</button>
                  </div>
                </S.Option>
                <S.Option>
                  <label htmlFor="confirmarSenha">Confirmar Senha: </label>
                  <div>
                    <input type="password" />
                    <button>ver senha</button>
                  </div>
                </S.Option>
                <S.Option>
                  <div>
                    <button>Salvar</button>
                  </div>
                </S.Option>
              </S.Body>
            </>
          )}
        </S.Content>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default Account;
