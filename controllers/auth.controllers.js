const { findUserPerUsername } = require("../queries/user.queries");

// Gestion des templates pour l'inscription des utilisateurs

exports.signinForm = (req, res, next) => {
  res.render("signin", { error: null });
};

exports.signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username && !password) {
      res.render("signin", { error: "Require champ" });
      return;
    }
    const user = await findUserPerUsername(username);
    if (user) {
      const match = await user.comparePassword(password);
      if (match) {
        req.login(user);
        res.redirect("/");
      } else {
        res.render("signin", { error: "Le mot de passe ne correspond pas" });
      }
    } else {
      res.render("signin", { error: "Utilisateur non trouvé" });
    }
  } catch (error) {
    next(error);
  }
};

// Export d'une fonction à utiliser en dehors du fichier

exports.signout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
