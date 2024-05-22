import path from "path";
import fs from "fs";
import UserService from "../Service/UserService.js";

const uploadImage = async (req, res) => {
  try {
    res.status(200).json({
      message: "Imagen subida exitosamente",
      imageUrl: `/uploads/profile-${req.body.userId}`,
    });
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
    res.status(404).json({ error: "Imagen de perfil no encontrada" });
  }
};

const getChatImage = async (req, res) => {
  const chatId = req.params.chatId;
  const userId = req.params.userId;

  const uploadsDir = path.join(path.resolve(), "uploads");
  const possibleExtensions = [".jpg", ".png"];
  let foundFile = null;

  const chatParticipants = await UserService.getChatParticipantsExceptMe(
    chatId,
    userId
  );

  if (chatParticipants.length === 1) {
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
  }

  if (foundFile) {
    res.sendFile(foundFile);
  } else {
    res.status(404).json({ error: "Imagen de perfil no encontrada" });
  }
};

export default {
  uploadImage,
  getProfileImage,
  getChatImage,
};
