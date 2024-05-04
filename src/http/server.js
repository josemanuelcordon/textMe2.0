import express from "express";
import cors from "cors";
import router from "./router.js";

console.log("Hola");
const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
