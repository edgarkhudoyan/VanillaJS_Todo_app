//* Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')

//* Functions
const addTodo = e => {
  // Prevent from submitting
  e.preventDefault()
  //   To-do Div
  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo')
  //   Create LI
  const newTodo = document.createElement('li')
  newTodo.innerText = todoInput.value
  newTodo.classList.add('todo-item')
  todoDiv.appendChild(newTodo)
  //   Check mark button
  const completedButton = document.createElement('button')
  completedButton.innerHTML = '<i class="fas fa-check"></i>'
  completedButton.classList.add('complete-button')
  todoDiv.appendChild(completedButton)
  //   Trash Button
  const trashButton = document.createElement('button')
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'
  trashButton.classList.add('complete-button')
  todoDiv.appendChild(trashButton)
  //   Append To List
  todoList.appendChild(todoDiv)
}

//* Event Listeners
todoButton.addEventListener('click', addTodo)
