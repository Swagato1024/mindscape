const clearForm = (...fileds) => fileds.forEach((field) => (field.value = ""));

const submitForm = (reqBody) => {
  return fetch("/article", {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "content-type": "application/json",
    },
  });
};

const addSubmitListener = () => {
  const aritcleForm = document.querySelector(".article-form");
  const titleField = aritcleForm.querySelector("#title");
  const domainField = aritcleForm.querySelector("#domain");
  const articleBody = aritcleForm.querySelector("#article-body");

  aritcleForm.onsubmit = (event) => {
    console.log(event);
    event.preventDefault();

    const title = titleField.value;
    const domain = domainField.value;
    const content = articleBody.value;

    clearForm(aritcleForm, titleField, domainField, articleBody);

    submitForm({ title, domain, content })
      .then((res) => {
        location.href = "/";
      })

      .catch((err) => {
        console.log(`error: ${err.message}`);
      });
  };
};

window.onload = addSubmitListener;
