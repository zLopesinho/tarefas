const mongoose = require("mongoose");
const db = async (req, res) => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://lopezguilherme:30EvhyxEqU3Tkeb6@projeto3.gt8fq.mongodb.net/"
      )
      .then(() => {
        console.log("Banco conectado");
      });
  } catch (error) {
    console.log(error);
  }
};

db();
