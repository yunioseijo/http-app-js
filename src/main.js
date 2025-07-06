import "./style.css";
// import { BreakingbadApp } from "./breakingbad/breakingbad-app";
import { UserApp } from "./users/users-app";

document.querySelector("#app").innerHTML = `  <div>
    
    <h1 id="app-title">CRUD VANILLA JS</h1>
    <div class="card">
    </div>
 
  </div>
`;
const element = document.querySelector(".card");
// BreakingbadApp(element);
UserApp(element);
