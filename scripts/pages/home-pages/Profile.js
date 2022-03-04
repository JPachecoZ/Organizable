import { updateUser, deleteUser } from "../../services/users-service.js";
import STORE from "../../store.js";
import DOMHandler from "../../dom-handler.js";

function render() {
  const user = STORE.user;
  const { updateError } = Profile.state
  return `
  <h1 class="heading">My Profile</h1>
  <div class="container flex flex-column gap-8 items-center">
    <form
      action=""
      class="full-width container-sm flex flex-column gap-4 profile-form"
    >
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
            value=${user.username}
            class="input__content"
            id="username"
            name="username"
            required
          />
        </div>
        ${updateError ? `<span class="input__error-message"><p> ${updateError}</span>` : ""} 
      </div>
      <div class="input">
        <label for="email" class="content-xs overline">Email</label>
        <div class="input__container">
          <img
            src="../assets/icons/mail.svg"
            alt="user-icon"
            class="input__icon"
          />
          <input
            type="email"
            placeholder="user@example.com"
            value=${user.email}
            class="input__content"
            id="email"
            name="email"
            required
          />
        </div>
        ${updateError ? `<span class="input__error-message"><p> ${updateError}</span>` : ""} 
      </div>
      <div class="input">
        <label for="first_name" class="content-xs overline"
          >First Name</label
        >
        <div class="input__container">
          <img
            src="../assets/icons/data.svg"
            alt="user-icon"
            class="input__icon"
          />
          <input
            type="text"
            placeholder="user@example.com"
            value=${user.firstName}
            class="input__content"
            id="first_name"
            name="first_name"
            required
          />
        </div>
        ${updateError ? `<span class="input__error-message"><p> ${updateError}</span>` : ""} 
      </div>
      <div class="input">
        <label for="last_name" class="content-xs overline"
          >Last Name</label
        >
        <div class="input__container">
          <img
            src="../assets/icons/data.svg"
            alt="user-icon"
            class="input__icon"
          />
          <input
            type="text"
            placeholder="user@example.com"
            value=${user.lastName}
            class="input__content"
            id="last_name"
            name="last_name"
            required
          />
        </div>
        ${updateError ? `<span class="input__error-message"><p> ${updateError}</span>` : ""} 
      </div>
      <button type="submit" class="button button--primary width-full">
        Update Profile
      </button>
      <button type="button" class="button button--secondary width-full js-delete-user">
        Delete My Account
      </button>
    </form>
  </div>
  `
}

// Creates functions for page listeners

function listenUpdateProfile() {
  const loginForm = document.querySelector(".profile-form");

  loginForm.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { username, email, first_name, last_name } = event.target;

      const data = {
        username: username.value,
        email: email.value,
        first_name: first_name.value,
        last_name: last_name.value
      };

      const user = await updateUser(STORE.user.id, data);
      STORE.user = user;
      await STORE.fetchBoards();
      alert("Successfully updated!");


    } catch (error) {
      Profile.state.updateError = error.message;
    }
  })
}

function listenDeleteAccount() {
  const deleteAccountButton = document.querySelector(".js-delete-user");

  deleteAccountButton.addEventListener("click", async (event) => {
    try {
      event.preventDefault();
      await deleteUser(STORE.user.id);
      location.reload();
      STORE.user = null;
      alert("Account successfully deleted!");
      
    } catch (error) {
      Profile.state.updateError = error.message;
    }
  })
}
// Creates object to import

const Profile = {
  toString() {
    return render();
  },
  addListeners() {
    listenUpdateProfile();
    listenDeleteAccount();
  },
  state: {
    updateError: null,
  }
};

export default Profile
