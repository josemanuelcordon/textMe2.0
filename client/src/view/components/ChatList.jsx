import React, { useEffect } from "react";
import ChatService from "../../service/ChatService.js";
import { Tile, Tag } from "@carbon/react";

const ChatList = ({ chats, setChats, setChat, user, chat, sortedChats }) => {
  useEffect(() => {
    const getChats = async () => {
      const chatsResponse = await ChatService.getUserChats(user.id);
      setChats(chatsResponse);
    };
    getChats();
  }, [user]);

  const openChat = (chat) => {
    setChat(chat);
  };

  return (
    <section className="chat--list">
      {sortedChats.length > 0
        ? sortedChats.map((chatToList) => (
            <Tile
              className={
                "chat" + (chatToList.id === chat?.id ? " selected" : "")
              }
              onClick={() => openChat(chatToList)}
            >
              <section className="chat-image--section">
                <img
                  style={{ width: "64px" }}
                  src={`http://localhost:3000/chat-image/${chatToList.id}/${user.id}`}
                />
              </section>
              <section className="chat-info--section">
                <h4>{chatToList.name}</h4>
                <p>{chatToList.lastMessage?.substring(0, 16) + "..." ?? ""}</p>
                <div className="unread-messages--icon">
                  {chatToList.unreadMessages}
                </div>
                {chatToList.group_chat && (
                  <Tag className="group-tag" type="green">
                    Grupo
                  </Tag>
                )}
              </section>
            </Tile>
          ))
        : chats.map((chatToList) => (
            <Tile
              className={
                "chat" + (chatToList.id === chat?.id ? " selected" : "")
              }
              onClick={() => openChat(chatToList)}
            >
              <section className="chat-image--section">
                <img
                  style={{ width: "64px" }}
                  src={`http://localhost:3000/chat-image/${chatToList.id}/${user.id}`}
                />
              </section>
              <section className="chat-info--section">
                <h4>{chatToList.name}</h4>
                <p>{chatToList.lastMessage?.substring(0, 16) + "..." ?? ""}</p>
                <div className="unread-messages--icon">
                  {chatToList.unreadMessages}
                </div>
                {chatToList.group_chat && (
                  <Tag className="group-tag" type="green">
                    Grupo
                  </Tag>
                )}
              </section>
            </Tile>
          ))}
    </section>
  );
};

export default ChatList;
