import { useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = (username) => {
    setUser({ username, avatar: username[0].toUpperCase() });
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
};
