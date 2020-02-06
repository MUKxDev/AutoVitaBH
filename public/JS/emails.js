//firestore database ref
var db = firebase.database();

//emails doc ref
var emailsRef = db.ref("emails");

// code
("use strict");

//grab a form
const form = document.querySelector("#contact-form");

//grab an input
const name = form.querySelector("#name");
const mailFrom = form.querySelector("#mail");
const subject = form.querySelector("#subject");
const message = form.querySelector("#message");

//create a functions to push
function submitMail() {
  if (
    name.value == "" ||
    mailFrom.value == "" ||
    subject.value == "" ||
    message.value == ""
  ) {
    alert("Please fill all the fields");
  } else {
    emailsRef.push().set({
      name: name.value,
      mailFrom: mailFrom.value,
      subject: subject.value,
      message: message.value
    });
  }
}

//push on form submit
if (form) {
  form.addEventListener("submit", function(evt) {
    evt.preventDefault();
    submitMail();

    //shows alert if everything went well.
    return alert("Mail sent, Thank you.");
  });
}
