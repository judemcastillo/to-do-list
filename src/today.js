import { isToday, parseISO} from "date-fns";
import { editTask } from "./edit-tasks.js";
import { displayTask } from "./display-tasks.js";

function displayTodayTasks(taskList,onEditComplete) {
  const main = document.querySelector(".main");
  main.innerHTML = "";

  const todayTasks = taskList.filter(task => {
    return task.dueDate !== "None" && isToday(parseISO(task.dueDate)) && !task.completed;
  });

  const section = document.createElement("section");
  section.classList.add("task-section");

  const heading = document.createElement("h2");
  heading.textContent = "Today";
  section.appendChild(heading);

  if (todayTasks.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "No tasks due today.";
    section.appendChild(emptyMsg);
  }else {
    displayTask(todayTasks, section); // ✅ PASS section into displayTask
  }


  main.appendChild(section);

  // ✅ Checkbox logic
  document.querySelectorAll(".complete-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const index = +e.target.dataset.id;
      taskList[index].completed = e.target.checked;
      localStorage.setItem("taskList", JSON.stringify(taskList));
      displayTodayTasks(taskList); // re-render
    });
  });

  // ✅ Delete logic
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = +e.target.dataset.id;
      taskList.splice(index, 1);
      localStorage.setItem("taskList", JSON.stringify(taskList));
      displayTodayTasks(taskList);
    });
  });

  editTask(taskList, onEditComplete);
}

export { displayTodayTasks };
