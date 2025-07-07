import { loadUsersByPage } from "../uses-cases/load-users-by-page";

const state = {
  currentPage: 0,
  users: [],
};
const loadNextPage = async () => {
  if (state.currentPage > 6) return;
  const users = await loadUsersByPage(state.currentPage + 1);
  if (users.length === 0) return;
  state.currentPage += 1;
  state.users = users;
};
const loadPreviewPage = async () => {
  if (state.currentPage === 1) return;
  const users = await loadUsersByPage(state.currentPage - 1);
  if (users.length === 0) return;
  state.currentPage -= 1;
  state.users = users;
};
const onUserChanged = (updatedUser) => {
  let wasFound = false;
  state.users = state.users.map((user) => {
    if (user.id === updatedUser.id) {
      wasFound = true;
      return updatedUser;
    }
    return user;
  });
  if (state.users.length < 10 && !wasFound) {
    state.users.push(updatedUser);
  }
};
const reloadPage = async () => {
  throw new Error("Not implemented");
};
export default {
  reloadPage,
  onUserChanged,
  loadPreviewPage,
  loadNextPage,
  /**
   *
   * @returns {User[]}
   */
  getUsers: () => [...state.users],
  /**
   *
   * @returns {number}
   */
  getCurrentPage: () => state.currentPage,
};
