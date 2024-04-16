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
import ITransaction from '@/interfaces/ITransaction';
import ITransactionFilter from '@/interfaces/ITransactionFilter';

interface DBContextProps {
  userData: IUserData;
  profissionalData: IProfissionalData;
  loading: boolean;
  getUserData: () => Promise<void>;
  updateUserData: (data: Partial<IUserData>) => Promise<void>;
  addProfessionalData: (
    data: Partial<IProfissionalData>
  ) => Promise<{ success: boolean; error?: any }>;
  getProfessionalData: () => Promise<IProfissionalData | null>;
  addTransaction: (
    transactionData: ITransaction
  ) => Promise<{ success: boolean; error?: any }>;
  getTransactionsByFilter: (
    filterOptions: ITransactionFilter
  ) => Promise<any[]>;
  removeTransaction: (transactionId: string) => Promise<void>;
  getBalanceUntilMonth: (targetDate: Date) => Promise<number>;
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

  const formatProfessionalData = async (
    profissionalData: firebase.firestore.DocumentData | undefined
  ): Promise<IProfissionalData> => {
    if (!profissionalData) {
      return {
        cargo: '',
        profissao: '',
        salario: {
          fixo: 0,
          comissao: 0,
          variavel: 0
        }
      };
    }

    return {
      cargo: profissionalData.cargo || '',
      profissao: profissionalData.profissao || '',
      salario: {
        fixo: profissionalData.salario?.fixo || 0,
        comissao: profissionalData.salario?.comissao || 0,
        variavel: profissionalData.salario?.variavel || 0
      }
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

  const addProfessionalData = async (data: Partial<IProfissionalData>) => {
    try {
      const id = user?.uid;
      if (!id) {
        return { success: false, error: 'User not authenticated' };
      }
      await firebase.firestore().collection('users').doc(id).update({
        profissionalData: data
      });
      setProfissionalData((prevData) => ({ ...prevData, ...data }));
      return { success: true };
    } catch (error) {
      console.error('Error adding professional data: ', error);
      return { success: false, error };
    }
  };

  const getProfessionalData = async (): Promise<IProfissionalData | null> => {
    try {
      const id = user?.uid;
      if (!id) {
        return null;
      }
      const userDoc = await firebase
        .firestore()
        .collection('users')
        .doc(id)
        .get();
      const userData = userDoc.data();
      if (userData && userData.profissionalData) {
        return formatProfessionalData(userData.profissionalData);
      }
      return null;
    } catch (error) {
      console.error('Error fetching professional data: ', error);
      return null;
    }
  };

  const addTransaction = async (transactionData: ITransaction) => {
    try {
      const id = user?.uid;
      if (!id) {
        return { success: false, error: 'User not authenticated' };
      }
      const userRef = firebase.firestore().collection('users').doc(id);
      const transactionsRef = userRef.collection('transactions');
      await transactionsRef.add(transactionData);
      return { success: true };
    } catch (error) {
      console.error('Error adding transaction: ', error);
      return { success: false, error };
    }
  };

  const getTransactionsByFilter = async (filterOptions: ITransactionFilter) => {
    console.log('hook', filterOptions);
    try {
      const id = user?.uid;
      if (!id) {
        return [];
      }

      const userRef = firebase.firestore().collection('users').doc(id);
      const transactionsRef = userRef.collection('transactions');

      let query: firebase.firestore.Query<firebase.firestore.DocumentData> =
        transactionsRef;

      if (filterOptions.dataInicial && filterOptions.dataFinal) {
        query = query
          .where('data', '>=', filterOptions.dataInicial)
          .where('data', '<=', filterOptions.dataFinal);
      }

      if (filterOptions.tipo) {
        query = query.where('tipo', '==', filterOptions.tipo);
      }

      if (filterOptions.titulo) {
        query = query.where('titulo', '==', filterOptions.titulo);
      }

      query = query.orderBy('data', 'desc');

      const querySnapshot = await query.get();
      const transactions: ITransaction[] = [];

      querySnapshot.forEach((doc) => {
        const transactionData = doc.data() as ITransaction;
        const transactionId = doc.id;
        const transactionWithId = { ...transactionData, id: transactionId };
        transactions.push(transactionWithId);
      });

      return transactions;
    } catch (error) {
      console.error('Error fetching transactions: ', error);
      return [];
    }
  };

  const removeTransaction = async (transactionId: string) => {
    try {
      const id = user?.uid;
      if (!id) {
        throw new Error('User not authenticated');
      }

      const userRef = firebase.firestore().collection('users').doc(id);
      const transactionRef = userRef
        .collection('transactions')
        .doc(transactionId);

      await transactionRef.delete();
    } catch (error) {
      console.error('Error removing transaction:', error);
      throw error;
    }
  };

  const getBalanceUntilMonth = async (targetDate: Date): Promise<number> => {
    try {
      const id = user?.uid;
      if (!id) {
        throw new Error('User not authenticated');
      }

      const targetYear = targetDate.getFullYear();
      const targetMonth = targetDate.getMonth();
      const lastDayOfMonth = new Date(targetYear, targetMonth, 0).getDate();

      const userRef = firebase.firestore().collection('users').doc(id);
      const transactionsRef = userRef.collection('transactions');

      const querySnapshot = await transactionsRef
        .where(
          'data',
          '<=',
          new Date(targetYear, targetMonth - 1, lastDayOfMonth)
        )
        .get();

      let balance = 0;

      console.log(
        'Transactions:',
        querySnapshot.docs.map((doc) => doc.data())
      ); // Log das transações

      querySnapshot.forEach((doc) => {
        const transaction = doc.data() as ITransaction;
        const valor = transaction.valor || 0;

        if (transaction.tipo === 'entrada') {
          balance += valor;
        } else {
          balance -= valor;
        }
      });

      return balance;
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error;
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
    updateUserData,
    addProfessionalData,
    getProfessionalData,
    addTransaction,
    getTransactionsByFilter,
    removeTransaction,
    getBalanceUntilMonth
  };

  return (
    <DBContext.Provider value={dbContextValue}>{children}</DBContext.Provider>
  );
}

export default DBContext;
