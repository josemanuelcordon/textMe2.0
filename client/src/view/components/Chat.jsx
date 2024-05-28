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
      console.log(messagesResponse);
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
          <>
            <li
              className={`message-container ${
                message.sender === user.id ? "sent" : ""
              }`}
              key={index}
            >
              <img
                style={{ width: "42px", height: "42px", borderRadius: "50%" }}
                src={`http://localhost:3000/profile-image/${message.sender}`}
              />
              <p
                className={` ${
                  message.sender === user.id
                    ? "message-sent"
                    : "message-received"
                } message`}
              >
                {message.content}
              </p>
            </li>
          </>
        ))}
      </ul>
      <section className="messages-inputs--container">
        <TextArea
          value={message.content || ""}
          onChange={fillMessage}
        ></TextArea>
        <Button
          onClick={sendMessage}
          className="send-button"
          renderIcon={SendFilled}
          iconDescription="Enviar"
          hasIconOnly
        ></Button>
      </section>
    </>
  );
};

export default Chat;
