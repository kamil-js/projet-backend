const mongoose = require("mongoose");

// connexion à la base de données mongoDb grâce à mongoose

mongoose
  .connect("mongodb+srv://dbUser:Crypto@cluster0.s9ypc.mongodb.net/gamedb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(" connexion vers mongo ok!");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
