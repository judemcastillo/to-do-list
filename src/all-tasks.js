import { getFilteredTaskGroups } from "./filter-tasks.js";
import { editTask } from "./edit-tasks.js";
import { displayTask } from "./display-tasks.js";


function displayAllTasks(taskList, onEditComplete) {
  const main = document.querySelector(".main");
  main.innerHTML = ""; // Clear UI

  const { active, overdue, completed } = getFilteredTaskGroups(taskList);

  if (active.length > 0) {
    main.appendChild(buildSection("All Tasks", active));
  }

  if (overdue.length > 0) {
    main.appendChild(buildSection("Overdue", overdue));
  }

  if (completed.length > 0) {
    main.appendChild(buildSection("Completed", completed));
  }

  editTask(taskList, onEditComplete);
    // ✅ Hook up complete checkbox logic
    document.querySelectorAll(".complete-checkbox").forEach((checkbox) => {
        checkbox.addEventListener("change", (e) => {
        const index = +e.target.dataset.id;
        taskList[index].completed = e.target.checked;
        localStorage.setItem("taskList", JSON.stringify(taskList));
        displayAllTasks(taskList); // Re-render
        });
    });
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const index = +e.target.dataset.id;
          taskList.splice(index, 1);
          localStorage.setItem("taskList", JSON.stringify(taskList));
          displayAllTasks(taskList);
        });
      });
  
}

function buildSection(title, tasks) {
  const section = document.createElement("section");
  section.classList.add("task-section");

  const heading = document.createElement("h2");
  heading.textContent = title;
  section.appendChild(heading);
  // 🔽 Sort by priority
  const priorityOrder = {
    High: 3,
    Medium: 2,
    Low: 1,
  };
  tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
  if (tasks.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "No tasks in this section.";
    section.appendChild(emptyMsg);
  }else {
    displayTask(tasks, section); // ✅ PASS section into displayTask
  }

  return section;
}

export { displayAllTasks };
