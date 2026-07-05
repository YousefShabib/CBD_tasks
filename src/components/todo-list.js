import { LitElement, css, html } from 'lit';
import './todo-item.js';

export class TodoList extends LitElement {
  static properties = {
    todos: { type: Array },
  };

  static styles = css`
    :host {
      display: block;
    }

    ul {
      display: grid;
      gap: 8px;
      margin: 0;
      padding: 0;
    }

    .empty {
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 6px;
      color: #64748b;
      margin: 0;
      padding: 18px;
      text-align: center;
    }
  `;

  constructor() {
    super();
    this.todos = [];
  }

  render() {
    if (this.todos.length === 0) {
      return html`<p class="empty">No tasks yet. Add one above.</p>`;
    }

    return html`
      <ul>
        ${this.todos.map(
          (todo) => html`
            <todo-item
              .todo=${todo}
              @toggle-todo=${this.forwardEvent}
              @delete-todo=${this.forwardEvent}
            ></todo-item>
          `,
        )}
      </ul>
    `;
  }

  forwardEvent(event) {
    this.dispatchEvent(
      new CustomEvent(event.type, {
        detail: event.detail,
        bubbles: true,
        composed: true,
      }),
    );
  }
}

customElements.define('todo-list', TodoList);
