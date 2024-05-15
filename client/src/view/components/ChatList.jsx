import React, { useEffect } from "react";
import ChatService from "../../service/ChatService.js";
import { Tile } from "@carbon/react";

const ChatList = ({ chats, setChats, setChat, user }) => {
  useEffect(() => {
    const getChats = async () => {
      const chatsResponse = await ChatService.getUserChats(user.id);
      console.log(chatsResponse);
      setChats(chatsResponse);
    };
    getChats();
  }, [user]);

  return (
    <section className="chat--list">
      {chats.map((chat) => (
        <Tile className="chat" onClick={() => setChat(chat)}>
          <section className="chat-image--section">
            <img src="/avatar.png" alt={chat.name} />
          </section>
          <section className="chat-info--section">
            <h4>{chat.name}</h4>
            <p>{chat.lastMessage.substring(0, 16) + "..."}</p>
            <div className="unread-messages--icon">{chat.unreadMessages}</div>
          </section>
        </Tile>
      ))}
    </section>
  );
};

export default ChatList;
