import { isToday, parseISO, isBefore, isAfter } from "date-fns";
import { editTask } from "./edit-tasks.js";
import { displayTask } from "./display-tasks.js";

function displayUpcomingTasks(taskList, onEditComplete) {
  const main = document.querySelector(".main");
  main.innerHTML = "";

  const upcomingTasks = taskList.filter(task => {
    if (task.completed) return false;

    if (task.dueDate === "None") {
      return true; 
    }
  
    const date = parseISO(task.dueDate);
    return !isToday(date) && isAfter(date, new Date());
  });

  const section = document.createElement("section");
  section.classList.add("task-section");

  const heading = document.createElement("h2");
  heading.textContent = "Upcoming";
  section.appendChild(heading);

  if (upcomingTasks.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "No Upcoming Tasks.";
    section.appendChild(emptyMsg);
  }else {
    displayTask(upcomingTasks, section); // ✅ PASS section into displayTask
  }


  main.appendChild(section);

  // ✅ Checkbox logic
  document.querySelectorAll(".complete-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const index = +e.target.dataset.id;
      taskList[index].completed = e.target.checked;
      localStorage.setItem("taskList", JSON.stringify(taskList));
      displayUpcomingTasks(taskList); // re-render
    });
  });

  // ✅ Delete logic
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = +e.target.dataset.id;
      taskList.splice(index, 1);
      localStorage.setItem("taskList", JSON.stringify(taskList));
      displayUpcomingTasks(taskList);
    });
  });

  editTask(taskList, onEditComplete);
}

export { displayUpcomingTasks };