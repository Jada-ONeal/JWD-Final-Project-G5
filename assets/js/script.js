// document.querySelector('#push').onclick = function() {
//     var inputs = document.querySelectorAll('#newtask input');
//     var isEmpty = false;

//     for (var i = 0; i < inputs.length; i++) {
//         if (inputs[i].value.trim() === '') {
//             isEmpty = true;
//             break;
//         }
//     }

//     if (isEmpty) {
//         alert("Kindly fill in all input fields!");
//     } else {
        
//         document.querySelector('#tasks').innerHTML += `
//         <div class="task">
//             <span id="taskname">
//                 ${document.querySelector('#newtask input').value}
//             </span>
//             <button class="delete">
//                 <i class="far fa-trash-alt"></i>
//             </button>
//         </div>
//     `;

//     var current_tasks = document.querySelectorAll(".delete");
//     for(var i=0; i<current_tasks.length; i++){
//         current_tasks[i].onclick = function(){
//             this.parentNode.remove();
//         }
//     }
    
//     //clears input field
//     for(var i=0; i < inputs.length; i++){
//         inputs[i].value = "";
//     }

//     }
// }


// test code

function createCardFactory() {
    var cardFactory = {};
  
    cardFactory.createCard = function() {
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
        var cardName = document.querySelector('#newtask input[name="taskname"]').value;
        var cardDescription = document.querySelector('#newtask input[name="description"]').value;
        var cardAssignedTo = document.querySelector('#newtask input[name="assignedto"]').value;
        var cardDueDate = document.querySelector('#newtask input[name="duedate"]').value;
        var cardStatus = document.querySelector('#newtask input[name="status"]').value;
  
        var cardElement = document.createElement('div');
        cardElement.classList.add('task');
  
        var cardContent = document.createElement('span');
        cardContent.id = 'taskname';
        cardContent.textContent = cardName;
  
        var deleteButton = document.createElement('button');
deleteButton.classList.add('delete');
deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';

deleteButton.onclick = function() {
  var confirmDelete = confirm("Are you sure you want to delete this task?");
  if (confirmDelete) {
    cardElement.remove();
  }
};

  
        cardElement.appendChild(cardContent);
        cardElement.appendChild(deleteButton);
  
        document.querySelector('#tasks').appendChild(cardElement);
  
        // Clear input fields
        for (var i = 0; i < inputs.length; i++) {
          inputs[i].value = '';
        }
      }
    };
  
    return cardFactory;
  }
  
  var cardFactory = createCardFactory();
  
  document.querySelector('#push').onclick = function() {
    cardFactory.createCard();
  };
  