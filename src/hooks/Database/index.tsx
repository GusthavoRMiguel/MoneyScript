import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from 'react';

import firebase from '../../lib/firebase';
import { useAuth } from '../Auth';

import IUserData from '@/interfaces/IUserData';
import IProfissionalData from '@/interfaces/IProfissonalData';

interface DBContextProps {
  userData: IUserData;
  profissionalData: IProfissionalData;
  loading: boolean;
  getUserData: () => Promise<void>;
  updateUserData: (data: Partial<IUserData>) => Promise<void>;
}

const DBContext = createContext<DBContextProps | undefined>(undefined);

export function useDB(): DBContextProps {
  const context = useContext(DBContext);
  if (!context) {
    throw new Error('useDB must be used within an DBProvider');
  }
  return context;
}

export function DBProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<IUserData>({
    nome: '',
    sobrenome: '',
    dataNasc: '',
    telefone: '',
    fotoUrl: '',
    email: '',
    cidade: '',
    estado: ''
  });

  const [profissionalData, setProfissionalData] = useState<IProfissionalData>({
    cargo: '',
    profissao: '',
    salario: {
      fixo: 0,
      comissao: 0,
      variavel: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const formatUserData = async (
    userData: firebase.firestore.DocumentData | undefined
  ): Promise<IUserData> => {
    if (!userData) {
      return {
        nome: '',
        sobrenome: '',
        dataNasc: '',
        telefone: '',
        fotoUrl: '',
        email: '',
        cidade: '',
        estado: ''
      };
    }

    return {
      nome: userData.nome || '',
      sobrenome: userData.sobrenome || '',
      dataNasc: userData.dataNasc || '',
      telefone: userData.telefone || '',
      fotoUrl: userData.fotoUrl || '',
      email: userData.email || '',
      cidade: userData.cidade || '',
      estado: userData.estado || ''
    };
  };

  const getUserData = async () => {
    try {
      const id = user?.uid;
      if (!id) {
        return;
      }
      const userDoc = await firebase
        .firestore()
        .collection('users')
        .doc(id)
        .get();
      const userDataFormatted = await formatUserData(userDoc.data());

      setUserData(userDataFormatted);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar informações adicionais do usuário:', error);
      setLoading(false);
    }
  };

  const updateUserData = async (data: Partial<IUserData>) => {
    try {
      const id = user?.uid;
      if (!id) {
        return;
      }
      await firebase.firestore().collection('users').doc(id).update(data);
      setUserData((prevData) => ({ ...prevData, ...data }));
    } catch (error) {
      console.error('Erro ao atualizar informações do usuário:', error);
    }
  };

  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user]);

  const dbContextValue: DBContextProps = {
    profissionalData,
    userData,
    loading,
    getUserData,
    updateUserData
  };

  return (
    <DBContext.Provider value={dbContextValue}>{children}</DBContext.Provider>
  );
}

export default DBContext;
