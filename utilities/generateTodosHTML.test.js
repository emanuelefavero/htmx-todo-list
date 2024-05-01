import generateTodosHTML from './generateTodosHTML'

// NOTE: Run the tests with `npm run test` in the terminal, do not use the vs code extension `Run|Debug` since it does not work with this project setup (esm module)

describe('generateTodosHTML', () => {
  it('should generate HTML for not completed todos', () => {
    const todos = [{ id: '1', text: 'First todo', completed: false }]

    const html = generateTodosHTML(todos)

    // Check generated HTML for not completed todos
    expect(html).toContain(
      '<li hx-post="/api/todos/toggle/1" hx-trigger="click" hx-target="#todos" class="todo-item">First todo</li>'
    )
  })

  it('should generate HTML for completed todos', () => {
    const todos = [{ id: '1', text: 'First todo', completed: true }]

    const html = generateTodosHTML(todos)

    // Check generated HTML for completed todos
    expect(html).toContain(
      '<li hx-post="/api/todos/toggle/1" hx-trigger="click" hx-target="#todos" class="todo-item completed">First todo <button hx-post="/api/todos/delete/1" hx-trigger="click" hx-target="#todos" class=\'delete-button\'>X</button></li>'
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
      '<div>--- <button hx-post="/api/todos/delete-completed" hx-trigger="click" hx-target="#todos" class="delete-button separator">Delete Completed</button> ---</div>'
    )
  })

  it('should return empty string if there are no todos', () => {
    const todos = []

    const html = generateTodosHTML(todos)

    // Check that an empty string is returned
    expect(html).toBe('')
  })
})
