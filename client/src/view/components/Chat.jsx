import React, { useEffect, useState, useRef } from "react";
import messageService from "../../service/messageService";
import {
  Form,
  IconButton,
  Layer,
  OverflowMenu,
  OverflowMenuItem,
  TextArea,
  Tile,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from "@carbon/react";
import { SendFilled, Information, QX } from "@carbon/icons-react";
import { useNotifications } from "../context/NotificationContext";
import { Notification } from "../../domain/Notification";

const apiUrl = import.meta.env.VITE_API_URL;

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
  const [editText, setEditText] = useState(null);
  const messagesEndRef = useRef(null);
  const { addNotification } = useNotifications();

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
    const handleDeleteMessage = (messageId) => {
      setMessages((prev) => prev.filter((m) => m.id !== messageId));
    };

    const handleUpdateMessage = (message) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === message.id ? { ...msg, ...message } : msg
        )
      );
    };

    socket.on("deleteMessage", handleDeleteMessage);
    socket.on("updateMessage", handleUpdateMessage);

    return () => {
      socket.off("deleteMessage", handleDeleteMessage);
      socket.off("updateMessage", handleUpdateMessage);
    };
  }, [chat]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const fillMessage = (e) => {
    setMessage({ ...message, content: e.target.value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.content || message.content.trim() === "") return;

    const messageToSend = {
      content: message.content,
      sender: user.id,
      date: new Date(),
      chat: chat.id,
    };

    const messageCreated = await messageService.sendMessage(messageToSend);
    if (socket) {
      socket.emit("sendMessage", messageCreated);
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

  const onEditMessage = (messageToEdit) => {
    setEditText({ ...messageToEdit });
  };

  const updateMessage = async (e) => {
    e.preventDefault();
    await messageService.updateMessage(editText.id, editText.content);
    socket.emit("updateMessage", editText);
    setEditText(null);

    addNotification(new Notification("Mensaje actualizado", "success"));
  };

  const cancelEdit = () => {
    setEditText(null);
  };

  const updateMessageContent = (e) => {
    setEditText({ ...editText, content: e.target.value });
  };

  const deleteMessage = async (message) => {
    await messageService.deleteMessage(message.id);
    socket.emit("deleteMessage", message);
    addNotification(new Notification("Mensaje borrado", "success"));
  };

  return (
    <>
      <Layer level={2}>
        <Tile className="chat--header">
          <img
            className="chat--image"
            src={`${apiUrl}/chat-image/${chat.id}/${user.id}`}
          />
          <h2>{chat.name}</h2>
          {chat.group_chat && (
            <Toggletip align="bottom">
              <ToggletipButton label="Show information">
                <Information />
              </ToggletipButton>
              <ToggletipContent>
                {chat.participants.map((user, index) => (
                  <p key={index}>{user.username}</p>
                ))}
                <br />
              </ToggletipContent>
            </Toggletip>
          )}
        </Tile>
      </Layer>
      <ul className="messages--container">
        {messages.map((messageToList, index) => (
          <li
            className={`message-container ${
              messageToList.sender === user.id ? "sent" : ""
            }`}
            key={index}
          >
            <Toggletip
              align={messageToList.sender === user.id ? "left" : "right"}
            >
              <ToggletipButton label="Show information">
                <img src={`${apiUrl}/profile-image/${messageToList.sender}`} />
              </ToggletipButton>
              <ToggletipContent>
                <p>{messageToList.user?.username ?? user.username}</p>
              </ToggletipContent>
            </Toggletip>
            {messageToList.sender === user.id && (
              <OverflowMenu
                iconDescription=""
                size="sm"
                menuOffset={{ left: -60 }}
              >
                <OverflowMenuItem
                  onClick={() => onEditMessage(messageToList)}
                  itemText="Editar mensaje"
                ></OverflowMenuItem>
                <OverflowMenuItem
                  onClick={() => deleteMessage(messageToList)}
                  itemText="Eliminar mensaje"
                  isDelete
                ></OverflowMenuItem>
              </OverflowMenu>
            )}
            <p
              className={`${
                messageToList.sender === user.id
                  ? "message-sent"
                  : "message-received"
              } message`}
            >
              {messageToList.content}
            </p>
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
      <Form
        onSubmit={editText ? updateMessage : sendMessage}
        className="messages-inputs--container"
      >
        <TextArea
          labelText={editText ? "Editando" : ""}
          value={editText ? editText.content : message.content || ""}
          onChange={editText ? updateMessageContent : fillMessage}
          onKeyDown={handleKeyPress}
        ></TextArea>
        <button type="submit" className="send-button">
          <SendFilled />
        </button>
        {editText && (
          <button type="button" onClick={cancelEdit} className="cancel-button">
            <QX />
          </button>
        )}
      </Form>
    </>
  );
};

export default Chat;
