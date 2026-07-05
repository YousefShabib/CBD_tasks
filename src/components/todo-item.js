import { LitElement, css, html } from 'lit';

export class TodoItem extends LitElement {
  static properties = {
    todo: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
    }

    li {
      align-items: center;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      display: flex;
      gap: 10px;
      list-style: none;
      padding: 10px 12px;
    }

    input[type='checkbox'] {
      height: 18px;
      width: 18px;
    }

    span {
      flex: 1;
      line-height: 1.4;
      overflow-wrap: anywhere;
    }

    .completed {
      color: #64748b;
      text-decoration: line-through;
    }

    button {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      color: #334155;
      cursor: pointer;
      font: inherit;
      padding: 6px 9px;
    }

    button:hover {
      background: #fee2e2;
      border-color: #fca5a5;
      color: #991b1b;
    }
  `;

  render() {
    return html`
      <li>
        <input
          type="checkbox"
          .checked=${this.todo.completed}
          @change=${this.toggleTodo}
          aria-label="Mark task as completed"
        />
        <span class=${this.todo.completed ? 'completed' : ''}>
          ${this.todo.text}
        </span>
        <button type="button" @click=${this.deleteTodo}>Delete</button>
      </li>
    `;
  }

  toggleTodo() {
    this.dispatchEvent(
      new CustomEvent('toggle-todo', {
        detail: { id: this.todo.id },
        bubbles: true,
        composed: true,
      }),
    );
  }

  deleteTodo() {
    this.dispatchEvent(
      new CustomEvent('delete-todo', {
        detail: { id: this.todo.id },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

customElements.define('todo-item', TodoItem);
