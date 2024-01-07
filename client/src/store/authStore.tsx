import React, { createContext, useState, useContext, ReactNode } from "react";

type AuthContextType = {
  id: null | string;
  token: null | string;
  setAuthInfo: ({
    id,
    token,
  }: {
    id: string | null;
    token: string | null;
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
  }>({ id: null, token: null });

  const setAuthInfo = ({
    id,
    token,
  }: {
    id: string | null;
    token: string | null;
  }) => {
    setAuthState({ id, token });
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
