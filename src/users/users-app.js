import { renderAddButton } from "./presentation/render-add-button/render-add-button";
import { renderButtons } from "./presentation/render-button/render-button";
import { renderModal } from "./presentation/render-modal/render-modal";
import { renderTable } from "./presentation/render-table/render-table";
import userStore from "./store/user-store";
import { saveUser } from "./uses-cases/save-user";

export const UserApp = async (element) => {
  element.innerHTML = "Loading...";
  await userStore.loadNextPage();
  element.innerHTML = "";
  console.log(userStore.getUsers());
  renderTable(element);
  renderButtons(element);
  renderAddButton(element);
  renderModal(element, async (userLike) => {
    const user = await saveUser(userLike);
    userStore.onUserChanged(user);
    renderTable();
  });
};
