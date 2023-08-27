const createLoginBtn = () => {
  const loginBtn = document.createElement("input");
  loginBtn.setAttribute("type", "button");
  loginBtn.setAttribute("id", "loginBtn");

  loginBtn.value = "Login";
  loginBtn.onclick = () => {
    location.pathname = "/pages/login-form.html";
  };

  return loginBtn;
};

const createLogoutBtn = () => {
  const logoutBtn = document.createElement("input");
  logoutBtn.value = "Logout";
  logoutBtn.setAttribute("type", "button");
  logoutBtn.setAttribute("id", "logoutBtn");

  logoutBtn.onclick = () => {
    fetch("/logout", {
      method: "post",
    }).then((res) => (location.href = res.url));
  };

  return logoutBtn;
};

const createUserElement = (username) => {
  const userElement = document.createElement("div");
  userElement.setAttribute("id", "username");
  userElement.innerText = username;
  return userElement;
};

const renderForLoggedInUser = (username) => {
  const profileSection = document.querySelector("#profile");

  const userContainer = createUserElement(username);
  const logoutBtn = createLogoutBtn();
  profileSection.append(userContainer, logoutBtn);
};

const renderForNotLoggedInUser = () => {
  const profileSection = document.querySelector("#profile");
  profileSection.innerHTML = "";

  const logoutBtn = createLoginBtn();
  profileSection.append(logoutBtn);
};

const renderProfile = (userProfile) => {
  const { loggedIn, username } = userProfile;
  if (loggedIn) {
    renderForLoggedInUser(username);
    return;
  }

  renderForNotLoggedInUser();
};

const fetchAndRenderProfile = () => {
  fetch("/user-profile")
    .then((req) => req.json())
    .then((userProfile) => renderProfile(userProfile));
};

window.onload = fetchAndRenderProfile;
