import { LitElement, css, html } from 'lit';

export class TodoInput extends LitElement {
  static properties = {
    value: { type: String },
  };

  static styles = css`
    :host {
      display: block;
    }

    form {
      display: flex;
      gap: 10px;
    }

    input {
      flex: 1;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font: inherit;
      padding: 10px 12px;
    }

    input:focus {
      border-color: #2563eb;
      outline: none;
    }

    button {
      background: #2563eb;
      border: 0;
      border-radius: 6px;
      color: white;
      cursor: pointer;
      font: inherit;
      font-weight: 600;
      padding: 10px 14px;
    }

    button:hover {
      background: #1d4ed8;
    }
  `;

  constructor() {
    super();
    this.value = '';
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <input
          .value=${this.value}
          @input=${this.handleInput}
          placeholder="Add a new task"
          aria-label="New task"
        />
        <button type="submit">Add</button>
      </form>
    `;
  }

  handleInput(event) {
    this.value = event.target.value;
  }

  handleSubmit(event) {
    event.preventDefault();
    const text = this.value.trim();
    if (!text) return;

    this.dispatchEvent(
      new CustomEvent('add-todo', {
        detail: { text },
        bubbles: true,
        composed: true,
      }),
    );

    this.value = '';
  }
}

customElements.define('todo-input', TodoInput);
