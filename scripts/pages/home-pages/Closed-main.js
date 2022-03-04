import STORE from "../../store.js";

function renderClosedButtons(){
  return `
  <div class="board-card__button">
    <svg
      width="10"
      height="12"
      viewBox="0 0 10 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.35564 5.35296L3.65146 3.06001L4.50479 2.20775V3.41379V10.9998C4.50479 11.1322 4.55745 11.2593 4.65138 11.3531C4.74534 11.447 4.8729 11.4998 5.00604 11.4998C5.13919 11.4998 5.26675 11.447 5.3607 11.3531C5.45464 11.2593 5.5073 11.1322 5.5073 10.9998V3.41379V2.20775L6.36063 3.06001L8.65292 5.34943C8.74713 5.43901 8.8727 5.48861 9.00311 5.48748C9.13473 5.48634 9.26052 5.4336 9.35341 5.34083C9.44627 5.24808 9.49884 5.12274 9.49998 4.99184C9.50111 4.86214 9.45166 4.73703 9.36201 4.64298L5.36065 0.646614C5.2667 0.552809 5.13916 0.5 5.00604 0.5C4.87293 0.5 4.74539 0.552809 4.65144 0.646614L0.646539 4.64651C0.646521 4.64653 0.646503 4.64654 0.646485 4.64656C0.552617 4.74037 0.5 4.86743 0.5 4.99979C0.5 5.13212 0.552597 5.25916 0.646432 5.35296H1.35564ZM1.35564 5.35296C1.35563 5.35298 1.35561 5.35299 1.35559 5.35301M1.35564 5.35296L1.35559 5.35301M1.35559 5.35301C1.26164 5.44678 1.13413 5.49957 1.00104 5.49957M1.35559 5.35301L1.00104 5.49957M1.00104 5.49957C0.867973 5.49957 0.74048 5.4468 0.646539 5.35307L1.00104 5.49957Z"
        fill="#303036"
        stroke="#5C5C5C"
      />
    </svg>
  </div>
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
  `
}

function renderBoard(board) {
  return `
  <div class="board-card bg-${board.color}">
    <span>${board.name}</span>
    <div class="board-card__footer">
      ${renderClosedButtons()}
    </div>
  </div>
  `
}

function render() {
  const boardList = STORE.closedBoards;
  return `
      <h1 class="heading">Closed Boards</h1>
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

const ClosedPage = {
  toString() {
    return render();
  },
  addListeners() {
    //listenLogout();
    //listenToggleClosed();
    //listenToShowBoard();
  }
};

export default ClosedPage
