import { renderButtons } from "./presentation/render-button/render-button";
import { renderTable } from "./presentation/render-table/render-table";
import userStore from "./store/user-store";

export const UserApp = async (element) => {
  element.innerHTML = "Loading...";
  await userStore.loadNextPage();
  element.innerHTML = "";
  console.log(userStore.getUsers());
  renderTable(element);
  renderButtons(element);
};
