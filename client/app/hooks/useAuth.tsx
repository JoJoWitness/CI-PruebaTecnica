import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (user: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  token: string | null;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  isLoading: true,
  token: "",
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>("");

  const validateSession = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      console.log("token:", accessToken)
      if (accessToken) {
        setToken(accessToken);
        const res = await fetch('http://localhost:3000/auth/refresh-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Credential': 'include',
          },
        });
 
        if (res.status === 200) {
          setIsAuthenticated(true);
        } 
      }
      setIsLoading(false);  
    } catch (error) {
      console.error('Error validating session:', error);
      setIsAuthenticated(false);
      setIsLoading(false); 
    } 
  };

  const login = async (user: string, password: string): Promise<void> => {
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user,
          password: password,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const tokenT = data.accessToken;
      if (tokenT) {
        localStorage.setItem('accessToken', tokenT);
        setToken(tokenT);
        setIsAuthenticated(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('session-cookie'); 
  };

  useEffect(() => {
    validateSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);