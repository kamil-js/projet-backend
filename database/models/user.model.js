const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema;

// définition d'un schema à l'aide de mongoose

const userSchema = schema({
  local: {
    username: { type: String, required: true, unique: true },
    password: { type: String },
  },
});

// Hashage du password (10 fois)

userSchema.statics.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } catch (e) {
    throw e;
  }
};

// comparaison des mots de passe

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.local.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
