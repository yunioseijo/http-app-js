import { userModelToLocalhostApi } from "../mappers/user/frontToLocalhostApi.mapper";
import { localhostUserToModel } from "../mappers/user/localhostApiToFront.mapper";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getUserById = async (id) => {
  const url = `${baseUrl}/users/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  //   const users = data.data.map((userLike) => localhostUserToModel(userLike));
  const user = localhostUserToModel(data);

  return user;
};
