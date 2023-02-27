const API_KEY = "99";
const API_URL = "https://altcademy-to-do-list-api.herokuapp.com/tasks";

const getAndDisplayAllTasks = async () => {
  try {
    const response = await fetch(`${API_URL}?api_key=${API_KEY}`);
    const data = await response.json();
    const tasks = data.tasks;
    const todoList = document.querySelector("#todo-list");
    todoList.innerHTML = "";
    tasks.forEach((task) => {
      const taskEl = createTaskElement(task);
      todoList.appendChild(taskEl);
    });
  } catch (error) {
    console.error(error);
  }
};

const createTask = async (content) => {
  try {
    await fetch(`${API_URL}?api_key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: { content } }),
    });
    document.querySelector("#new-task-content").value = "";
    await getAndDisplayAllTasks();
  } catch (error) {
    console.error(error);
  }
};

const deleteTask = async (id) => {
  try {
    await fetch(`${API_URL}/${id}?api_key=${API_KEY}`, {
      method: "DELETE",
    });
    await getAndDisplayAllTasks();
  } catch (error) {
    console.error(error);
  }
};

const markTaskComplete = async (id) => {
  try {
    await fetch(`${API_URL}/${id}/mark_complete?api_key=${API_KEY}`, {
      method: "PUT",
    });
    await getAndDisplayAllTasks();
  } catch (error) {
    console.error(error);
  }
};

const markTaskActive = async (id) => {
  try {
    await fetch(`${API_URL}/${id}/mark_active?api_key=${API_KEY}`, {
      method: "PUT",
    });
    await getAndDisplayAllTasks();
  } catch (error) {
    console.error(error);
  }
};

const createTaskElement = (task) => {
  const taskEl = document.createElement("div");
  taskEl.className = "row";

  const checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.checked = task.completed;
  checkboxEl.addEventListener("change", async () => {
    if (checkboxEl.checked) {
      await markTaskComplete(task.id);
    } else {
      await markTaskActive(task.id);
    }
  });

  const contentEl = document.createElement("span");
  contentEl.textContent = task.content;
  contentEl.className = "content";

  const deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "delete-button";
  deleteButtonEl.addEventListener("click", async () => {
    await deleteTask(task.id);
  });

  taskEl.appendChild(checkboxEl);
  taskEl.appendChild(contentEl);
  taskEl.appendChild(deleteButtonEl);

  return taskEl;
};

document.addEventListener("DOMContentLoaded", function () {
  const checkboxEl = document.querySelector("input[type='checkbox']");
  if (checkboxEl) {
    checkboxEl.addEventListener("change", function () {
      const todoList = document.querySelector("#todo-list");
      const completedTasks = todoList.querySelectorAll("input[type='checkbox']:checked");
      const numCompletedTasks = completedTasks.length;
      const numTotalTasks = todoList.querySelectorAll(".row").length;
      const progressEl = document.querySelector("#progress");
      progressEl.textContent = `${numCompletedTasks}/${numTotalTasks}`;
    });
  }

  const formEl = document.querySelector("#create-task");
  formEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    const content = document.querySelector("#new-task-content").value;
    if (content.trim() === "") {
      alert("Please enter a task.");
      return;
    }
    await createTask(content);
  });

  document.addEventListener("DOMContentLoaded", async () => {
    await getAndDisplayAllTasks();
  });
})
