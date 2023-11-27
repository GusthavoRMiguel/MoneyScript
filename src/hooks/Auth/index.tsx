import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import firebase from '../../lib/firebase';

import IUserData from '@/interfaces/IUserData';

interface ProviderInfo {
  providerId: string;
}

interface User {
  uid: string;
  email: string;
  nome: string;
  sobrenome: string;
  token: string;
  provider: ProviderInfo[];
  fotoUrl: string;
  telefone: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  signinGitHub: () => Promise<void>;
  linkGitHub: () => Promise<void>;
  signinGoogle: () => Promise<void>;
  linkGoogle: () => Promise<void>;
  signinFacebook: () => Promise<void>;
  linkFacebook: () => Promise<void>;
  signinEmail: (email: string, password: string) => Promise<void>;
  signupEmail: (email: string, password: string) => Promise<void>;
  signupComplete: (userData: IUserData) => Promise<void>;
  updateUserData: (userData: IUserData) => Promise<void>;
  signout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const formatUser = async (currentUser: firebase.User): Promise<User> => {
    const token = await currentUser.getIdToken();

    const displayName = currentUser.displayName || '';
    const [firstName, ...lastNameArray] = displayName.split(' ');
    const lastName = lastNameArray.join(' ');

    const providerInfo = currentUser.providerData.map((provider) => ({
      providerId: provider?.providerId || ''
    }));

    return {
      uid: currentUser.uid,
      email: currentUser.email || '',
      nome: firstName || '',
      sobrenome: lastName || '',
      token: token || '',
      provider: providerInfo,
      fotoUrl: currentUser.photoURL || '',
      telefone: currentUser.phoneNumber || ''
    };
  };

  const handleUser = async (currentUser: firebase.User | null) => {
    if (currentUser) {
      const formattedUser = await formatUser(currentUser);
      setUser(formattedUser);
      setSession(true);
    } else {
      setUser(null);
      setSession(false);
    }
    setLoading(false);
  };

  const setSession = (session: boolean) => {
    if (session) {
      cookie.set('moneyscript-auth', session.toString(), {
        expires: 1
      });
    } else {
      cookie.remove('moneyscript-auth');
    }
  };

  const updateUserData = async (userData: IUserData) => {
    try {
      const currentUser = firebase.auth().currentUser;
      if (!currentUser) {
        return;
      }

      const userDoc = await firebase
        .firestore()
        .collection('users')
        .doc(currentUser.uid)
        .get();
      const userFromFirestore = userDoc.data() as User | undefined;

      const updatedUser: Partial<User> = {};

      if (userData.nome && !userFromFirestore?.nome) {
        updatedUser.nome = userData.nome;
      }
      if (userData.sobrenome && !userFromFirestore?.sobrenome) {
        updatedUser.sobrenome = userData.sobrenome;
      }
      if (userData.telefone && !userFromFirestore?.telefone) {
        updatedUser.telefone = userData.telefone;
      }
      if (userData.email && !userFromFirestore?.email) {
        updatedUser.email = userData.email;
      }
      if (userData.fotoUrl && !userFromFirestore?.fotoUrl) {
        updatedUser.fotoUrl = userData.fotoUrl;
      }

      if (Object.keys(updatedUser).length === 0) {
        return;
      }

      await firebase
        .firestore()
        .collection('users')
        .doc(currentUser.uid)
        .set(updatedUser, { merge: true });

      setUser((prevUser) => ({
        ...(prevUser as User),
        ...updatedUser
      }));
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
    }
  };

  const signupEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const { user } = response;

      if (user) {
        localStorage.setItem('tempUID', user.uid);
      }

