import React, { useContext, useState, useEffect } from "react";

interface IContext {
  notification: Notification | undefined;
  setNotification: React.Dispatch<
    React.SetStateAction<Notification | undefined>
  >;
}

export interface Notification {
  text: string;
}

export function useNotification(): IContext {
  return useContext(NotificationContext);
}

export const NotificationContext = React.createContext<IContext>(
  {} as IContext,
);

export const NotificationContextProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | undefined>(
    undefined,
  );

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(undefined);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
