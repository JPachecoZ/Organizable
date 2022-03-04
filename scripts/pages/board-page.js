// Helpers
import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";

// Services
// import { toggleFavorite } from "../services/boards-service.js";
import { logout } from "../services/session-service.js"
import { createBoard, deleteBoard, updateBoard } from "../services/boards-service.js";

// Pages
import LoginPage from "./login-page.js";
import MyBoards from "./home-pages/MyBoards-main.js";
import ClosedPage from "./home-pages/Closed-main.js";
import Profile from "./home-pages/Profile.js";
import { createCard } from "../services/cards-service.js";
//import NewContactPage from "./new-contact-page.js";
//import ContactPage from "./contact-page.js";

// Define display
let currentView = "boards";

// Draws page
function render() {
  return `
  <main class="main-body">
    <div class="board-edit-view none">
      <div class="popup">
        <form class="board-form__container createboard-form">
          <div class="board-card bg-green-100 js-board-sample" data-color="bg-green-100">
            <div class="board__input-container">
              <input
                type="text"
                placeholder="placeholder"
                class="input__content"
                id="name"
                name="name"
                required
              />
            </div>
            <div class="board-card__footer">
              <button type="submit" class="button button--sm button--subtle">
                Create
              </button>
            </div>
          </div>
          <div class="palette__options">
            <div class="color-option bg-green-100" data-color="bg-green-100"></div>
            <div class="color-option bg-melon" data-color="bg-melon"></div>
            <div class="color-option bg-blue" data-color="bg-blue"></div>
            <div class="color-option bg-orange" data-color="bg-orange"></div>
            <div class="color-option bg-violet" data-color="bg-violet"></div>
            <div class="color-option bg-pink" data-color="bg-pink"></div>
            <div class="color-option bg-green-200" data-color="bg-green-200"></div>
            <div class="color-option bg-gray" data-color="bg-gray"></div>
            <div class="color-option bg-cyan" data-color="bg-cyan"></div>
          </div>
        </form>
        <img
          class="close"
          src="../assets/icons/close-white.svg"
          alt="close icon"
        />
      </div>
    </div>
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
      currentView = option.dataset.value;
      await renderCurrentView(currentView);
    })
  })
}



function listenStarred() {
  const starredButtons = document.querySelectorAll(".starred-button")
  
  starredButtons.forEach((button) => {
    console.log(button);
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const boardId = event.target.closest(".board-card").dataset.id;
      const boardStarred = event.target.closest(".board-card").dataset.starred;
      const data = {
        starred: (boardStarred == "false" ? true : false),
      }
      await updateBoard(boardId, data);
      await STORE.fetchBoards();
      await renderCurrentView(currentView);
    })
  })
}

// Listeners for board creation

function listenToShowCreate() {
  try {
    if (document.querySelector(".board-create")) {
    const toShowCreateButton = document.querySelector(".board-create")

    toShowCreateButton.addEventListener("click", () => {
      const view = document.querySelector(".board-edit-view");
      view.classList.add('flex');
    })
    }
  } catch (error) {
    console.log(error.message)
  }
}

function listenToCloseCreate() {
  try {
    const toCloseCreateButton = document.querySelector(".close")

    toCloseCreateButton.addEventListener("click", () => {
      const view = document.querySelector(".board-edit-view");
      view.classList.remove('flex');
    })
  } catch (error) {
    console.log(error.message)
  }
}

function toggleBoardColor(){
  const colorPickers = document.querySelectorAll(".color-option");
  colorPickers.forEach((picker) => {
    picker.addEventListener('click', (event) => {
      event.preventDefault();
      const boardSample = document.querySelector(".js-board-sample");
      boardSample.classList.remove(boardSample.dataset.color);
      boardSample.classList.add(picker.dataset.color);
      boardSample.dataset.color = picker.dataset.color;
    })
  })
}

function listenCreateBoard() {
  const createBoardForm = document.querySelector(".createboard-form");
  const boardSample = document.querySelector(".js-board-sample");
  
  createBoardForm.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { name } = event.target;

      const data = {
        name: name.value,
        color: boardSample.dataset.color.split("-")[1],
      };
      await createBoard(data);
      const view = document.querySelector(".board-edit-view");
      view.classList.remove('flex');
      await STORE.fetchBoards();
      await renderCurrentView(currentView);
      
    } catch (error) {
      LoginPage.state.loginError = error.message;
      DOMHandler.reload();
    }
  })
}

// Board delete

function listenClosed() {
  const closedButtons = document.querySelectorAll(".closed-button")
  closedButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const boardId = event.target.closest(".board-card").dataset.id;
      const boardClosed = event.target.closest(".board-card").dataset.closed;
      console.log(boardId);
      console.log(boardClosed);
      const data = {
        closed: (boardClosed == "false" ? true : false),
      }
      console.log(data);
      const response = await updateBoard(boardId, data);
      console.log(response)
      await STORE.fetchBoards();
      await renderCurrentView(currentView);
    })
  })
}

function deleteBoardListener(){
  const deleteBoardButtons = document.querySelectorAll(".delete-button");
  deleteBoardButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      try {
        event.preventDefault();
        const boardToDelete = button.closest(".board-card");
        await deleteBoard(boardToDelete.dataset.id);
        await STORE.fetchBoards();
        await renderCurrentView(currentView);
      } catch (error) {
        console.log(error);
      }
    })
  })
}

// Helpers

async function reloadListeners(){
  listenToShowCreate();
  deleteBoardListener();
  listenStarred();
  listenClosed();
}

async function renderCurrentView(view){
  switch (view){
    case "boards":
      DOMHandler.load(".js-board-display", MyBoards);
      break;
    case "closed":
      DOMHandler.load(".js-board-display", ClosedPage);
      break;
    case "profile":
      DOMHandler.load(".js-board-display", Profile);
      break;
  }
  reloadListeners();
}

function changeSelection(newSelection){
  const selectedOption = document.querySelector(".selected");
  selectedOption.classList.remove('selected');
  newSelection.classList.add('selected');
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
    listenToCloseCreate();
    toggleBoardColor();
    listenCreateBoard();

    listenToShowCreate();
    deleteBoardListener();
    listenStarred();
    listenClosed();
  }
};

export default HomePage
