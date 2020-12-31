import AsyncStorage from '@react-native-community/async-storage';
import React, {
  createContext, useCallback, useContext, useEffect, useState,
} from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: Record<string, unknown>;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: Record<string, unknown>;
  loading: boolean;
  signIn(credentials: Credentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [ token, user ] = await AsyncStorage.multiGet(['@GoBarber:token', '@GoBarber:user']);

      if (token[1] && user[1]) {
        setData({token: token[1], user: JSON.parse(user[1])});
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([['@GoBarber:token', token], ['@GoBarber:user', JSON.stringify(user)]]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};