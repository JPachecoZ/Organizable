// Helpers
import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";

// Services
// import { toggleFavorite } from "../services/boards-service.js";
import { logout } from "../services/session-service.js"

// Pages
import LoginPage from "./login-page.js";
//import NewContactPage from "./new-contact-page.js";
//import ContactPage from "./contact-page.js";

// Draws page
function renderBoard(board) {
  return `
  <div class="board-box">
    <div class="profile" data-id-detail="${board.id}">
      <img src="/img/Profile.svg"/>
      <span>${board.name}</span>
    </div>
    <a class="star" data-id-favorite="${board.id}">
      ${board.starred ? '<img src="/img/star_fav.svg" /> <img src="/img/starin.svg"  class="favon" />' : '<img src="/img/Star.svg"/>'}
    </a>
  </div>
  `
}

function render() {
  const boardList = STORE.boards;
  const starredList = STORE.starredBoards;
  return `
    <section style="position: relative">
      <div class="header">
        <h1>Organizable</h1>
        <a class="logout-link">Logout</a>
      </div>
      <div class="container board-list">
        ${(starredList.length > 0) ? `<h2 class="sub-title">Starred (${starredList.length})</h2>` : ''}
        <div class="list">
          ${starredList.map(renderBoard).join("")}
        </div>
        <h2 class="sub-title">Boards (${boardList.length})</h2>
        <div class="list">
          ${boardList.map(renderBoard).join("")}
        </div>
      </div>
      <div class="add-board to-add-board"></div>
    </section>
    
  `
}

// Creates functions for page listeners
function listenLogout() {
  const logoutButton = document.querySelector(".logout-link")

  logoutButton.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      await logout();
      DOMHandler.load(LoginPage)
    } catch (error) {
      console.log(error)
    }
  });
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
    //listenLogout();
    //listenFavorite();
    //listenToAddContact();
    //listenToShowContact();
  }
};

export default HomePage
