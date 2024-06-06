import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import messageService from "../../service/messageService";

import { ArrowLeft } from "@carbon/icons-react";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const { chatId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getChatMessages = async () => {
      const messages = await messageService.getChatMessages(chatId);
      setMessages(messages);
    };

    getChatMessages();
  }, []);

  return (
    <main className="page--template">
      <section className="user--list">
        <h1>Mensajes de la conversación con id</h1>
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              [{message.user.username}] : {message.content}
            </li>
          ))}
        </ul>
      </section>
      <span className="back--icon">
        <ArrowLeft onClick={() => navigate(-1)} />
      </span>
    </main>
  );
};

export default AdminMessages;
