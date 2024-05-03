// * Generate HTML for todos
export default function generateTodosHTML(todos) {
  const notCompletedTodos = []
  const completedTodos = []

  todos.forEach((todo) => {
    if (todo.completed) {
      completedTodos.push(todo)
    } else {
      notCompletedTodos.push(todo)
    }
  })

  // Generate HTML for not completed todos
  const notCompletedHTML = notCompletedTodos
    .map((todo) => {
      return `<li class="todo-item"><span hx-patch="/api/todos/toggle/${todo.id}" hx-trigger="click" hx-target="#todos" hx-indicator="#loading">${todo.text}</span></li>`
    })
    .join('')

  // HTML content to put between not completed and completed todos
  const separatorHTML = `<div>--- <button hx-post="/api/todos/delete-completed" hx-trigger="click" hx-target="#todos" hx-indicator="#loading" class="delete-button separator">Delete Completed</button> ---</div>`

  // Generate HTML for completed todos
  const completedHTML = completedTodos
    .map((todo) => {
      return `<li class="todo-item completed"><span hx-patch="/api/todos/toggle/${todo.id}" hx-trigger="click" hx-target="#todos">${todo.text}</span><button hx-delete="/api/todos/${todo.id}" hx-trigger="click" hx-target="#todos" hx-indicator="#loading" class='delete-button'>X</button></li>`
    })
    .join('')

  // Combine and return the full HTML (if there are no completed todos, don't include the separator)
  return (
    notCompletedHTML +
    (completedTodos.length ? separatorHTML + completedHTML : '')
  )
}
