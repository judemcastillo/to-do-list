import { format, parseISO } from "date-fns";

let taskList = JSON.parse(localStorage.getItem("taskList")) || [];

class Tasks {
    constructor(taskName, description, dueDate, priority, completed) {
        this.taskName = taskName;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    }
}

function addTask(onTaskAdded) {
    const dialog = document.getElementById("taskDialog");
    const addTaskBtn = document.getElementById("addTask");
    const closeButton = document.querySelector(".closeButton");
    const taskInput = document.getElementById("submit");
    const taskForm = document.getElementById("taskForm");

    // Open dialog
    addTaskBtn.addEventListener("click", (e) => {
        e.preventDefault();
        dialog.showModal();
    });

    // Close dialog
    closeButton.addEventListener("click", (e) => {
        e.preventDefault();
        dialog.close();
        taskForm.reset();
    });
    // Close dialog on clicking outside
    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) {
          dialog.close();
          taskForm.reset();
        }
      });

    // Submit task
    taskInput.addEventListener("click", (e) => {
        e.preventDefault();

        const taskName = document.getElementById("taskName").value;
        const description = document.getElementById("taskDescription").value;
        const rawDate = document.getElementById("dueDate").value;
            const dueDate = rawDate
            ? format(parseISO(rawDate), "yyyy-MM-dd")
            : "None";
            
        const priority = document.getElementById("priorityTask").value;
        const completed = false;
        if (taskName.trim() === "") {
            alert("Task name cannot be empty!");
            return; // Stop execution
          }


        const newTask = new Tasks(taskName, description, dueDate, priority, completed);
        taskList.push(newTask);

        // Save to localStorage
        localStorage.setItem("taskList", JSON.stringify(taskList));


        // Reset form & close dialog
        document.getElementById("taskForm").reset();
       
        if (typeof onTaskAdded === "function") {
            onTaskAdded(taskList);
          }

        dialog.close();
    });
}

export { addTask, taskList, Tasks };
