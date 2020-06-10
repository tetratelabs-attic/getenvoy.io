function validation() {
  var email = document.getElementById("email").value;
  var emailReg = /^.+@[^\.].*\.[a-z]{2,}$/;
  if (!email.match(emailReg)) {
    return false;
  } else {
    return true;
  }
}

document.getElementById("emailForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var xhr = new XMLHttpRequest();
  var url = "https://api.hsforms.com/submissions/v3/integration/submit";
  var portalId = "7637559";
  var formId = "41684d1c-e901-436b-9a79-bb6a1885aea1";
  var finalUrl = url + "/" + portalId + "/" + formId;

  let emailValue = document.getElementById("email").value;

  let errorMessage = document.getElementById("errorMessage");

  if (validation()) {
    errorMessage.className = "";

    let data = {
      fields: [
        {
          name: "email",
          value: emailValue,
        },
      ],
    };

    fetch(finalUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((_) => {
      displayMessage();
    });
  } else {
    let formInput = document.getElementById("email");
    formInput.className += "error";

    errorMessage.className += "active";
  }
});

function displayMessage() {
  let emailForm = document.getElementById("emailFormContainer");
  let formMessage = document.getElementById("formMessage");

  emailForm.className += "hidden";
  formMessage.className += "active";
}
