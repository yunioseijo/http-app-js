const state = {
  currentPage: 0,
  users: [],
};
const loadNextPage = async () => {
  throw new Error("Not implemented");
};
const loadPreviewPage = async () => {
  throw new Error("Not implemented");
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
  getUser: () => [...state.users],
  getCurrentPage: () => state.currentPage,
};
