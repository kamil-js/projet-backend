const secret = "2f523a01-2782-4342-b965-28d75b43e01a";
const jwt = require("jsonwebtoken");
const { findUserPerId } = require("../queries/user.queries");
const { app } = require("../app");

// Création de token

const createJwtToken = ({ user = null, id = null }) => {
  const jwtToken = jwt.sign(
    {
      sub: id || user._id.toString(),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    secret
  );
  return jwtToken;
};

exports.createJwtToken = createJwtToken;

// Vérification de l'expiration du token

const checkExpirationToken = (token, res) => {
  const tokenExp = token.exp;
  const nowInSec = Math.floor(Date.now() / 1000);
  if (nowInSec <= tokenExp) {
    return token;
  } else if (nowInSec > tokenExp && nowInSec - tokenExp < 60 * 60 * 24) {
    const refreshedToken = createJwtToken({ id: token.sub });
    res.cookie("jwt", refreshedToken);
    return jwt.verify(refreshedToken, secret);
  } else {
    throw new Error("token expired");
  }
};

// décodage du token

const decodeJwtToken = (token) => {
  return jwt.verify(token, secret);
};

exports.decodeJwtToken = decodeJwtToken;

// Extraction de l'utilisateur à partir du token

const extractUserFromToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      let decodedToken = jwt.verify(token, secret, { ignoreExpiration: true });
      decodedToken = checkExpirationToken(decodedToken, res);
      const user = await findUserPerId(decodedToken.sub);
      if (user) {
        req.user = user;
        next();
      } else {
        res.clearCookie("jwt");
        res.redirect("/");
      }
    } catch (e) {
      res.clearCookie("jwt");
      res.redirect("/");
    }
  } else {
    next();
  }
};

// ajout de fonctionnalités au token

const addJwtFeatures = (req, res, next) => {
  req.isAuthenticated = () => !!req.user;
  req.logout = () => res.clearCookie("jwt");
  req.login = (user) => {
    const token = createJwtToken({ user });
    res.cookie("jwt", token);
  };
  next();
};

app.use(extractUserFromToken);
app.use(addJwtFeatures);
