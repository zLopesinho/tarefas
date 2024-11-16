const router = require("express").Router();
const User = require("../models/usuario");
const bcrypt = require("bcryptjs");

//Rota para registrar
router.post("/register", async (req, res) => {
  try {
    const { email, username, senha } = req.body;
    const hashsenha = bcrypt.hashSync(senha);
    const user = new User({ email, username, senha: hashsenha });
    if (await User.findOne({ email: email })) {
      res.status(200).json("Usuário já existe");
      return;
    }

    await user.save().then(() => {
      res.status(200).json({ message: "Cadastro Concluido" });
    });
  } catch (error) {
    res.status(200).json({ message: "Usuário Já existe" });
  }
});

//Rota para logar

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const SenhaCorreta = bcrypt.compareSync(req.body.senha, user.senha);

    if (!user) {
      return res
        .status(200)
        .json({ message: "Usuario não encontrado. Faça o cadastro primeiro" });
    }

    if (!SenhaCorreta) {
      res.status(200).json({ message: "Senha incorreta" });
      return;
    }
    const { senha, ...others } = user._doc;
    res.status(200).json({ user: others });
  } catch (error) {
    res.status(200).json({ message: "Usuario não existe" });
  }
});

module.exports = router;
