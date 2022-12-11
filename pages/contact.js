const fullName = document.getElementById("name");
const email = document.getElementById("email");
const form = document.querySelector("form");
const emailError = document.getElementById("emailError");
const nameError = document.getElementById("nameError");
const message = document.getElementById("message");
const textareaError = document.getElementById("textareaError");

form.addEventListener("submit", (e) => {
  let firstCondition, secondCondition, thirdCondition;
  e.preventDefault();
  if (!fullName.value) {
    nameError.innerHTML = "This field cannot be blank";
  } else if (fullName.value.length < 4) {
    nameError.innerHTML = "Name must be longer than 4 characters";
  } else {
    nameError.innerHTML = "";
    firstCondition = true;
  }

  if (!email.value) {
    emailError.innerHTML = "This field cannot be blank";
  } else if (!email.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
    emailError.innerHTML = "Please, provide valid Email";
  } else {
    emailError.innerHTML = "";
    secondCondition = true;
  }
  if (!message.value) {
    textareaError.innerHTML = "This field cannot be blank";
  } else if (message.value.length < 20) {
    textareaError.innerHTML = "Message must be longer than 20 characters";
  } else {
    textareaError.innerHTML = "";
    thirdCondition = true;
  }

  const popUpBox = document.querySelector(".success-popup");
  if (firstCondition && secondCondition && thirdCondition) {
    popUpBox.style.opacity = "1";
    popUpBox.style.zIndex = "10";
  }
  setTimeout(() => {
    popUpBox.style.opacity = "0";
    popUpBox.style.zIndex = "-10";
    e.target.reset();
  }, 2000);
});
