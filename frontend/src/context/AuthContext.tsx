import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { AuthContextType } from "../types";

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setTokenState(saved);
  }, []);

  const setToken = (tok: string | null) => {
    setTokenState(tok);
    if (tok) localStorage.setItem("token", tok);
    else localStorage.removeItem("token");
  };

  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
