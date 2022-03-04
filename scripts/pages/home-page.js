// Helpers
import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";

// Services
// import { toggleFavorite } from "../services/boards-service.js";
import { logout } from "../services/session-service.js"

// Pages
import LoginPage from "./login-page.js";
import MyBoards from "./home-pages/MyBoards-main.js";
import ClosedPage from "./home-pages/Closed-main.js";
import Profile from "./home-pages/Profile.js";
//import NewContactPage from "./new-contact-page.js";
//import ContactPage from "./contact-page.js";

// Draws page
function render() {
  return `
  <main class="main-body">
    <aside class="aside">
      <div>
        <div class="logo-container">
          <img
            src="../assets/images/logo.png"
            alt="organizable-logo"
            class="logo"
          />
        </div>
        <ul>
          <li data-value="boards" class="option selected">
            <img
              src="../assets/icons/boards.svg"
              alt="boards-icon"
              class="icon"
            />
            <span href="#notes">My Boards</span>
          </li>
          <li data-value="closed" class="option">
            <img src="../assets/icons/box.svg" alt="box-icon" class="icon" />
            <span href="#trash">Closed Boards</span>
          </li>
          <li data-value="profile" class="option">
            <img
              src="../assets/icons/user.svg"
              alt="user-icon"
              class="icon"
            />
            <span href="#profile">My Profile</span>
          </li>
        </ul>
      </div>
      <div class="option option-exit logout-link">
        <img src="../assets/icons/exit.svg" alt="user-icon" class="icon" />
        <span class="primary-500">Logout</span>
      </div>
    </aside>
    <div id="main-content">
      <div class="content bg-gray-100 js-board-display">
        ${MyBoards}
      </div>
  </main>
  `
}

// Creates functions for page listeners
function listenLogout() {
  const logoutButton = document.querySelector(".logout-link")

  logoutButton.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      await logout();
      DOMHandler.load("#root", LoginPage);
    } catch (error) {
      console.log(error)
    }
  });
}

function listenOptions(){
  const options = document.querySelectorAll(".option");
  options.forEach((option) =>{
    option.addEventListener('click', async(event) => {
      event.preventDefault();
      const toSelectOption = event.target.closest(".option");
      changeSelection(toSelectOption);
      switch (option.dataset.value){
        case "boards":
          console.log(option.dataset.value);
          DOMHandler.load(".js-board-display", MyBoards);
          break;
        case "closed":
          console.log(option.dataset.value);
          DOMHandler.load(".js-board-display", ClosedPage);
          break;
        case "profile":
          console.log(option.dataset.value);
          DOMHandler.load(".js-board-display", Profile);
          break;
      }
    })
  })
}

function changeSelection(newSelection){
  const selectedOption = document.querySelector(".selected");
  selectedOption.classList.remove('selected');
  newSelection.classList.add('selected');
}

function listenFavorite() {
  const boardList = document.querySelector(".board-list") // Obtiene la lista de tableros

  boardList.addEventListener("click", async (event) => {
    // Obtiene el id del tablero, en este caso está en el boton estrella de cada tablero
    const starButton = event.target.closest("[data-id-favorite]");
    if (!starButton) return;

    event.preventDefault();
    const id = starButton.dataset.idFavorite;
    await toggleFavorite(id);
    await STORE.fetchBoards();
    DOMHandler.reload();
  });
}

function listenToAddContact() {
  try {
    const toAddContactLink = document.querySelector(".to-add-contact")

    toAddContactLink.addEventListener("click", () => {
      DOMHandler.load(NewContactPage)
    })
  } catch (error) {
    console.log(error.message)
  }
}

function listenToShowContact() {
  const contactList = document.querySelector(".contact-list")

  contactList.addEventListener("click", async (event) => {
    const toShowContactLink = event.target.closest("[data-id-detail]");
    if (!toShowContactLink) return;

    event.preventDefault();

    const id = toShowContactLink.dataset.idDetail;
    STORE.currentContactId = id;
    DOMHandler.load(ContactPage);
  });
}

// Creates object to import

const HomePage = {
  toString() {
    return render();
  },
  addListeners() {
    listenLogout();
    listenOptions();
    //listenToShowBoard();
  }
};

export default HomePage
