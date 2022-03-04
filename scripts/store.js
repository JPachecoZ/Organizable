import { getBoards } from "./services/boards-service.js"

async function fetchBoards() {
  const boards = await getBoards();
  
  this.boards = boards;

  this.unStarredBoards = boards.filter(
    (board) => !board.starred && !board.closed
  );
  this.starredBoards = boards.filter(
    (board) => board.starred && !board.closed
  );
  this.closedBoards = boards.filter(
    (board) => board.closed
  );
}

const STORE = {
  user: null,
  currentBoardId: null,
  boards: [],
  unStarredBoards: [],
  starredBoards: [],
  closedBoards: [],
  fetchBoards,
};

export default STORE;