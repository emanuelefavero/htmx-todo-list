import generateTodosHTML from './generateTodosHTML'

// NOTE: Run the tests with `npm test` in the terminal, do not use the vs code extension `Run|Debug` since it does not work with this project setup (esm module)

describe('generateTodosHTML', () => {
  it('should generate HTML for not completed todos', () => {
    const todos = [{ id: '1', text: 'First todo', completed: false }]

    const html = generateTodosHTML(todos)

    // Check generated HTML for not completed todos
    expect(html).toContain(
      '<li class="todo-item"><span hx-patch="/api/todos/toggle/1" hx-trigger="click" hx-target="#todos" hx-indicator="#loading">First todo</span></li>'
    )
  })

  it('should generate HTML for completed todos', () => {
    const todos = [{ id: '1', text: 'First todo', completed: true }]

    const html = generateTodosHTML(todos)

    // Check generated HTML for completed todos
    expect(html).toContain(
      '<div>--- <button hx-post="/api/todos/delete-completed" hx-trigger="click" hx-target="#todos" hx-indicator="#loading" class="delete-button separator">Delete Completed</button> ---</div><li class="todo-item completed"><span hx-patch="/api/todos/toggle/1" hx-trigger="click" hx-target="#todos">First todo</span><button hx-delete="/api/todos/1" hx-trigger="click" hx-target="#todos" hx-indicator="#loading" class=\'delete-button\'>X</button></li>'
    )
  })

  it('should generate separator HTML if there are completed todos', () => {
    const todos = [
      { id: '1', text: 'First todo', completed: false },
      { id: '2', text: 'Second todo', completed: true },
    ]

    const html = generateTodosHTML(todos)

    // Check generated separator HTML
    expect(html).toContain(
      '<li class="todo-item"><span hx-patch="/api/todos/toggle/1" hx-trigger="click" hx-target="#todos" hx-indicator="#loading">First todo</span></li><div>--- <button hx-post="/api/todos/delete-completed" hx-trigger="click" hx-target="#todos" hx-indicator="#loading" class="delete-button separator">Delete Completed</button> ---</div><li class="todo-item completed"><span hx-patch="/api/todos/toggle/2" hx-trigger="click" hx-target="#todos">Second todo</span><button hx-delete="/api/todos/2" hx-trigger="click" hx-target="#todos" hx-indicator="#loading" class=\'delete-button\'>X</button></li>'
    )
  })

  it('should return empty string if there are no todos', () => {
    const todos = []

    const html = generateTodosHTML(todos)

    // Check that an empty string is returned
    expect(html).toBe('')
  })
})
