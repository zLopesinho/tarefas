const router = require("express").Router();
const User = require("../models/usuario");
const Lista = require("../models/lista");

//Criaçao do CRUD

//Criar Tarefa
router.post("/adicionar", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const usuario = await User.findById(id);
    if (usuario) {
      const lista = new Lista({ title, body, user: usuario });
      await lista.save().then(() => res.status(200).json({ lista }));
      usuario.list.push(lista);
      usuario.save();
      console.log(lista);
    }
  } catch (error) {
    console.log(error);
  }
});

//Update
router.put("/atualizar/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const { titulo, descricao } = req.body;
    const title = titulo;
    const body = descricao;
    console.log(titulo);
    console.log(descricao);
    const list = await Lista.findByIdAndUpdate(
      req.params.id,
      {
        title,
        body,
      },
      { new: true }
    );
    res.status(200).json({ message: "Tarefa Atualizada", list });
    console.log("Atualizado com sucesso:", list);
  } catch (error) {
    console.log(error);
  }
});

//Deletar
router.delete("/deletar/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const usuario = await User.findByIdAndUpdate(id, {
      $pull: { list: req.params.id },
    });
    if (usuario) {
      await Lista.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({ message: "Tarefa Deletada" })
      );
    }
  } catch (error) {
    console.log(error);
  }
});

//Visualizar Tarefas
router.get("/Tarefas/:id", async (req, res) => {
  try {
    const lista = await Lista.find({ user: req.params.id }).sort({
      createdAt: -1,
    });

    if (lista.length !== 0) {
      res.status(200).json({ lista: lista });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
