import "./render-model.css";
import modalHtml from "./render-model.html?raw";

let modal, form;
//TODO: load user by ID
export const showModal = () => {
  modal?.classList.remove("hide-modal");
};

export const hideModal = () => {
  modal?.classList.add("hide-modal");
  form?.reset();
};

/**
 * Renders the user model dialog.
 *
 * @param {HTMLDivElement} element
 *   The element where the dialog will be appended.
 */
export const renderModel = (element) => {
  if (modal) return;

  modal = document.createElement("div");
  modal.innerHTML = modalHtml;
  modal.classList.add("modal-container", "hide-modal");
  form = modal.querySelector("form");

  modal.addEventListener("click", (e) => {
    if (e.target.className !== "modal-container") return;
    e.stopPropagation();
    hideModal();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const userLike = {};
    for (const [key, value] of formData) {
      if (key === "balance") {
        userLike[key] = Number(value);
        continue;
      }
      if (key === "isActive") {
        userLike[key] = value === "on" ? true : false;
        continue;
      }
      userLike[key] = value;
    }
    //TODO: save user
    hideModal();
  });

  element.append(modal);
};
