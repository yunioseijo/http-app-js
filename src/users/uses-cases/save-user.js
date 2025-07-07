import { userModelToLocalhostApi } from "../mappers/user/frontToLocalhostApi.mapper";
import { localhostUserToModel } from "../mappers/user/localhostApiToFront.mapper";
import { User } from "../models/User";

export const saveUser = async (userLike) => {
  const user = new User(userLike);
  if (!user.firstName || !user.lastName) {
    throw new Error("First name and last name are required");
  }
  const userToSave = userModelToLocalhostApi(user);
  let userUpdated;

  if (user.id) {
    userUpdated = await updateUser(userToSave);
  } else {
    userUpdated = await createUser(userToSave);
  }
  return localhostUserToModel(userUpdated);
};

/**
 * Creates a new user in the server.
 *
 * @param {Like<User>} userLike
 *   The user data to be created.
 * @returns {Promise<User>}
 *   The new user with the id.
 */
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

const updateUser = async (user) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
  const res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json",
    },
  });
  const updatedUser = await res.json();
  console.log("updatedUser ", updatedUser);
  return updatedUser;
};
