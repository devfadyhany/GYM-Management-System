"use client";

const { useState, createContext, useEffect } = require("react");

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  let firstTime = false;
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUser(JSON.parse(localStorage.getItem("User")));
      firstTime = true;
    }
  }, []);

  const UpdateUser = (data) => {
    setCurrentUser(data);
  };

  useEffect(() => {
    if (!firstTime) {
      localStorage.setItem("User", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, UpdateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
