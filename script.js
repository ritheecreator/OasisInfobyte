function saveTasks() {
    const tasksList = document.querySelectorAll("#tasks .task");
    const tasks = [];

    tasksList.forEach(task => {
        const text = task.querySelector(".task-text").innerText;
        const completed = task.classList.contains("completed");
        tasks.push({ text, completed });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const tasksContainer = document.getElementById("tasks");
    tasksContainer.innerHTML = ''; // Clear existing tasks to avoid duplication

    tasks.forEach(taskData => {
        const taskEl = document.createElement("li");
        taskEl.classList.add("task");
        if (taskData.completed) {
            taskEl.classList.add("completed");
        }
        taskEl.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${taskData.completed ? 'checked' : ''} onclick="toggleTaskStatus(this)">
            <span class="task-text">${taskData.text}</span>
            <i class="fa fa-pencil-square-o" aria-hidden="true" onclick="editTask(this)"></i>
            <i class="fa fa-trash-o" aria-hidden="true" onclick="deleteTask(this)"></i>
        `;
        tasksContainer.appendChild(taskEl);
    });
}


function addTask() {
    const tasksList = document.getElementById("tasks");
    const newTaskInput = document.getElementById("new-task");
    const taskText = newTaskInput.value.trim();

    if (!taskText) {
        alert("Please enter a task!");
        return;
    }

    const taskEl = document.createElement("li");
    taskEl.classList.add("task");
    taskEl.innerHTML = `
        <input type="checkbox" class="task-checkbox" onclick="toggleTaskStatus(this)">
        <span class="task-text">${taskText}</span>
        <i class="fa fa-pencil-square-o" aria-hidden="true" onclick="editTask(this)"></i>
        <i class="fa fa-trash-o" aria-hidden="true" onclick="deleteTask(this)"></i>
    `;
    tasksList.appendChild(taskEl);
    newTaskInput.value = ""; // Clear input field after adding
    saveTasks();
}


function toggleTaskStatus(checkbox) {
    const taskEl = checkbox.parentElement;
    if (checkbox.checked) {
        taskEl.classList.add("completed");
    } else {
        taskEl.classList.remove("completed");
    }
    saveTasks(); 
}

function deleteTask(element) {
    if (confirm("Are you sure you want to delete this task?")) {
        element.parentElement.remove();
        saveTasks();
    }
}

function editTask(element) {
    const task = element.parentElement;
    const taskTextElement = task.querySelector(".task-text");
    const newText = prompt("Edit your task", taskTextElement.innerText);
    if (newText) {
        taskTextElement.innerText = newText;
        saveTasks();
    }
}

// Event listener for adding a task on Enter key press
document.getElementById("new-task").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});


// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);
