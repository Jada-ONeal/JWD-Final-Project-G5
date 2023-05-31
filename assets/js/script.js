document.querySelector('#push').onclick = function() {
    var inputs = document.querySelectorAll('#newtask input');
    var isEmpty = false;

    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === '') {
            isEmpty = true;
            break;
        }
    }

    if (isEmpty) {
        alert("Kindly fill in all input fields!");
    } else {
        
        document.querySelector('#tasks').innerHTML += `
        <div class="task">
            <span id="taskname">
                ${document.querySelector('#newtask input').value}
            </span>
            <button class="delete">
                <i class="far fa-trash-alt"></i>
            </button>
        </div>
    `;

    var current_tasks = document.querySelectorAll(".delete");
    for(var i=0; i<current_tasks.length; i++){
        current_tasks[i].onclick = function(){
            this.parentNode.remove();
        }
    }
    }
}
