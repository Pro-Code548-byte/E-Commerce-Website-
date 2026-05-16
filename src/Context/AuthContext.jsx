import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    localStorage.setItem("lastUserEmail", userData.email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const updateProfile = (profileUpdates) => {
    const updatedUser = { ...user, ...profileUpdates };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = savedUsers.map((savedUser) => {
      if (savedUser.email === user.email) {
        return { ...savedUser, ...profileUpdates };
      }
      return savedUser;
    });

    if (!savedUsers.some((savedUser) => savedUser.email === user.email)) {
      updatedUsers.push(updatedUser);
    }

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
