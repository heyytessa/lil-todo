var today = new Date();
var date = (today.getMonth()+1)+'/'+today.getDate();
document.getElementById('date').innerHTML = 'Today' + ' ' + date;

let todoList = document.getElementById('todo-list');
let addArea = document.getElementById('new-todo-area');
let addButton = document.getElementById('add-button');
let removeButton = document.getElementById('remove-button');
let todoText = document.getElementById('todo-text-input');

let todoItems = [];

function inputTodo() {
  let blankTodo = document.createElement('div');
  blankTodo.setAttribute('class', 'todo-item');
  blankTodo.innerHTML = `
  <input type="checkbox" id="checkbox-input"></input>
  <label for="checkbox-input" class="checkbox"><svg><use href="#unchecked" /></svg></label>
  <input type="text" id="new-todo-text-input"/>
`;
  addArea.append(blankTodo);
  document.getElementById("new-todo-text-input").focus();
  //To-do: figure out how to get focus on the new input  
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

function toggle(id) {
  let index = todoItems.findIndex(item => item.id === Number(id));
  todoItems[index].checked = !todoItems[index].checked;
  console.log(todoItems[index].checked, todoItems);

  display(todoItems[index]);
}

function display(todo) {
  let currentItem = document.querySelector(`[id = '${todo.id}']`);

  let isDone = todo.checked? 'done' : '';

  let todoItem = document.createElement('li');
  todoItem.setAttribute('class', 'todo-item');
  todoItem.setAttribute('id', todo.id);
  if (todo.checked) {
    todoItem.innerHTML = `
    <input type="checkbox" id="checkbox-input"></input>
    <label for="checkbox-input" class="checkbox"><svg><use href="#checked" /></svg></label>
    <input type="text" id="todo-text-input" class="todo-item${isDone}" value="${todo.text}" />
    <button class="remove-button" id="remove-button"><svg><use href="#remove" /></svg></button>
  `;} else {
    todoItem.innerHTML = `
    <input type="checkbox" id="checkbox-input"></input>
    <label for="checkbox-input" class="checkbox"><svg><use href="#unchecked" /></svg></label>
    <input type="text" id="todo-text-input" value="${todo.text}" />
    <button class="remove-button" id="remove-button"><svg><use href="#remove" /></svg></button>
  `;
  }

  if (currentItem) {
    todoList.replaceChild(todoItem, currentItem);
  } else {
    todoList.append(todoItem);
  }
}

function update(todoText, id) {
  let index = todoItems.findIndex(item => item.id === Number(id));
  todoItems[index].text = todoText;
  console.log(todoItems);
}

function remove(id) {
document.getElementById(id).remove();
let index = todoItems.findIndex(item => item.id === Number(id));
todoItems.splice(index, 1);
console.log(todoItems);
}

//Clicking add task launches inputTodo field
addButton.addEventListener('click', () => {
  if (document.getElementById('new-todo-area').innerHTML === '') {  
  inputTodo();
  } else {
    document.getElementById("new-todo-text-input").focus();
  }
});

// Hitting return saves todo and resets input field to blank
addArea.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    add(document.activeElement.value, Date.now());
    document.activeElement.value = '';
  }
});

// Hitting esc clears newTodoArea
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    console.log('esc key pressed');
    addArea.innerHTML = '';
  }
});

//Editing an existing todo updates its todoText
  todoList.addEventListener('change', (event) => {
    if(event.target && event.target.id == "todo-text-input") {
      todoText = event.target.value;
      id = event.target.parentNode.id;
      update(todoText, id);
      // console.log(todoText, id);
    }
  });

// Clicking a checkbox toggles that todo's status
  todoList.addEventListener('click', (event) => {
    if (event.target.classList.contains('checkbox')) {
      id = event.target.parentNode.id;
      toggle(id);
  }});

//Clicking remove button on a todo removes that todo from todoList
todoList.addEventListener('click', (event) => {
  if(event.target && event.target.id == "remove-button") {
    id = event.target.parentNode.id;
    remove(id);
    console.log(id);
  }
});






// To-dos:
// [] Add specificity to keypress return (very buggy rn with edge cases)
// [x] when input value on a todo is changed, update todo
// [x] write toggle function
// [x] create checked / not checked states
// [x] bug: hitting enter after a todo.checked=true item breaks
// [x] autofocus input when you first add a todo
// [x] add button should only input new todo if newTodoArea is empty 
// [x] esc should clear newTodoArea


