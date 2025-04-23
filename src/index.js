import "./styles.css";
import { addTask, taskList } from "./tasks.js";
import { displayAllTasks } from "./all-tasks.js";
import { displayTodayTasks } from "./today.js";
import { displayUpcomingTasks } from "./upcoming.js";
import { displayCompletedTasks } from "./completed.js";


let currentView = () => displayAllTasks(taskList);
window.currentView = currentView; 

// Load default view on page load
document.addEventListener("DOMContentLoaded", () => {
  currentView();
  addTask(() => window.currentView(taskList)); 
});

// 🔁 Helper to set tab behavior
function setTab(tabId, viewFunction) {
  document.getElementById(tabId).addEventListener("click", () => {
    currentView = () => viewFunction(taskList, () => window.currentView(taskList));
    window.currentView = currentView;
    currentView();
  });
}

// ✅ Attach tab handlers
setTab("allTasks", displayAllTasks);
setTab("today", displayTodayTasks);
setTab("upcoming", displayUpcomingTasks);
setTab("completed", displayCompletedTasks);
