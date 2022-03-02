const { User } = require("../database/models");

exports.createUser = async (body) => {
  try {
    const hashedPassword = await User.hashPassword(body.password);
    const user = new User({
      local: {
        username: body.username,
        password: hashedPassword,
      },
    });
    return user.save();
  } catch (e) {
    throw e;
  }
};

exports.findUserPerUsername = (username) => {
  return User.findOne({ "local.username": username }).exec();
};

exports.findUserPerId = (id) => {
  return User.findOne({ _id: id }).exec();
};
