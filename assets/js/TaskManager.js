


// assets/js/TaskManager.js

// Create a class to manage tasks
class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentId = 0;
    }

    // Method to add a new task
    addTask(name, description, assignedTo, dueDate, status) {
        const task = {
            id: this.currentId++,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status,
        };
        this.tasks.push(task);
    }

    // Method to delete a task
    deleteTask(taskId) {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }

    // Method to render the tasks on the page
    renderTasks() {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        this.tasks.forEach((task) => {
            const taskElement = document.createElement("li");
            taskElement.classList.add("task-item");
            taskElement.innerHTML = `
                <div class="task-header">
                    <span>${task.name}</span>
                    <button class="delete-button" data-task-id="${task.id}">Delete</button>
                </div>
                <div class="task-details">
                    <span class="badge ${task.status}">${task.status}</span>
                    <small>Assigned To: ${task.assignedTo}</small>
                    <small>Due Date: ${task.dueDate}</small>
                </div>
                <p>${task.description}</p>
            `;

            const deleteButton = taskElement.querySelector(".delete-button");
            deleteButton.addEventListener("click", () => {
                this.deleteTask(task.id);
                this.renderTasks();
            });

            taskList.appendChild(taskElement);
        });
    }
}

// Export the TaskManager class
export default {TaskManager};

