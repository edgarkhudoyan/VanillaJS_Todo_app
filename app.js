//* Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

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
  //   Add Todo to Local Storage
  saveLocalTodos(todoInput.value)
  //   Check mark button
  const completedButton = document.createElement('button')
  completedButton.innerHTML = '<i class="fas fa-check"></i>'
  completedButton.classList.add('complete-button')
  todoDiv.appendChild(completedButton)
  //   Trash Button
  const trashButton = document.createElement('button')
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'
  trashButton.classList.add('trash-button')
  todoDiv.appendChild(trashButton)
  //   Append To List
  todoList.appendChild(todoDiv)
  //   Clear Todo Input Value
  todoInput.value = ''
}

const deleteCheck = e => {
  const item = e.target
  // Delete Todo
  if (item.classList[0] === 'trash-button') {
    const todo = item.parentElement
    // Animation
    todo.classList.add('fall')
    removeLocalTodos(todo)
    todo.addEventListener('transitionend', () => {
      todo.remove()
    })
  }
  //   Cjecl Mark
  if (item.classList[0] === 'complete-button') {
    const todo = item.parentElement
    todo.classList.toggle('completed')
  }
}

const filterTodo = e => {
  const todos = todoList.childNodes
  todos.forEach(todo => {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex'
        break
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break
    }
  })
}

const saveLocalTodos = todo => {
  // Check if I have a todo already
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}

const getTodos = () => {
  // Check if I have a todo already
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.forEach(todo => {
    //   To-do Div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    //   Create LI
    const newTodo = document.createElement('li')
    newTodo.innerText = todo
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
    trashButton.classList.add('trash-button')
    todoDiv.appendChild(trashButton)
    //   Append To List
    todoList.appendChild(todoDiv)
  })
}

const removeLocalTodos = todo => {
  // Check if I have a todo already
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex), 1)
  localStorage.setItem('todos', JSON.stringify(todos))
}

//* Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)
