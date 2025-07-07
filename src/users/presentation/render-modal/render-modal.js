import "./render-modal.css";
import modalHtml from "./render-modal.html?raw";
import { User } from "../../models/User";
import { getUserById } from "../../uses-cases/get-user-by-id";

let modal, form;
let loadedUser = {};
//TODO: load user by ID
export const showModal = async (id) => {
  modal?.classList.remove("hide-modal");
  if (!id) return;

  const user = await getUserById(id);
  setFormValues(user);
};

export const hideModal = () => {
  modal?.classList.add("hide-modal");

  form?.reset();
};

/**
 * Sets the values of the form with the given user data.
 *
 * @param {User} user The user data to set the form values with.
 */
const setFormValues = (user) => {
  form.firstName.value = user.firstName;
  form.lastName.value = user.lastName;
  form.balance.value = user.balance;
  form.isActive.checked = user.isActive;
  loadedUser = user;
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
    const userLike = { ...loadedUser };
    //By default formData does not send checkbox value if it is unchecked
    userLike.isActive = form.isActive.checked;
    for (const [key, value] of formData) {
      if (key === "balance" || key === "id") {
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
