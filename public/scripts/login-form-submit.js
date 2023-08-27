const submitForm = (reqBody) => {
  return fetch("/login", {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "content-type": "application/json",
    },
  });
};

const addSubmitListener = () => {
  const loginForm = document.querySelector(".login-form");
  const emailSection = loginForm.querySelector("#email");
  const usernameSection = loginForm.querySelector("#username");

  loginForm.onsubmit = (event) => {
    console.log(event);

    event.preventDefault();

    const emailId = emailSection.value;
    const username = usernameSection.value;

    emailSection.value = "";
    username.value = "";

    submitForm({ emailId, username })
      .then((res) => {
        if (res.redirected) {
          location.href = res.url;
        }
      })

      .catch((err) => {
        console.log(`error: ${err.message}`);
      });
  };
};

window.onload = addSubmitListener;
