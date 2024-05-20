import React, { useEffect, useState } from "react";
import messageService from "../../service/messageService";
import { Button, TextArea } from "@carbon/react";
import { SendFilled } from "@carbon/icons-react";

const Chat = ({
  user,
  chat,
  socket,
  chats,
  setChats,
  messages,
  setMessages,
}) => {
  const [message, setMessage] = useState({});

  useEffect(() => {
    const getMessages = async () => {
      const messagesResponse = await messageService.getChatMessages(
        chat.id,
        user.id
      );
      setMessages(messagesResponse);
    };

    getMessages();
    socket.emit("readMessages", { chat: chat.id, user: user.id });

    const chatsRead = chats.map((ch) => {
      if (ch.id === chat.id) {
        return {
          ...ch,
          unreadMessages: 0,
        };
      }
      return ch;
    });

    setChats(chatsRead);
  }, [chat]);

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
