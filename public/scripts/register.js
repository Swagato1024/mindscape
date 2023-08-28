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
  const signupForm = document.querySelector(".login-form");
  const emailSection = signupForm.querySelector("#email");
  const usernameSection = signupForm.querySelector("#username");

  signupForm.onsubmit = (event) => {
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
