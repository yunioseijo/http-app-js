import { User } from "../models/User";

export const saveUser = async (userLike) => {
  const user = new User(userLike);
  //Map user as backend expect

  if (user.id) {
    throw "Not implemented";
    return;
  }

  const updatedUser = await createUser(user);
  return updatedUser;
};

const createUser = async (user) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json",
    },
  });
  const newUser = await res.json();
  console.log("newUser ", newUser);
  return newUser;
};
