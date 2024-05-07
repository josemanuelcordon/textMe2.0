import MessageService from "../Service/MessageService.js";

const saveMessage = async (req, res) => {
  const { sender, content, date } = req.body;

  const messageCreated = await MessageService.saveMessage(
    sender,
    content,
    date
  );
  res.status(200).json({ created: true });
};

export default {
  saveMessage,
};
