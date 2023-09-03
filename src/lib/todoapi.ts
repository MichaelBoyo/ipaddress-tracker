import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081",
});
export function getToDos(access_token: string) {
  return instance.get("/api/todos", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
}

// function addToDo(addToDoRequest, access_token) {
//   return instance.post("/api/todos", addToDoRequest, {
//     headers: {
//       "Content-type": "application/json",
//       Authorization: `Bearer ${access_token}`,
//     },
//   });
// }

// function deleteToDo(id, access_token) {
//   return instance.delete(`/api/todos/${id}`, {
//     headers: { Authorization: `Bearer ${access_token}` },
//   });
// }

// function updateToDo(id, completed, access_token) {
//   return instance.patch(
//     `/api/todos/${id}?completed=${completed}`,
//     {},
//     {
//       headers: { Authorization: `Bearer ${access_token}` },
//     }
//   );
// }
