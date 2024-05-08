import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import messageService from "../../service/messageService";
import { useAuth } from "../context/AuthContext";

const Chat = () => {
  const [message, setMessage] = useState({});
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();

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
    const messageToSend = {
      content: message.content,
      sender: user.id,
      date: new Date(),
    };
    messageService.sendMessage(messageToSend);
    if (socket) {
      socket.emit("sendMessage", messageToSend.content);
    }
    // Vaciar el texto del textarea después de enviar el mensaje
    setMessage({ ...message, content: "" });
  };

  return (
    <>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <textarea value={message.content || ""} onChange={fillMessage}></textarea>
      <button onClick={sendMessage}>Enviar</button>
    </>
  );
};

export default Chat;
