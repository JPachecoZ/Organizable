// Helpers
import DOMHandler from "../dom-handler.js";

// Services
import { signup } from "../services/session-service.js";

// Views

import LoginPage from "./login-page.js"

// Draws page
function render() {
  const { signupError } = SignupPage.state

  return `
  <section class="section-full bg-gray-100">
    <div class="container flex flex-column gap-8 items-center">
      <img src="../assets/images/logo.png" alt="rankable logo" />
      <h1 class="heading">Create Account</h1>
      <form action="" class="full-width container-sm flex flex-column gap-4 signup-form">
        <div class="input">
          <label for="username" class="content-xs overline">Username</label>
          <div class="input__container">
            <img
              src="../assets/icons/user.svg"
              alt="user-icon"
              class="input__icon"
            />
            <input
              type="text"
              placeholder="placeholder"
              class="input__content"
              id="username"
              name="username"
              required
            />
          </div>
          ${signupError ? `<span class="input__error-message"><p> ${signupError}</span>` : ""} 
        </div>
        <div class="input">
          <label for="email" class="content-xs overline">Email</label>
          <div class="input__container">
            <img
              src="../assets/icons/mail.svg"
              alt="mail-icon"
              class="input__icon"
            />
            <input
              type="text"
              placeholder="username@mail.com"
              class="input__content"
              id="email"
              name="email"
              required
            />
          </div>
          ${signupError ? `<span class="input__error-message"><p> ${signupError}</span>` : ""} 
        </div>
        <div class="input">
          <label for="first_name" class="content-xs overline"
            >First name</label
          >
          <div class="input__container">
            <img
              src="../assets/icons/data.svg"
              alt="firstname-icon"
              class="input__icon"
            />
            <input
              type="text"
              placeholder="John"
              class="input__content"
              id="first_name"
              name="first_name"
              required
            />
          </div>
          ${signupError ? `<span class="input__error-message"><p> ${signupError}</span>` : ""} 
        </div>
        <div class="input">
          <label for="last_name" class="content-xs overline">Last name</label>
          <div class="input__container">
            <img
              src="../assets/icons/data.svg"
              alt="lastname-icon"
              class="input__icon"
            />
            <input
              type="text"
              placeholder="Doe"
              class="input__content"
              id="last_name"
              name="last_name"
              required
            />
          </div>
          ${signupError ? `<span class="input__error-message"><p> ${signupError}</span>` : ""} 
        </div>
        <div class="input">
          <label for="password" class="content-xs overline">Password</label>
          <div class="input__container">
            <img
              src="../assets/icons/key.svg"
              alt="user-icon"
              class="input__icon"
            />
            <input
              type="password"
              placeholder="******"
              class="input__content"
              id="password"
              name="password"
              required
            />
          </div>
          ${signupError ? `<span class="input__error-message"><p> ${signupError}</span>` : ""} 
        </div>
        <button type="submit" class="button button--secondary width-full">
          Create Account
        </button>
      </form>
      <a href="#" class="to-login">Login</a>
    </div>
  </section>
  `
}

// Creates functions for page listeners
function listenSignup() {
  const loginForm = document.querySelector(".signup-form");

  loginForm.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { username, email, first_name, last_name, password } = event.target;

      const data = {
        username: username.value,
        email: email.value,
        first_name: first_name.value,
        last_name: last_name.value,
        password: password.value,
      };

      const user = await signup(data);
      alert("Se creo " + user.id);
      

    } catch (error) {
      SignupPage.state.signupError = error.message;
      DOMHandler.reload();
    }
  })
}

function listenToLogin() {
  try {
    const toSignupLink = document.querySelector(".to-login");

    toSignupLink.addEventListener("click", () => {
      DOMHandler.load(LoginPage);
    })

  } catch (error) {
    console.log(error.message)
  }
}

// Creates object to export
const SignupPage = {
  toString() {
    return render();
  },
  addListeners() {
    listenSignup();
    listenToLogin();
  },
  state: {
    signupError: null,
  }
}

export default SignupPage

/* <section>
<div class="header">
  <h1>Create Account</h1>
</div>
<div class="container">
  <form class="form signup-form">
      <input type="text" id="username" name="username" required placeholder="username" />
      <input type="text" id="email" name="email" required placeholder="email" />
      <input type="text" id="first_name" name="first_name" required placeholder="first_name" />
      <input type="text" id="last_name" name="last_name" required placeholder="last_name" />
      <input type="password" id="password" name="password" required placeholder="password" />
      ${signupError ? `<p> ${signupError}</p>` : ""}
      <div class="footer-links">
      <a href="" class="signup">Login</a>
      <button class="button button--primary">Create account</button>
      </div>
  </form>
</div>
</section> */