import React, { useEffect, useState, useRef } from "react";
import messageService from "../../service/messageService";
import {
  Button,
  Form,
  IconButton,
  Layer,
  TextArea,
  Tile,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
  Tooltip,
} from "@carbon/react";
import { SendFilled, Information } from "@carbon/icons-react";

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
  const messagesEndRef = useRef(null);

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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const fillMessage = (e) => {
    setMessage({ ...message, content: e.target.value });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.content || message.content.trim() === "") return;

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  return (
    <>
      <Layer level={2}>
        <Tile className="chat--header">
          <img
            className="chat--image"
            src={`http://localhost:3000/chat-image/${chat.id}/${user.id}`}
          />
          <h2>{chat.name}</h2>
          {chat.group_chat && (
            <Toggletip align="bottom">
              <ToggletipButton label="Show information">
                <Information />
              </ToggletipButton>
              <ToggletipContent>
                <p>
                  {chat.participants.map((user) => (
                    <p>{user.username}</p>
                  ))}
                </p>
              </ToggletipContent>
            </Toggletip>
          )}
        </Tile>
      </Layer>
      <ul className="messages--container">
        {messages.map((message, index) => (
          <li
            className={`message-container ${
              message.sender === user.id ? "sent" : ""
            }`}
            key={index}
          >
            <Toggletip align={message.sender === user.id ? "left" : "right"}>
              <ToggletipButton label="Show information">
                <img
                  src={`http://localhost:3000/profile-image/${message.sender}`}
                />
              </ToggletipButton>
              <ToggletipContent>
                <p>{message.user?.username}</p>
              </ToggletipContent>
            </Toggletip>

            <p
              className={`${
                message.sender === user.id ? "message-sent" : "message-received"
              } message`}
            >
              {message.content}
            </p>
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
      <Form onSubmit={sendMessage} className="messages-inputs--container">
        <TextArea
          value={message.content || ""}
          onChange={fillMessage}
          onKeyDown={handleKeyPress}
        ></TextArea>
        <button type="submit" className="send-button">
          <SendFilled />
        </button>
      </Form>
    </>
  );
};

export default Chat;
