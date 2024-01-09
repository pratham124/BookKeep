import React, { createContext, useState, useContext, ReactNode } from "react";

export type AuthContextType = {
  id: null | string;
  token: null | string;
  userName: null | string;
  setAuthInfo: ({
    id,
    token,
    userName,
  }: {
    id: string | null;
    token: string | null;
    userName: string | null;
  }) => void;
};

const AuthContext = createContext<null | AuthContextType>(null);

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<{
    id: null | string;
    token: null | string;
    userName: null | string;
  }>({ id: null, token: null, userName: null });

  const setAuthInfo = ({
    id,
    token,
    userName,
  }: {
    id: string | null;
    token: string | null;
    userName: string | null;
  }) => {
    setAuthState({ id, token, userName });
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
