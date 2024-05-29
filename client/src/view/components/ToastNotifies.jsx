import { ToastNotification } from "@carbon/react";
import React, { useEffect } from "react";
import { useNotifications } from "../context/NotificationContext";

const notificationTitles = {
  error: "Error",
  info: "Info",
  success: "Éxito",
  warning: "Advertencia",
};

const ToastNotifies = ({ notification }) => {
  const { removeNotification } = useNotifications();

  useEffect(() => {
    setTimeout(() => {
      removeNotification(notification);
    }, 6000);
  }, []);

  return (
    <ToastNotification
      className="notification"
      aria-label="Cerrar Notificacion"
      kind={notification.type}
      onClose={() => removeNotification(notification)}
      subtitle={notification.message}
      title={notificationTitles[notification.type]}
    />
  );
};

export default ToastNotifies;
