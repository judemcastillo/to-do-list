import{taskList} from "./tasks.js";
import { parseISO, isBefore, isToday } from "date-fns";

function displayTask(tasks, section) {

    tasks.forEach((task) => {
        const card = document.createElement("div");
        card.classList.add("task-card");
        if (task.completed) card.classList.add("task-completed");

        const isChecked = task.completed ? "checked" : "";
        const parsedDate = parseISO(task.dueDate);
        const isOverdue = task.dueDate !== "None" && isBefore(parsedDate, new Date()) && !isToday(parsedDate);


        const priorityClass = task.priority === "High" ? "priority-high"
            : task.priority === "Medium"? "priority-medium"
            : "priority-low";
        const priorityOrder = {
                High: 3,
                Medium: 2,
                Low: 1,
                };
        tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

        const dueDateText = task.dueDate && task.dueDate !== "None"
            ? `<span class="${isOverdue ? 'overdue' : ''}">${task.dueDate}</span>`
            : "None";

        const fullIndex = taskList.indexOf(task); // gets actual index in full list
        

        card.innerHTML = `
        <div class="task-menu">
                    <div class="task-header">
                        <label class="checkbox-wrapper">
                            <input type="checkbox" class="complete-checkbox" data-id="${fullIndex}" ${isChecked}>
                            <span class="custom-check"></span>
                        </label>
                        <div class="task-info">
                            <h3 class="task-title" data-id="${fullIndex}">${task.taskName}</h3>
                        </div>
                    </div>
                    <p>Due: ${dueDateText}</p>
                    <p>Priority: <span class="priority-badge ${priorityClass}">${task.priority}</span></p>
                    <div  class="trash-icon delete-btn" 
                        data-id="${fullIndex}" 
                        title="Delete task">
                    </div>
                </div>
            `;

        section.appendChild(card);
    });
}
export { displayTask };