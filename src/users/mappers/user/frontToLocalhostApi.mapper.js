import { User } from "../../models/User";

/**
 * Maps a user object from the front-end to the localhost API.
 *
 * @param {User} user The user object from the front-end.
 * @returns {Like<User>} The mapped user object for the localhost API.
 */
export const userModelToLocalhostApi = (user) => {
  const { id, isActive, balance, avatar, firstName, lastName, gender } = user;
  return {
    id,
    isActive,
    balance,
    avatar,
    first_name: firstName,
    last_name: lastName,
    gender,
  };
};
