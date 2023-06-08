// Import TaskManager
import TaskManager from "./TaskManager.js"

// Create an instance of TaskManager
const taskManager = new TaskManager();

// Load tasks from LocalStorage and render them
taskManager.load();
taskManager.renderTasks();

// Select the form and add a submit event listener
const form = document.querySelector('#task-form');
const errorAlert = document.querySelector("#error-alert"); // Select the error alert element
form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Get the input values from the form
  const taskNameInput = document.querySelector('#name');
  const taskDescriptionInput = document.querySelector('#description');
  const taskAssignedToInput = document.querySelector('#assignedTo');
  const taskDueDateInput = document.querySelector('#dueDate');
  const taskStatusInput = document.querySelector('#status');

  // Validate the input values
  if (
    taskNameInput.value.trim() === '' ||
    taskDescriptionInput.value.trim() === '' ||
    taskAssignedToInput.value.trim() === '' ||
    taskDueDateInput.value.trim() === '' ||
    taskStatusInput.value.trim() === ''
  ) {
    errorAlert.classList.remove('d-none'); // Show the error alert
    return;
  }



  // Add the task to the TaskManager
  taskManager.addTask(
    taskNameInput.value,
    taskDescriptionInput.value,
    taskAssignedToInput.value,
    taskDueDateInput.value,
    taskStatusInput.value
  );
  console.log(taskManager.tasks)

  // Clear the form inputs
  form.reset();

  // Render the updated tasks and save them to LocalStorage
  taskManager.renderTasks();
  taskManager.save();
});

// Add a click event listener to the tasks list
const tasksList = document.querySelector('#task-list');
tasksList.addEventListener('click', function (event) {
  if (event.target.classList.contains('update-button')) {
    // Get the task element and its ID
    const taskElement = event.target.closest('.task');
    const taskId = Number(taskElement.dataset.taskId);

    // Update the task status to 'Done' in the TaskManager
    taskManager.updateTask(taskId);

    // Render the updated tasks and save them to LocalStorage
    taskManager.renderTasks();
    taskManager.save();
  }
});
