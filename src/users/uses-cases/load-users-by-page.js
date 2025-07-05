import { localhostUserToModel } from "../mappers/localhost-user-mapper";

const baseUrl = import.meta.env.VITE_BASE_URL;

/**
 * Fetches the users from the API, using the _page parameter.
 *
 * @param {number} [page=1] The page number to fetch.
 * @returns {Promise<User[]>} A promise that resolves to an array of users.
 */
export const loadUsersByPage = async (page = 1) => {
  const url = `${baseUrl}/users?_page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  //   const users = data.data.map((userLike) => localhostUserToModel(userLike));
  const users = data.data.map(localhostUserToModel);
  return users;
};
