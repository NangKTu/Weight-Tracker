import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CheckinContextProps {
  refreshTrigger: boolean;
  triggerRefresh: () => void;
}

const CheckinContext = createContext<CheckinContextProps | undefined>(
  undefined
);

export const CheckinProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const triggerRefresh = () => {
    setRefreshTrigger((prev) => !prev);
  };

  return (
    <CheckinContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </CheckinContext.Provider>
  );
};

export const useCheckinContext = (): CheckinContextProps => {
  const context = useContext(CheckinContext);
  if (!context) {
    throw new Error('useCheckinContext must be used within a CheckinProvider');
  }
  return context;
};
