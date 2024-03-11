/* eslint-disable react/prop-types */
import { createContext, useMemo, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: localStorage.getItem("id"),
    email: localStorage.getItem("email"),
    username: localStorage.getItem("username"),
  });

  useEffect(() => {
    localStorage.setItem("id", user.id);
    localStorage.setItem("email", user.email);
    localStorage.setItem("username", user.username);
  }, [user]);

  const props = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={props}>{children}</UserContext.Provider>;
}

export default UserContext;
