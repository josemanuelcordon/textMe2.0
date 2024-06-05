import path from "path";

const __dirname = path.resolve();

const serveIndex = (req, res) => {
  console.log(path.join(__dirname, "public", "client", "index.html"));
  res.sendFile(path.join(__dirname, "public", "client", "index.html"));
};

export default {
  serveIndex,
};
