


export default class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentId = 0;
    }

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

    deleteTask(taskId) {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }

    updateTask(taskId) {
        const task = this.tasks.find((task) => task.id === taskId);

        if (task) {
            switch (task.status) {
                case 'TODO':
                    task.status = 'IN-PROGRESS';
                    break;
                case 'IN-PROGRESS':
                    task.status = 'DONE';
                    break;
                case 'DONE':
                    task.status = 'TODO';
                    break;
            }
        }
    }

    renderTasks() {
        const taskList = document.getElementById("taskList");
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

            if (task.status === 'DONE') {
                const deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-button", "btn", "btn-danger");
                deleteButton.innerText = "Delete";
                deleteButton.dataset.taskId = task.id;
                deleteButton.addEventListener("click", () => {
                    this.deleteTask(task.id);
                    this.renderTasks();
                });
                
                taskElement.appendChild(deleteButton);
                taskElement.classList.add("done-task");
            }

            const statusBadge = taskElement.querySelector(`.badge[data-task-id="${task.id}"]`);
            statusBadge.addEventListener('click', () => {
                this.updateTask(task.id);
                this.renderTasks();
            });

            taskList.appendChild(taskElement);
        });
    }
}



