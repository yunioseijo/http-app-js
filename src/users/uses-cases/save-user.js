import { userModelToLocalhostApi } from "../mappers/user/frontToLocalhostApi.mapper";
import { User } from "../models/User";

export const saveUser = async (userLike) => {
  const user = new User(userLike);
  if (!user.firstName || !user.lastName) {
    throw new Error("First name and last name are required");
  }

  const userToSave = userModelToLocalhostApi(user);

  if (user.id) {
    throw "Not implemented";
    return;
  }

  const updatedUser = await createUser(userToSave);
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
