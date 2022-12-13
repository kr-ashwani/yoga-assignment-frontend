import React, { useState, useContext, useEffect } from 'react';

const AuthContext = React.createContext();

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState({ currentUser: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAccessToken() {
      setLoading(true);
      try {
        let res = await fetch(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/refresh`,
          {
            credentials: 'include',
          }
        );
        if (!res.ok) return;
        const { currentUser } = await res.json();
        if (currentUser) setUser((prev) => ({ ...prev, currentUser }));
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    getAccessToken();
  }, []);

  const value = {
    ...user,
    setUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth, AuthProvider };
