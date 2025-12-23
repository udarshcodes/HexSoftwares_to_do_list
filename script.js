const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let theme = localStorage.getItem("theme") || "light";


if (theme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) li.classList.add("completed");


    li.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });


    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({ text: text, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});

renderTasks();