      Router.push('/completeRegister');
      console.log(user);
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      setLoading(false);
    }
  };

  const signupComplete = async (userData: IUserData) => {
    try {
      const tempUID = localStorage.getItem('tempUID');
      if (!tempUID) {
        return;
      }

      await firebase.firestore().collection('users').doc(tempUID).set(userData);

      localStorage.removeItem('tempUID');

      Router.push('/login');
    } catch (error) {
      console.error('Erro ao salvar informações adicionais do usuário:', error);
    }
  };

  const signinEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      handleUser(response.user);
      console.log(response.user);
      Router.push('/conta');
    } catch (error) {
      console.error('Erro ao fazer login com email e senha:', error);
      setLoading(false);
    }
  };

  const signinGitHub = async () => {
    try {
      setLoading(true);
      const response = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GithubAuthProvider());
      if (response.user) {
        const displayName = response.user.displayName || '';
        const [firstName, ...lastNameArray] = displayName.split(' ');
        const lastName = lastNameArray.join(' ');

        const userFromResponse: IUserData = {
          nome: firstName || '',
          sobrenome: lastName || '',
          dataNasc: '',
          telefone: response.user.phoneNumber || '',
          fotoUrl: response.user.photoURL || '',
          email: response.user.email || '',
          cidade: '',
          estado: ''
        };

        await updateUserData(userFromResponse);
        handleUser(response.user);
        Router.push('/conta');
      } else {
        console.error('Usuário nulo ao fazer login com GitHub');
        setLoading(false);
      }
    } catch (error) {
      console.error('Erro ao fazer login com GitHub:', error);
      setLoading(false);
    }
  };

  const linkGitHub = async () => {
    try {
      setLoading(true);
      const user = firebase.auth().currentUser;
      if (!user) {
        return;
      }

      const provider = new firebase.auth.GithubAuthProvider();
      const response = await user.linkWithPopup(provider);
      const displayName = response.user?.displayName || '';
      const [firstName, ...lastNameArray] = displayName.split(' ');
      const lastName = lastNameArray.join(' ');
      await updateUserData({
        nome: firstName || '',
        sobrenome: lastName,
        dataNasc: '',
        telefone: response.user?.phoneNumber || '',
        fotoUrl: response.user?.photoURL || '',
        email: response.user?.email || '',
        cidade: '',
        estado: ''
      });
    } catch (error) {
      console.error('Erro ao vincular conta:', error);
      setLoading(false);
    }
  };

  const signinGoogle = async () => {
    try {
      setLoading(true);
      const response = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());

      if (response.user) {
        const displayName = response.user.displayName || '';
        const [firstName, ...lastNameArray] = displayName.split(' ');
        const lastName = lastNameArray.join(' ');

        const userFromResponse: IUserData = {
          nome: firstName || '',
          sobrenome: lastName || '',
          dataNasc: '',
          telefone: response.user.phoneNumber || '',
          fotoUrl: response.user.photoURL || '',
          email: response.user.email || '',
          cidade: '',
          estado: ''
        };

        await updateUserData(userFromResponse);
        handleUser(response.user);
        console.log(response.user, userFromResponse);
        Router.push('/conta');
      } else {
        console.error('Usuário nulo ao fazer login com Google');
        setLoading(false);
      }
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
      setLoading(false);
    }
  };

  const linkGoogle = async () => {
    try {
      setLoading(true);
      const user = firebase.auth().currentUser;
      if (!user) {
        return;
      }

      const provider = new firebase.auth.GoogleAuthProvider();
      const response = await user.linkWithPopup(provider);
      const displayName = response.user?.displayName || '';
      const [firstName, ...lastNameArray] = displayName.split(' ');
      const lastName = lastNameArray.join(' ');
      await updateUserData({
        nome: firstName || '',
        sobrenome: lastName,
        dataNasc: '',
        telefone: response.user?.phoneNumber || '',
        fotoUrl: response.user?.photoURL || '',
        email: response.user?.email || '',
        cidade: '',
        estado: ''
      });
    } catch (error) {
      console.error('Erro ao vincular conta:', error);
      setLoading(false);
    }
  };

  const signinFacebook = async () => {
    try {
      setLoading(true);
      const response = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.FacebookAuthProvider());
      if (response.user) {
        const displayName = response.user.displayName || '';
        const [firstName, ...lastNameArray] = displayName.split(' ');
        const lastName = lastNameArray.join(' ');

        const userFromResponse: IUserData = {
          nome: firstName || '',
          sobrenome: lastName || '',
          dataNasc: '',
          telefone: response.user.phoneNumber || '',
          fotoUrl: response.user.photoURL || '',
          email: response.user.email || '',
          cidade: '',
          estado: ''
        };

        await updateUserData(userFromResponse);
        handleUser(response.user);
        Router.push('/conta');
      } else {
        console.error('Usuário nulo ao fazer login com Facebook');
        setLoading(false);
      }
    } catch (error) {
      console.error('Erro ao fazer login com Facebook:', error);
      setLoading(false);
    }
  };

  const linkFacebook = async () => {
    try {
      setLoading(true);
      const user = firebase.auth().currentUser;
      if (!user) {
        return;
      }

      const provider = new firebase.auth.FacebookAuthProvider();
      const response = await user.linkWithPopup(provider);
      const displayName = response.user?.displayName || '';
      const [firstName, ...lastNameArray] = displayName.split(' ');
      const lastName = lastNameArray.join(' ');
      await updateUserData({
        nome: firstName || '',
        sobrenome: lastName,
        dataNasc: '',
        telefone: response.user?.phoneNumber || '',
        fotoUrl: response.user?.photoURL || '',
        email: response.user?.email || '',
        cidade: '',
        estado: ''
      });
    } catch (error) {
      console.error('Erro ao vincular conta:', error);
      setLoading(false);
    }
  };

  const signout = async () => {
    try {
      Router.push('/');
      await firebase.auth().signOut();
      handleUser(null);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, []);

  const authContextValue: AuthContextProps = {
    user,
    loading,
    signinGitHub,
    linkGitHub,
    signinGoogle,
    linkGoogle,
    signinFacebook,
    linkFacebook,
    signinEmail,
    signupEmail,
    signupComplete,
    updateUserData,
    signout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
