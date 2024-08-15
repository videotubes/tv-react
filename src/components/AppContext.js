import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [hashPath, setHashPath] = useState('');

  return (
    <AppContext.Provider value={{ hashPath, setHashPath }}>
      {children}
    </AppContext.Provider>
  );
};
