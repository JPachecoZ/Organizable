//Helpers
import DOMHandler from "../dom-handler.js";

// Services
import { login } from "../services/session-service.js";

// Views
import SignupPage from "./signup-page.js";
import HomePage from "./home-page.js";
import STORE from "../store.js";


// Draws page
function render() {
  const { loginError } = LoginPage.state

  return `
    <section class="section-full bg-gray-100">
    <div class="container flex flex-column gap-8 items-center">
      <img src="../assets/images/logo.png" alt="rankable logo" />
      <h1 class="heading">Login</h1>
      <form action="" class="full-width container-sm flex flex-column gap-4 login-form">
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
              placeholder="username"
              class="input__content"
              id="username"
              name="username"
              required
            />
          </div>
          ${loginError ? `<span class="input__error-message"><p> ${loginError}</span>` : ""} 
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
          ${loginError ? `<span class="input__error-message"><p> ${loginError}</span>` : ""} 
        </div>
        <button type="submit" class="button button--secondary width-full">
          Login
        </button>
      </form>
      <a href="#" class="to-signup">Create Account</a>
    </div>
  </section>

  `
}

// Creates functions for page listeners
function listenLogin() {
  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { username, password } = event.target;

      const data = {
        username: username.value,
        password: password.value,
      };

      const user = await login(data);
      STORE.user = user;
      await STORE.fetchBoards();
      DOMHandler.load(HomePage);

    } catch (error) {
      LoginPage.state.loginError = error.message;
      DOMHandler.reload();
    }
  })
}

function listenToSignup() {
  try {
    const toSignupLink = document.querySelector(".to-signup");

    toSignupLink.addEventListener("click", () => {
      DOMHandler.load(SignupPage)
    })

  } catch (error) {
    console.log(error.message)
  }
}

// Creates object to export
const LoginPage = {
  toString() {
    return render();
  },
  addListeners() {
    listenLogin();
    listenToSignup();
  },
  state: {
    loginError: null,
  }
}

export default LoginPage

/* <section>
<div class="header">
  <h1>Login</h1>
</div>
<div class="container">
  <form class="form login-form">
      <input type="text" id="username" name="username" required placeholder="username" />
      <input type="password" id="password" name="password" required placeholder="password" />
      ${loginError ? `<span class="input__error-message"><p> ${loginError}</span>` : ""} 
      <div class="footer-links">
      <a class="to-signup">Create Account</a>
      <button class="button button--primary">Login</button>
      </div>
  </form>
</div>
</section> */