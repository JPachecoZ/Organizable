import apiFetch from "./api-fetch.js";

export function createCard(listId, data = { name }) {
  return apiFetch("lists/" + listId + "/cards", { body: data });
}

export async function updateCard(listId, cardId, data = { name }) {
  const { token, ...card } = await apiFetch("lists/" + listId + "/cards/" + cardId, {
    body: data,
    method: "PATCH",
  });
  return card;
}

export function deleteCard(listId, cardId) {
  return apiFetch("lists/" + listId + "/cards/" + cardId, { method: "DELETE" });
}

export async function switchCardPos(listId, cardId, data = { pos }) {
  const { token, ...card } = await apiFetch("lists/" + listId + "/cards/" + cardId, {
    body: data,
    method: "PATCH",
  });
  return card;
}

export async function switchCardList(listId, cardId, data = { list_id }) {
  const { token, ...card } = await apiFetch("lists/" + listId + "/cards/" + cardId, {
    body: data,
    method: "PATCH",
  });
  return card;
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
