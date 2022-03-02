window.addEventListener("DOMContentLoaded", () => {
  function logout() {
    const logout = document.querySelector("#logout");
    logout.addEventListener("click", () => {
      ioClient.emit("userLeaveGame");
      ioClient.emit("close");
      location.assign("/auth/signout");
    });
  }

  function getRandomInt() {
    const max = 150;
    const button = document.querySelector("button");

    button.addEventListener("click", () => {
      ioClient.emit("addingScore", Math.floor(1 + Math.random() * max));
      button.setAttribute("disabled", true);
    });
  }

  function init() {
    getRandomInt();
    logout();
  }

  init();
});
