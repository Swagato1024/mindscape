const submitForm = (reqBody) => {
  return fetch("/login", {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "content-type": "application/json",
    },
  });
};

const handleInvalidLogin = (res, usernameField, passwordField) => {
  const { isValidUser, isCorrectPassword } = res;

  if (!isValidUser) {
    usernameField.placeholder = "Invalid username";
    return;
  }

  if (!isCorrectPassword) {
    passwordField.placeholder = "Invalid password";
  }
};

const addSubmitListener = () => {
  const loginForm = document.querySelector(".login-form");
  const usernameSection = loginForm.querySelector("#username");
  const passwordField = loginForm.querySelector("#password");

  loginForm.onsubmit = (event) => {
    console.log(event);

    event.preventDefault();

    const username = usernameSection.value;
    const password = passwordField.value;

    usernameSection.value = "";
    passwordField.value = "";

    submitForm({  username, password })
      .then((res) => res.json())
      .then((body) => {
        const { isCorrectPassword, isValidUser } = body;
        if (!isValidUser) {
          alert("not valid user name");
          return;
        }

        if (!isCorrectPassword) {
          alert("not correct password");
          return;
        }

        location.href = "/";
      })
      .catch((err) => {
        console.log(`error: ${err.message}`);
      });
  };
};

window.onload = addSubmitListener;
