import STORE from "../../store.js";

function renderStarredButtons(){
  return `
    <div class="board-card__button">
      <svg
        width="16"
        height="18"
        viewBox="0 0 16 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.8333 4.83333L13.1105 14.9521C13.0482 15.8243 12.3225 16.5 11.4481 16.5H4.55178C3.67739 16.5 2.95165 15.8243 2.88935 14.9521L2.16659 4.83333M6.33325 8.16667V13.1667M9.66658 8.16667V13.1667M10.4999 4.83333V2.33333C10.4999 1.8731 10.1268 1.5 9.66658 1.5H6.33325C5.87301 1.5 5.49992 1.8731 5.49992 2.33333V4.83333M1.33325 4.83333H14.6666"
          stroke="#5C5C5C"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div class="board-card__button active">
      <svg
        width="18"
        height="17"
        viewBox="0 0 18 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.04896 1.92664C8.34833 1.00537 9.65167 1.00538 9.95105 1.92664L11.0208 5.21864C11.1547 5.63063 11.5386 5.90957 11.9718 5.90958L15.4333 5.90971C16.402 5.90975 16.8047 7.1493 16.0211 7.71871L13.2208 9.75341C12.8703 10.008 12.7237 10.4594 12.8575 10.8714L13.927 14.1635C14.2263 15.0847 13.1719 15.8508 12.3882 15.2815L9.58775 13.247C9.23728 12.9924 8.76272 12.9924 8.41225 13.247L5.61179 15.2815C4.82809 15.8508 3.77367 15.0847 4.07297 14.1635L5.14249 10.8714C5.27634 10.4594 5.1297 10.008 4.77924 9.75341L1.97894 7.71871C1.19528 7.1493 1.59804 5.90975 2.56672 5.90971L6.02818 5.90958C6.46137 5.90957 6.8453 5.63063 6.97918 5.21864L8.04896 1.92664Z"
          fill="#none"
          stroke="#5C5C5C"
          stroke-width="2"
        />
      </svg>
    </div>
  `
}

function renderBoardsButtons(){
  return `
    <div class="board-card__button">
      <svg
        width="16"
        height="18"
        viewBox="0 0 16 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.8333 4.83333L13.1105 14.9521C13.0482 15.8243 12.3225 16.5 11.4481 16.5H4.55178C3.67739 16.5 2.95165 15.8243 2.88935 14.9521L2.16659 4.83333M6.33325 8.16667V13.1667M9.66658 8.16667V13.1667M10.4999 4.83333V2.33333C10.4999 1.8731 10.1268 1.5 9.66658 1.5H6.33325C5.87301 1.5 5.49992 1.8731 5.49992 2.33333V4.83333M1.33325 4.83333H14.6666"
          stroke="#5C5C5C"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div class="board-card__button">
      <svg
        width="18"
        height="17"
        viewBox="0 0 18 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.04896 1.92664C8.34833 1.00537 9.65167 1.00538 9.95105 1.92664L11.0208 5.21864C11.1547 5.63063 11.5386 5.90957 11.9718 5.90958L15.4333 5.90971C16.402 5.90975 16.8047 7.1493 16.0211 7.71871L13.2208 9.75341C12.8703 10.008 12.7237 10.4594 12.8575 10.8714L13.927 14.1635C14.2263 15.0847 13.1719 15.8508 12.3882 15.2815L9.58775 13.247C9.23728 12.9924 8.76272 12.9924 8.41225 13.247L5.61179 15.2815C4.82809 15.8508 3.77367 15.0847 4.07297 14.1635L5.14249 10.8714C5.27634 10.4594 5.1297 10.008 4.77924 9.75341L1.97894 7.71871C1.19528 7.1493 1.59804 5.90975 2.56672 5.90971L6.02818 5.90958C6.46137 5.90957 6.8453 5.63063 6.97918 5.21864L8.04896 1.92664Z"
          fill="#none"
          stroke="#5C5C5C"
          stroke-width="2"
        />
      </svg>
    </div>
  `  
}


function renderBoard(board) {
  return `
  <div class="board-card bg-${board.color}">
    <span>${board.name}</span>
    <div class="board-card__footer">
      ${(board.starred == true) ? renderStarredButtons() : renderBoardsButtons() }
    </div>
  </div>
  `
}

function render() {
  const boardList = STORE.boards;
  const starredList = STORE.starredBoards;
  return `
      <h1 class="heading">My Boards</h1>
      ${(starredList.length > 0) ? `<h2 class="heading heading--sm">Starred Boards</h2><div class="board-cards">` : ''}
        ${starredList.map(renderBoard).join("")}
      ${(starredList.length > 0) ? `</div>` : ''}
      <h2 class="heading heading--sm">Boards</h2>
      <div class="board-cards">
        ${boardList.map(renderBoard).join("")}
      </div>
  `
}

// Creates functions for page listeners

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

const MyBoards = {
  toString() {
    return render();
  },
  addListeners() {
    //listenLogout();
    //listenToggleClosed();
    //listenToShowBoard();
  }
};

export default MyBoards
