import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [message, setMessage] = useState({});
  const [messages, setMessages] = useState<Array<string>>([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Conectarse al servidor WebSocket
    const newSocket = io("ws://localhost:3000");

    // Escuchar eventos del servidor
    newSocket.on("connect", () => {
      console.log("Conectado al servidor WebSocket");
    });

    newSocket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Guardar el socket en el estado
    setSocket(newSocket);

    // Desconectar el socket cuando el componente se desmonta
    return () => {
      newSocket.disconnect();
    };
  }, []); // Ejecuta este efecto solo una vez al montar el componente

  const fillMessage = (e) => {
    setMessage({ ...message, content: e.target.value });
  };

  const sendMessage = () => {
    if (socket) {
      socket.emit("sendMessage", message.content);
    }
  };

  return (
    <>
      <ul>
        {messages.map((message) => (
          <li>{message}</li>
        ))}
      </ul>
      <textarea onChange={fillMessage}></textarea>
      <button onClick={sendMessage}>Enviar</button>
    </>
  );
};

export default App;
