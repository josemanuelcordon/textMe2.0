import React, { useEffect } from "react";
import ChatService from "../../service/ChatService.js";
import { Tile, Tag } from "@carbon/react";

const apiUrl = import.meta.env.VITE_API_URL;

const ChatList = ({
  chats,
  setChats,
  setSortedChats,
  setChat,
  user,
  chat,
  isExpandable,
  setIsSideNavOpen,
  sortedChats,
}) => {
  useEffect(() => {
    const getChats = async () => {
      const chatsResponse = await ChatService.getUserChats(user.id);
      orderChatsByDate(chatsResponse);
      setChats(chatsResponse);
    };
    getChats();
  }, [user]);

  const openChat = (chat) => {
    if (isExpandable) {
      setIsSideNavOpen(false);
    }
    setChat(chat);
  };

  const orderChatsByDate = (chats) => {
    chats.sort((a, b) => {
      return new Date(b.lastMessageDate) - new Date(a.lastMessageDate);
    });
  };

  const filterPrivateChats = () => {
    const chatsCopy = [...chats];
    const privateChats = chatsCopy.filter((chat) => chat.group_chat === null);
    setSortedChats(privateChats);
    console.log(chats);
  };

  const filterGroupChats = () => {
    const chatsCopy = [...chats];
    const groupChats = chatsCopy.filter((chat) => chat.group_chat === 1);
    setSortedChats(groupChats);
  };

  const filterUnreadChats = () => {
    const chatsCopy = [...chats];
    const groupChats = chatsCopy.filter((chat) => chat.unreadMessages > 0);
    setSortedChats(groupChats);
  };

  const resetSortedChats = () => {
    setSortedChats(chats);
  };

  return (
    <nav className="chat--list">
      <section className="tags">
        <Tag size="md" title="Grupo" type="blue" onClick={resetSortedChats}>
          Todos
        </Tag>
        <Tag size="md" title="Grupo" type="red" onClick={filterPrivateChats}>
          Privado
        </Tag>
        <Tag size="md" title="Grupo" type="green" onClick={filterGroupChats}>
          Grupo
        </Tag>
        <Tag size="md" title="Grupo" type="purple" onClick={filterUnreadChats}>
          No leidos
        </Tag>
      </section>
      {sortedChats.length > 0
        ? sortedChats.map((chatToList) => (
            <>
              <Tile
                tabIndex="0"
                className={
                  "chat" + (chatToList.id === chat?.id ? " selected" : "")
                }
                onClick={() => openChat(chatToList)}
              >
                <section className="chat-image--section">
                  <img
                    style={{ width: "64px", height: "64px" }}
                    src={`${apiUrl}/chat-image/${chatToList.id}/${user.id}`}
                  />
                </section>
                <section className="chat-info--section">
                  <h4>{chatToList.name}</h4>
                  <p>{chatToList.lastMessage && chatToList.lastMessage}</p>
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
              <div className="divider">
                <span></span>
              </div>
            </>
          ))
        : chats.map((chatToList) => (
            <>
              <Tile
                tabIndex="0"
                className={
                  "chat" + (chatToList.id === chat?.id ? " selected" : "")
                }
                onClick={() => openChat(chatToList)}
              >
                <section className="chat-image--section">
                  <img
                    style={{ width: "64px", height: "64px" }}
                    src={`${apiUrl}/chat-image/${chatToList.id}/${user.id}`}
                  />
                </section>
                <section className="chat-info--section">
                  <h4>{chatToList.name}</h4>
                  <p>{chatToList.lastMessage && chatToList.lastMessage}</p>
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
              <div className="divider">
                <span></span>
              </div>
            </>
          ))}
    </nav>
  );
};

export default ChatList;
