import { renderAddButton } from "./presentation/render-add-button/render-add-button";
import { renderButtons } from "./presentation/render-button/render-button";
import { renderModel } from "./presentation/render-model/render-model";
import { renderTable } from "./presentation/render-table/render-table";
import userStore from "./store/user-store";

export const UserApp = async (element) => {
  element.innerHTML = "Loading...";
  await userStore.loadNextPage();
  element.innerHTML = "";
  console.log(userStore.getUsers());
  renderTable(element);
  renderButtons(element);
  renderAddButton(element);
  renderModel(element);
};
