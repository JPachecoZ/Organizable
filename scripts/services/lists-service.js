import apiFetch from "./api-fetch.js";

export function createList(boardId, data = { name }) {
  return apiFetch("boards/" + boardId + "/lists", { body: data });
}

export async function updateList(boardId, listId, data = { name }) {
  const { token, ...list } = await apiFetch("boards/" + boardId + "/lists/" + listId, {
    body: data,
    method: "PATCH",
  });
  return list;
}

export function deleteList(boardId, listId) {
  return apiFetch("boards/" + boardId + "/lists/" + listId, { method: "DELETE" });
}

//==============================================================================================================

// export async function toggleStarred(id, data = { starred }) {
//   const { token, ...board } = await apiFetch("boards/" + id, {
//     body: data,
//     method: "PATCH",
//   });
//   return board;
// }

// export async function toggleClosed(id, data = { closed }) {
//   const { token, ...board } = await apiFetch("boards/" + id, {
//     body: data,
//     method: "PATCH",
//   });
//   return board;
// }

// export async function toggleFavorite(id) {
//   const contact = await apiFetch("contacts/" + id)
//   if (!contact.favorite)
//     return await updateContact(id, { favorite: true })
//   else
//     return await updateContact(id, { favorite: false })
// }


// export function getBoard(id) {
//   return apiFetch("boards/" + id);
// }

// export function getBoards() {
//   return apiFetch("boards");
// }
