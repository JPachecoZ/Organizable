import { getBoards } from "./services/boards-service.js"

async function fetchBoards() {
  const boards = await getBoards();
  
  this.boards = boards;
  this.starredBoards = boards.filter(
    (board) => board.starred
  );
}

const STORE = {
  user: null,
  currentBoardId: null,
  boards: [],
  starredBoards: [],
  fetchBoards,
};

export default STORE;