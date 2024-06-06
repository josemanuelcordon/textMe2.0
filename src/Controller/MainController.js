import path from "path";

const __dirname = path.resolve();

const serveIndex = (req, res) => {
  res.sendFile(path.join(__dirname, "public", "client", "index.html"));
};

export default {
  serveIndex,
};
