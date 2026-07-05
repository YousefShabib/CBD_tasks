import { LitElement, css, html } from 'lit';
import './todo-input.js';
import './todo-list.js';

export class TodoApp extends LitElement {
  static properties = {
    todos: { type: Array },
  };

  static styles = css`
    :host {
      color: #1e293b;
      display: block;
      font-family:
        Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
        'Segoe UI', sans-serif;
      min-height: 100vh;
    }

    * {
      box-sizing: border-box;
    }

    main {
      margin: 0 auto;
      max-width: 620px;
      padding: 48px 18px;
    }

    section {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
      padding: 24px;
    }

    h1 {
      font-size: 28px;
      margin: 0 0 6px;
    }

    .subtitle {
      color: #64748b;
      margin: 0 0 22px;
    }

    todo-input {
      margin-bottom: 18px;
    }

    .summary {
      color: #475569;
      font-size: 14px;
      margin: 18px 0 0;
    }
  `;

  constructor() {
    super();
    this.todos = [
      { id: 1, text: 'Finish Lit TODO assignment', completed: false },
      { id: 2, text: 'Write the README explanation', completed: true },
    ];
  }

  render() {
    const completedCount = this.todos.filter((todo) => todo.completed).length;

    return html`
      <main>
        <section>
          <h1>TODO List</h1>
          <p class="subtitle">A component-based app built with Lit.</p>

          <todo-input @add-todo=${this.addTodo}></todo-input>
          <todo-list
            .todos=${this.todos}
            @toggle-todo=${this.toggleTodo}
            @delete-todo=${this.deleteTodo}
          ></todo-list>

          <p class="summary">
            ${completedCount} of ${this.todos.length} tasks completed
          </p>
        </section>
      </main>
    `;
  }

  addTodo(event) {
    const text = event.detail.text.trim();
    if (!text) return;

    this.todos = [
      ...this.todos,
      { id: Date.now(), text, completed: false },
    ];
  }

  toggleTodo(event) {
    const { id } = event.detail;
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
  }

  deleteTodo(event) {
    const { id } = event.detail;
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}

customElements.define('todo-app', TodoApp);
