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
      return `<li hx-post="/api/toggle/${todo.id}" hx-trigger="click" hx-target="#todos" class="todo-item">${todo.text}</li>`
    })
    .join('')

  // HTML content to put between not completed and completed todos
  const separatorHTML = `<div>--- <button hx-post="/api/delete-completed" hx-trigger="click" hx-target="#todos" class="delete-button separator">Delete Completed</button> ---</div>`

  // Generate HTML for completed todos
  const completedHTML = completedTodos
    .map((todo) => {
      return `<li hx-post="/api/toggle/${todo.id}" hx-trigger="click" hx-target="#todos" class="todo-item completed">${todo.text} <button hx-post="/api/delete/${todo.id}" hx-trigger="click" hx-target="#todos" class='delete-button'>X</button></li>`
    })
    .join('')

  // Combine and return the full HTML (if there are no completed todos, don't include the separator)
  return (
    notCompletedHTML +
    (completedTodos.length ? separatorHTML + completedHTML : '')
  )
}
