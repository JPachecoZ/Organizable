// Helpers
import DOMHandler from "./scripts/dom-handler.js"
import { tokenkey } from "./scripts/config.js";

// Services
//import { createContact, getContact, getContacts, deleteContact, updateContact, toggleFavorite } from "./scripts/services/boards-service.js";
import { createList, updateList, deleteList } from "./scripts/services/lists-service.js";
import { getBoard, updateBoard, deleteBoard, createBoard } from "./scripts/services/boards-service.js";
import { createCard, updateCard, deleteCard } from "./scripts/services/cards-service.js";
import { login, signup } from "./scripts/services/session-service.js";

// Pages
import LoginPage from "./scripts/pages/login-page.js";

async function init() {
  DOMHandler.load(LoginPage)
  // try {
  //   const token = sessionStorage.getItem(tokenkey);
  //   if (!token) throw new Error();
  // } catch (error) {
  //   sessionStorage.removeItem(tokenkey);
  //   DOMHandler.load(LoginPage)
  // }
}

//init();

//login({username: "javier", password: "123456"});
//let board = await getBoard(380);
//console.log(board);
//createBoard({name: "Codeable", color: "amarillo patito"});
//updateBoard(374, { name: "Codeable Updated", color: "amarrillo patito", closed: true, starred:false});
//deleteBoard(374);


//createList(380, {name: "Unfinished Projects"});
//updateList(380, 103, {name: "Finished Projects"});
//deleteList(380, 104);

//createCard(103, {name: "New Card 2"});
//updateCard(103, 320, {name: "Organizable", list_id: 102, pos: 1});
//deleteCard(103, 308);