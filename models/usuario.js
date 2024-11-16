const mongoose = require("mongoose");
const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    dunique: true,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  list: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Lista",
    },
  ],
});

module.exports = mongoose.model("Usuario", usuarioSchema);
