import React, { useEffect, useState } from "react";
import messageService from "../../service/messageService";
import { Button, TextArea } from "@carbon/react";
import { SendFilled } from "@carbon/icons-react";

const Chat = ({ user, chat, socket, chats, setChats }) => {
  const [message, setMessage] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      const messagesResponse = await messageService.getChatMessages(chat.id);
      setMessages(messagesResponse);
    };

    getMessages();

    //TODO: Esto va a cambiar
    socket.on("message", (message) => {
      if (message.chat === chat.id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
      // Buscar el chat en el array chats con el mismo ID que message.chat
      const chatIndex = chats.findIndex((chat) => chat.id === message.chat);
      // Si se encuentra el chat en el array
      if (chatIndex !== -1) {
        // Obtener el chat y eliminarlo del array
        const chat = chats.splice(chatIndex, 1)[0];
        // Insertar el chat al principio del array
        const chatCopy = chats;
        chatCopy.unshift(chat);
        console.log(chatCopy);
        setChats([...chatCopy]);
        console.log(`Chat with ID ${chat.id} moved to the top of the list`);
      } else {
        console.log(`Chat with ID ${message.chat} not found`);
      }
    });

    return () => {
      socket.off("message");
    };
  }, [socket, chat]);

  const fillMessage = (e) => {
    setMessage({ ...message, content: e.target.value });
  };

  const sendMessage = () => {
    const messageToSend = {
      content: message.content,
      sender: user.id,
      date: new Date(),
      chat: chat.id,
    };

    messageService.sendMessage(messageToSend);
    if (socket) {
      socket.emit("sendMessage", messageToSend);
    }
    // Vaciar el texto del textarea después de enviar el mensaje
    setMessage({ ...message, content: "" });
  };

  return (
    <>
      <ul className="messages--container">
        {messages.map((message, index) => (
          <li
            className={`${
              message.sender === user.id ? "message-sent" : "message-received"
            } message`}
            key={index}
          >
            {message.content}
          </li>
        ))}
      </ul>
      <section className="messages-inputs--container">
        <TextArea
          value={message.content || ""}
          onChange={fillMessage}
        ></TextArea>
        <Button
          onClick={sendMessage}
          renderIcon={SendFilled}
          hasIconOnly
        ></Button>
      </section>
    </>
  );
};

export default Chat;
