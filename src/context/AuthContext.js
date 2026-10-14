import { createContext, useState } from 'react';
import { USERS } from '../data/posts';

// 1. Se crea el Context con createContext.
export const AuthContext = createContext(null);

// 2. Provider: guarda el usuario logueado y expone las acciones de sesión.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const found = USERS.find(
      (u) => u.username === username.trim().toLowerCase() && u.password === password
    );
    if (!found) return false;
    const { password: _omit, ...publicUser } = found;
    setUser(publicUser);
    return true;
  };

  const logout = () => setUser(null);

  const updateBio = (bio) => setUser((prev) => ({ ...prev, bio }));

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: user !== null, login, logout, updateBio }}>
      {children}
    </AuthContext.Provider>
  );
}

