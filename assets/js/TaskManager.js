export default class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentId = 0;
    }

    addTask(name, description, assignedTo, dueDate, status) {
        const task = {
            id: this.currentId,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status,
        };
        this.tasks.push(task);
        this.currentId++;
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }

    updateTask(taskId) {
        const task = this.tasks.find((task) => task.id === taskId);

        if (task) {
            switch (task.status) {
                case "TODO":
                    task.status = "IN-PROGRESS";
                    break;
                case "IN-PROGRESS":
                    task.status = "DONE";
                    break;
                case "DONE":
                    task.status = "TODO";
                    break;

            }
        }
    }
    save() {
        const tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', tasksJson);

        const currentIdString = String(this.currentId);
        localStorage.setItem('currentId', currentIdString);
    }

    load() {
        const tasksJson = localStorage.getItem('tasks');
        if (tasksJson) {
            this.tasks = JSON.parse(tasksJson);
        }

        const currentIdString = localStorage.getItem('currentId');
        if (currentIdString) {
            this.currentId = parseInt(currentIdString);
        }
    }

    renderTasks() {
        const taskList = document.getElementById("task-list");
        taskList.innerHTML = "";

        this.tasks.forEach((task) => {
            const taskElement = document.createElement("li");
            taskElement.classList.add("list-group-item");
            taskElement.innerHTML = `
              <div class="task-header d-flex justify-content-between align-items-center">
                  <span>${task.name}</span>
              </div> 
              
              <div class="task-details">
                  <p>${task.description}</p>
                  <span class="badge ${task.status}" data-task-id="${task.id}">${task.status}</span>
                  <small>Assigned To: ${task.assignedTo}</small>
                  <small>Due Date: ${task.dueDate}</small>
              </div>
          `;

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-button", "btn", "btn-danger");
            deleteButton.innerText = "Delete";
            deleteButton.dataset.taskId = task.id;
            deleteButton.addEventListener("click", () => {
                this.deleteTask(task.id);
                this.renderTasks();
                this.save();
            });

            const updateButton = document.createElement("button");
            updateButton.classList.add("update-button", "btn", "btn-primary");
            updateButton.innerText = "Update";
            updateButton.dataset.taskId = task.id;
            updateButton.addEventListener("click", () => {
                this.updateTask(task.id);
                this.renderTasks();
                this.save();
            });

            taskElement.appendChild(deleteButton);
            taskElement.appendChild(updateButton);
            taskList.appendChild(taskElement);
        });
    }

}

