// AuthContext.js
import React, { createContext, useState, useContext } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    console.log(notifications);
    setNotifications((prev) => [...prev, notification]);
  };

  const removeNotification = (notification) => {
    console.log(notification);
    setNotifications((prev) =>
      prev.filter((noti) => notification.id !== noti.id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationContext);
};
