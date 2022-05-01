var today = new Date();
var date = (today.getMonth()+1)+'/'+today.getDate();
document.getElementById('date').innerHTML = 'Today' + ' ' + date;

let todoList = document.getElementById('todo-list');
let addArea = document.getElementById('new-todo-area');
let addButton = document.getElementById('add-button');
let todoText = document.getElementById('todo-text-input');

let todoItems = [];

function inputTodo() {
  let blankTodo = document.createElement('div');
  blankTodo.setAttribute('class', 'todo-item');
  blankTodo.innerHTML = `
  <input type="checkbox" id="checkbox-input"></input>
  <label for="checkbox-input" class="checkbox"><svg><use href="#unchecked" /></svg></label>
  <input type="text" id="todo-text-input"/>
  <button class="kebab"><svg><use href="#kebab" /></svg></button>
`;
  addArea.prepend(blankTodo);
  //Todo: figure out how to get focus on the new input  
}

function add(text, id) {
  let todo = {
    checked: false,
    text,
    id
  }

  todoItems.push(todo);
  display(todo);
  console.log(todoItems);
}

function display(todo) {
  let newTodo = document.createElement('li');
  newTodo.setAttribute('class', 'todo-item');
  newTodo.innerHTML = `
  <input type="checkbox" id="checkbox-input"></input>
  <label for="checkbox-input" class="checkbox"><svg><use href="#unchecked" /></svg></label>
  <input type="text" id="todo-text-input" value="${todo.text}" />
  <button class="kebab"><svg><use href="#kebab" /></svg></button>
`;
  todoList.appendChild(newTodo);
}

addButton.addEventListener('click', inputTodo);

document.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    add(document.activeElement.value, Date.now());
    document.activeElement.value = '';
    // inputTodo();
  }
});


// To-dos:
// [] Add specificity to keypress return (very buggy rn with edge cases)
// [] when input value on a todo is changed, update todo
// [] create checked / not checked states


