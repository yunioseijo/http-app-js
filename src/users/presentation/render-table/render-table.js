import userStore from "../../store/user-store";
import { deleteUserById } from "../../uses-cases/delete-user-by-id";
import { showModal } from "../render-modal/render-modal";
import "./render-table.css";

let table;
const createTable = () => {
  const table = document.createElement("table");
  const tableHeaders = document.createElement("thead");
  tableHeaders.innerHTML = `
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;
  const tableBody = document.createElement("tbody");
  table.append(tableHeaders, tableBody);
  return table;
};
/**
 * Handles the click event on the table.
 * If the clicked element is a link to edit the user, open the user modal with the user data.
 * @param {MouseEvent} event
 */
const tableSelectListener = (event) => {
  const element = event.target.closest(".select-user");
  if (!element) return;
  //const id = element.getAttribute("data-id");
  const id = element.dataset.id;
  showModal(id);
};
const tableDeleteListener = async (event) => {
  const element = event.target.closest(".delete-user");
  if (!element) return;
  const id = element.dataset.id;
  try {
    await deleteUserById(id);
    await userStore.reloadPage();
    document.querySelector("#current-page").innerText =
      userStore.getCurrentPage();
    renderTable();
  } catch (e) {
    console.log(e);
  }
};

/**
 * @param {HTMLDivElement} element
 */
export const renderTable = (element) => {
  const users = userStore.getUsers();

  if (!table) {
    table = createTable();
    element.append(table);
  }
  //TODO: add listener
  table.addEventListener("click", tableSelectListener);
  table.addEventListener("click", tableDeleteListener);

  let tableHTML = ``;
  users.forEach((user) => {
    tableHTML += `
    <tr>
        <td>${user.id}</td>
        <td>${user.balance}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.isActive}</td>
        <td>
        <a href='#/' class="select-user" data-id="${user.id}">Select</a>
        |
        <a href='#/' class="delete-user" data-id="${user.id}">Delete</a>
        </td>
    </tr>
    `;
  });
  table.querySelector("tbody").innerHTML = tableHTML;
};
