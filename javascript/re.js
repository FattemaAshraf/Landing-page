let form = document.getElementById("registration-form");

let firstname = document.getElementById("firstName");
let lastname = document.getElementById("lastName");
let email_Up = document.getElementById("email");
let phone = document.getElementById("phone");
let password = document.getElementById("password");

let arr1 = JSON.parse(localStorage.getItem("userData")) || [];
// store data in localstorage
function local() {
  if (
    firstname.value.length <= 0 ||
    lastname.value.length <= 0 ||
    email_Up.value.length <= 0 ||
    phone.value.length <= 0 ||
    password.value.length <= 0
  ) {
    alert("Need to Fill Registration");
  } else {
    let emailExists = false;
    for (let i = 0; i < arr1.length; i++) {
      if (email_Up.value == arr1[i].email) {
        emailExists = true;
        break;
      }
    }
    if (emailExists) {
      alert(
        `This email is already registered. Please enter a different email.`
      );
    } else {
      let obj = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email_Up.value,
        phone: phone.value,
        password: password.value,
        products: [],
        fav: [],
      };
      arr1.push(obj);
      localStorage.setItem("userData", JSON.stringify(arr1));
    }
  }
}
////////////////////////////////////////////////////////////////////
let array_signin = [];
function signIn(e) {
  let email_In = document.getElementById("signInEmail").value;
  let password = document.getElementById("signInPassword").value;
  let userData = JSON.parse(localStorage.getItem("userData")) || [];
  // loop through the array of userData
  var found = false;
  for (let i = 0; i < userData.length; i++) {
    if (userData[i].email == email_In && userData[i].password == password) {
      // if there's a match, log the user in
      array_signin.push(email_In);
      localStorage.setItem("SignIn", JSON.stringify(array_signin));
      found = true;
      return;
    }
  }
  if (!found) {
    e.preventDefault();
  }
}
