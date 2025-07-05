import { loadUsersByPage } from "../uses-cases/load-users-by-page";

const state = {
  currentPage: 0,
  users: [],
};
const loadNextPage = async () => {
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
//TODO: implment
const onUserChanged = async () => {
  throw new Error("Not implemented");
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
