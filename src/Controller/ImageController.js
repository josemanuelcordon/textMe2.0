import path from "path";
import fs from "fs";
import UserService from "../Service/UserService.js";
import ChatService from "../Service/ChatService.js";

const uploadProfileImage = async (req, res) => {
  try {
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ error: "Error al subir la imagen" });
  }
};

const uploadChatImage = async (req, res) => {
  try {
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ error: "Error al subir la imagen" });
  }
};

const getProfileImage = async (req, res) => {
  const userId = req.params.userId;
  const uploadsDir = path.join(path.resolve(), "uploads");
  const possibleExtensions = [".jpg", ".png"];
  let foundFile = null;

  // Buscar el archivo con cualquiera de las extensiones posibles
  for (const ext of possibleExtensions) {
    const filePath = path.join(uploadsDir, `profile-${userId}${ext}`);
    if (fs.existsSync(filePath)) {
      foundFile = filePath;
      break;
    }
  }

  if (foundFile) {
    res.sendFile(foundFile);
  } else {
    res.sendFile(path.join(path.resolve(), "uploads", "default.png"));
  }
};

const getChatImage = async (req, res) => {
  const chatId = req.params.chatId;
  const userId = req.params.userId;
  console.log("Id del chat", chatId);

  const uploadsDir = path.join(path.resolve(), "uploads");
  const possibleExtensions = [".jpg", ".png"];
  let foundFile = null;

  const chatParticipants = await UserService.getChatParticipantsExceptMe(
    chatId,
    userId
  );

  const isGroupChat = await ChatService.isGroupChat(chatId);
  console.log("Es chat grupal", isGroupChat);
  console.log("Participantes del chat", chatParticipants);

  if (!isGroupChat) {
    for (const ext of possibleExtensions) {
      const filePath = path.join(
        uploadsDir,
        `profile-${chatParticipants[0].id_user}${ext}`
      );
      if (fs.existsSync(filePath)) {
        foundFile = filePath;
        break;
      }
    }
  } else {
    for (const ext of possibleExtensions) {
      const filePath = path.join(uploadsDir, `chat-${chatId}${ext}`);
      if (fs.existsSync(filePath)) {
        foundFile = filePath;
        break;
      }
    }
  }

  if (foundFile) {
    res.sendFile(foundFile);
  } else {
    res.sendFile(path.join(path.resolve(), "uploads", "default.png"));
  }
};

export default {
  uploadProfileImage,
  uploadChatImage,
  getProfileImage,
  getChatImage,
};
