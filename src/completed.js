import { editTask } from "./edit-tasks.js";
import { displayTask } from "./display-tasks.js";

function displayCompletedTasks(taskList, onEditComplete) {
    const main = document.querySelector(".main");
    main.innerHTML = "";

    const completedTasks = taskList.filter(task => {
        return task.completed; 
     });
    const section = document.createElement("section");
    section.classList.add("task-section");

    const heading = document.createElement("h2");
    heading.textContent = "Completed";
    section.appendChild(heading);

    if ( completedTasks.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.textContent = "No Completed Tasks.";
        section.appendChild(emptyMsg);
    }else {
        displayTask(completedTasks, section);
    }


    main.appendChild(section);

    // ✅ Checkbox logic
    document.querySelectorAll(".complete-checkbox").forEach((checkbox) => {
        checkbox.addEventListener("change", (e) => {
        const index = +e.target.dataset.id;
        taskList[index].completed = e.target.checked;
        localStorage.setItem("taskList", JSON.stringify(taskList));
        displayCompletedTasks(taskList); // re-render
        });
    });

    // ✅ Delete logic
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
        const index = +e.target.dataset.id;
        taskList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(taskList));
        displayCompletedTasks(taskList);
        });
    });

    editTask(taskList, onEditComplete);
    }

export { displayCompletedTasks };