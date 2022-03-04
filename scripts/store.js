import { getBoards } from "./services/boards-service.js"

async function fetchBoards() {
  const boards = await getBoards();
  
  this.boards = boards.filter(
    (board) => !board.starred
  );
  this.starredBoards = boards.filter(
    (board) => board.starred
  );
  this.closedBoards = boards.filter(
    (board) => board.closed
  );
}

const STORE = {
  user: null,
  currentBoardId: null,
  boards: [],
  starredBoards: [],
  closedBoards: [],
  fetchBoards,
};

export default STORE;