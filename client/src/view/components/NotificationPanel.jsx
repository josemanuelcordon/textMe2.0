import React from "react";
import { useNotifications } from "../context/NotificationContext";
import ToastNotifies from "./ToastNotifies";

const NotificationPanel = () => {
  const { notifications } = useNotifications();

  return (
    <aside className="notification-panel">
      {notifications.map((notification) => (
        <ToastNotifies notification={notification} />
      ))}
    </aside>
  );
};

export default NotificationPanel;
