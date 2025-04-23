import { isBefore, parseISO,isToday } from "date-fns";

function getFilteredTaskGroups(taskList) {
  const now = new Date();

  const active = taskList.filter(
    (task) =>
      !task.completed &&
      (
        task.dueDate === "None" || 
        !isBefore(parseISO(task.dueDate), now) ||
        isToday(parseISO(task.dueDate), now)
      )
  );

  const overdue = taskList.filter(
    (task) =>
      !task.completed &&
      task.dueDate !== "None" &&
      isBefore(parseISO(task.dueDate), now) &&
      !isToday(parseISO(task.dueDate), now)
  );

  const completed = taskList.filter((task) => task.completed);

  return { active, overdue, completed };
}

export { getFilteredTaskGroups };
