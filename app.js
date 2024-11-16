const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const auth = require("./routes/auth");
const lista = require("./routes/lista");
require("./config/db");

//localhost:1000

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.use("/", auth);
app.use("/", lista);

app.listen(1000, () => {
  console.log("Servidor Rodando");
});
