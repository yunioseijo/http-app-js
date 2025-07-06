import { User } from "../../models/User";

/**
 * Maps a user object from the localhost API to a User model.
 *
 * @param {Like<User>} localhostUser The user object from the localhost API.
 * @returns {User} The mapped user model.
 */
export const localhostUserToModel = (localhostUser) => {
  const { id, isActive, balance, avatar, first_name, last_name, gender } =
    localhostUser;
  return new User({
    id,
    isActive,
    balance,
    avatar,
    firstName: first_name,
    lastName: last_name,
    gender,
  });
};
