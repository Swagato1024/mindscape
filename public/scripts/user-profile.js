const createSignupBtn = () => {
  const signupBtn = document.createElement("a");
  signupBtn.setAttribute("id", "signUpBtn");

  signupBtn.innerText = "Sign up";
  signupBtn.href = "/signup";

  return signupBtn;
};

const createLoginBtn = () => {
  const loginBtn = document.createElement("a");
  loginBtn.setAttribute("id", "loginBtn");

  loginBtn.innerText = "Login";
  loginBtn.href = "/login";

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
  const signupBtn = createSignupBtn();

  profileSection.append(logoutBtn, signupBtn);
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
