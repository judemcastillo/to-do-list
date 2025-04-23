import { displayAllTasks } from "./all-tasks.js";

function editTask(taskList, onEditComplete) {
  
  document.querySelectorAll(".task-title").forEach((el) => {
    el.addEventListener("click", (e) => {
      const index = +e.target.dataset.id;
      const task = taskList[index];
  
      // Pre-fill dialog with existing values
      document.getElementById("edittaskName").value = task.taskName;
      document.getElementById("edittaskDescription").value = task.description;
      document.getElementById("editdueDate").value = task.dueDate;
      document.getElementById("editpriorityTask").value = task.priority;
  
      const editDialog = document.getElementById("editTaskDialog");
      editDialog.showModal();

      const editCloseButton = document.querySelector(".editcloseButton");
      editCloseButton.addEventListener("click", (e) => {
        e.preventDefault();
        editDialog.close();
        });

      // Close dialog on clicking outside
      editDialog.addEventListener("click", (e) => {
        if (e.target === editDialog) {
          editDialog.close();
        }
      });
  
      // save changes
      const editSaveBtn = document.getElementById("saveBtn");
      editSaveBtn.onclick = function (e) {
        e.preventDefault();
        task.taskName = document.getElementById("edittaskName").value;
        task.description = document.getElementById("edittaskDescription").value;
        const rawDate = document.getElementById("editdueDate").value;
            task.dueDate = rawDate
                ? rawDate
                : "None";
        task.priority = document.getElementById("editpriorityTask").value;
  
        localStorage.setItem("taskList", JSON.stringify(taskList));
        
        if (typeof onEditComplete === "function") {
          onEditComplete(taskList);
        }

        editDialog.close();
        document.getElementById("editTaskForm").reset();
  
      };
     
    });
  });
  
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      taskList.splice(index, 1);
      localStorage.setItem("taskList", JSON.stringify(taskList));
      displayAllTasks(taskList);
    });
  });
}
export { editTask };