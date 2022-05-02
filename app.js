var today = new Date();
var date = (today.getMonth()+1)+'/'+today.getDate();
document.getElementById('date').innerHTML = 'Today' + ' ' + date;

let todoList = document.getElementById('todo-list');
let addButton = document.getElementById('add-button');
let removeButton = document.getElementById('remove-button');
let todoText = document.getElementById('todo-text-input');
let todoItems = [];

function display(todo) {
  let currentItem = document.getElementById(`${todo.id}`);
  let isDone = todo.checked? 'done' : '';
  let todoItem = document.createElement('li');
  todoItem.setAttribute('class', 'todo-item');
  todoItem.setAttribute('id', todo.id);
  if (todo.checked) {
    todoItem.innerHTML = `
    <input type="checkbox" id="checkbox-input"></input>
    <label for="checkbox-input" class="checkbox"><svg><use href="#checked" /></svg></label>
    <input type="text" id="todo-text-input-${todo.id}" class="todo-text-input todo-item${isDone}" value="${todo.text}" />
    <button class="remove-button" id="remove-button"><svg><use href="#remove" /></svg></button>
  `;} else {
    todoItem.innerHTML = `
    <input type="checkbox" id="checkbox-input"></input>
    <label for="checkbox-input" class="checkbox"><svg><use href="#unchecked" /></svg></label>
    <input type="text" id="todo-text-input-${todo.id}" class="todo-text-input" value="${todo.text}" />
    <button class="remove-button" id="remove-button"><svg><use href="#remove" /></svg></button>
  `;
  }

  //Checks to see if the todo already exists; if so, replaces it
  if (currentItem) {
    todoList.replaceChild(todoItem, currentItem);
  } else {
    todoList.append(todoItem);
  }
}

function addTodo(id) {
  let todo = {
    checked: false,
    text: '',
    id
  }

  todoItems.push(todo);
  display(todo);
  document.getElementById(`todo-text-input-${id}`).focus();
}

function update(todoText, id) {
  let index = todoItems.findIndex(item => item.id === Number(id));
  todoItems[index].text = todoText;
  console.log(todoItems);
}

function toggle(id) {
  let index = todoItems.findIndex(item => item.id === Number(id));
  todoItems[index].checked = !todoItems[index].checked;
  console.log(todoItems[index].checked, todoItems);
  display(todoItems[index]);
}

function remove(id) {
document.getElementById(id).remove();
let index = todoItems.findIndex(item => item.id === Number(id));
todoItems.splice(index, 1);
console.log(todoItems);
}

//Clicking 'Add task' button launches inputTodo field
addButton.addEventListener('click', () => {
  let id = Date.now();
  addTodo(id);
});

// Hitting return adds another todo item
todoList.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && event.target.id != 'remove-button' ) {
    event.preventDefault();
    let id = Date.now();
    addTodo(id);
    document.getElementById(`todo-text-input-${id}`).focus();
  }
});

//Editing an existing todo updates its todoText
todoList.addEventListener('change', (event) => {
  let id = event.target.parentNode.id;
  if(event.target.classList.contains("todo-text-input")) {
    todoText = event.target.value;
    update(todoText, id);
  }
});

//Clicking checkbox toggles todo status, clicking remove button removes todo
todoList.addEventListener('click', (event) => {
  let id = event.target.parentNode.id;
  if(event.target && event.target.id == "remove-button") {
    remove(id);
  } else if (event.target.classList.contains('checkbox')) {
    toggle(id);
}
});

//Bugs to fix
//[x] tabbing to the remove button and hitting enter creates a new todo
//[x] competing classes on todo input (one for focus, the other for strikethrough) - can I add a span around the input?