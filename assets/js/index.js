import TaskManager from "/TaskManager.js"

// over world TaskManager ^
// under world index.js




// Create an instance of TaskManager
const taskManager = new TaskManager();

// Add event listener to the task form
const taskForm = document.getElementById("taskForm");
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the form inputs
    const nameInput = document.getElementById("name");
    const descriptionInput = document.getElementById("description");
    const assignedToInput = document.getElementById("assignedTo");
    const dueDateInput = document.getElementById("dueDate");
    const statusInput = document.getElementById("status");

    // Get the input values
    const name = nameInput.value;
    const description = descriptionInput.value;
    const assignedTo = assignedToInput.value;
    const dueDate = dueDateInput.value;
    const status = statusInput.value;

    // Add the task
    taskManager.addTask(name, description, assignedTo, dueDate, status);

    // Clear the form inputs
    nameInput.value = "";
    descriptionInput.value = "";
    assignedToInput.value = "";
    dueDateInput.value = "";
    statusInput.value = "TODO";

    // Render the tasks
    taskManager.renderTasks();
});

// Render the initial tasks
taskManager.renderTasks();


