const submitForm = (reqBody) => {
  return fetch("/signup", {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "content-type": "application/json",
    },
  });
};

const addSubmitListener = () => {
  const signupForm = document.querySelector(".signup-form");
  const emailSection = signupForm.querySelector("#email");
  const usernameSection = signupForm.querySelector("#name");
  const passwordField = signupForm.querySelector("#password");

  signupForm.onsubmit = (event) => {
    console.log(event);

    event.preventDefault();

    const emailId = emailSection.value;
    const username = usernameSection.value;
    const password = passwordField.value;

    emailSection.value = "";
    usernameSection.value = "";
    passwordField.value = "";

    submitForm({ emailId, username, password })
      .then((res) => {
        if (res.ok) {
          location.href = "/";
        }
      })

      .catch((err) => {
        console.log(`error: ${err.message}`);
      });
  };
};

window.onload = addSubmitListener;
