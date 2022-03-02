window.addEventListener("DOMContentLoaded", () => {
  // fonction pour se deconnecter
  function logout() {
    const logout = document.querySelector("#logout");
    logout.addEventListener("click", () => {
      ioClient.emit("userLeaveGame");
      ioClient.emit("close");
      location.assign("/auth/signout");
    });
  }
  // fonction pour le jeu afin de générer un nombre aléatoire ainsi que disparition du bouton après y avoir cliqué
  function getRandomInt() {
    const max = 150;
    const button = document.querySelector("button");

    button.addEventListener("click", () => {
      ioClient.emit("addingScore", Math.floor(1 + Math.random() * max));
      button.setAttribute("disabled", true);
    });
  }

  // fonction init pour exécuter les 2 fonctions ci-dessus

  function init() {
    getRandomInt();
    logout();
  }

  init();
});
