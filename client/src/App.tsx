import React, { useEffect } from "react";
import { io } from "socket.io-client";

const App = () => {
  useEffect(() => {
    // Conectarse al servidor WebSocket
    const socket = io("ws://localhost:3000");

    // Escuchar eventos del servidor
    socket.on("connect", () => {
      console.log("Conectado al servidor WebSocket");
    });

    socket.on("message", (data) => {
      console.log("Mensaje del servidor:", data);
    });

    // Desconectar el socket cuando el componente se desmonta
    return () => {
      socket.disconnect();
    };
  }, []); // Ejecuta este efecto solo una vez al montar el componente

  return <div>HOLAAAAA</div>;
};

export default App;
