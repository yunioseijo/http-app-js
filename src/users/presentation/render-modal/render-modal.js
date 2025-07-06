import "./render-modal.css";
import modalHtml from "./render-modal.html?raw";

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
 * Renders the user modal dialog.
 *
 * @param {HTMLDivElement} element
 * @param {(userLike) => Promise<void>} callback
 *   The element where the dialog will be appended.
 */
export const renderModal = (element, callback) => {
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

  form.addEventListener("submit", async (event) => {
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
    await callback(userLike);
    hideModal();
  });

  element.append(modal);
};
