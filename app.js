let today = new Date();
let date = (today.getMonth()+1)+'/'+today.getDate();
let dateField = document.getElementById('date');
let todayDate = document.createElement('span')
dateField.append(todayDate);
todayDate.innerText = date;

let todoList = document.getElementById('todo-list');
let addButton = document.getElementById('add-button');
let todoText = document.getElementById('todo-text');


function add() {
  let todo = document.createElement('li');
  todo.setAttribute('class', 'todo-item');
  todo.setAttribute('id', Date.now());
  todo.innerHTML = `
  <input type="checkbox" id="checkbox-input"></input>
  <label for="checkbox-input" class="checkbox"><svg><use href="#unchecked" /></svg></label>
  <input type="text" id="todo-text" class="todo-text" autofocus/>
  <button class="kebab"><svg><use href="#kebab" /></svg></button>
`;
  todoList.appendChild(todo);
}


addButton.addEventListener('click', add);




