document.getElementById('taskForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Retrieve form field values
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskAssignedTo = document.getElementById('taskAssignedTo').value;
    const taskDueDate = document.getElementById('taskDueDate').value;
    const taskStatus = document.getElementById('taskStatus').value;

    // Validate form fields
    if (taskName.trim() === '') {
        showError('Please enter a task name');
        return;
    }

    if (taskDescription.trim() === '') {
        showError('Please enter a task description');
        return;
    }

    // Create task object
    const task = {
        name: taskName,
        description: taskDescription,
        assignedTo: taskAssignedTo,
        dueDate: taskDueDate,
        status: taskStatus
    };

    // Call function to add task to the list
    addTaskToList(task);

    // Clear form fields
    document.getElementById('taskForm').reset();
});

// Function to add task to the list
function addTaskToList(task) {
    const taskList = document.getElementById('taskList');

    // Create list item for task
    const taskItem = document.createElement('li');
    taskItem.classList.add('list-group-item');
    taskItem.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <h5>${task.name}</h5>
            <span class="badge badge-info">${task.status}</span>
        </div>
        <p>${task.description}</p>
        <p><strong>Assigned to:</strong> ${task.assignedTo}</p>
        <p><strong>Due Date:</strong> ${task.dueDate}</p>
    `;

    // Append task item to task list
    taskList.appendChild(taskItem);
}

// Function to show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('alert', 'alert-danger');
    errorDiv.textContent = message;

    const form = document.getElementById('taskForm');
    form.insertBefore(errorDiv, form.firstChild);

    // Clear error after 3 seconds
    setTimeout(function () {
        errorDiv.remove();
    }, 3000);
}
