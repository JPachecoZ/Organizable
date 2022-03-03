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
    <section>
      <div class="header">
        <h1>Login</h1>
      </div>
      <div class="container">
        <form class="form login-form">
            <input type="text" id="username" name="username" required placeholder="username" />
            <input type="password" id="password" name="password" required placeholder="password" />
            ${loginError ? `<p> ${loginError}</p>` : ""}
            <div class="footer-links">
            <a class="to-signup">Create Account</a>
            <button class="button button--primary">Login</button>
            </div>
        </form>
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