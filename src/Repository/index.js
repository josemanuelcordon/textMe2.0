import ChatSqlRepository from "./sql/ChatSqlRepository.js";
import MessageSqlRepository from "./sql/MessageSqlRepository.js";
import UserSqlRepository from "./sql/UserSqlRepository.js";

const ChatRepository = ChatSqlRepository;
const MessageRepository = MessageSqlRepository;
const UserRepository = UserSqlRepository;

export { ChatRepository, MessageRepository, UserRepository };
