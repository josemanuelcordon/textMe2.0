import React, { useEffect, useState } from "react";
import ChatService from "../../service/ChatService";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Layer, Tile } from "@carbon/react";

import { ArrowLeft } from "@carbon/icons-react";

const AdminChats = () => {
  const [chats, setChats] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getUserChats = async () => {
      const chats = await ChatService.getUserChats(userId);
      setChats(chats);
    };
    getUserChats();
  }, []);

  return (
    <main className="page--template">
      <section className="user--list">
        <h1>Conversaciones del usuario con Id {userId}</h1>
        {chats.map((chat) => {
          return (
            <Layer key={chat.id} level={2}>
              <Tile>
                <h2>{chat.name}</h2>
                <h4>Participantes:</h4>
                <ul>
                  {chat.participants.map((participant) => (
                    <li>{participant.username}</li>
                  ))}
                </ul>
                <Button
                  kind="primary"
                  onClick={() => navigate(`/admin/chat/${chat.id}/messages`)}
                >
                  Ver mensajes
                </Button>
              </Tile>
            </Layer>
          );
        })}
      </section>
      <span className="back--icon">
        <ArrowLeft onClick={() => navigate("/admin")} />
      </span>
    </main>
  );
};

export default AdminChats;
