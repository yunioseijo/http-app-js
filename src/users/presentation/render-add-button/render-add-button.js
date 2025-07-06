import { showModal } from "../render-model/render-model";
import "./render-add-button.css";
export const renderAddButton = (element) => {
  const fabButton = document.createElement("button");
  fabButton.innerText = " + ";
  fabButton.classList.add("fab-button");
  element.append(fabButton);
  fabButton.addEventListener("click", () => {
    showModal();
  });
};
