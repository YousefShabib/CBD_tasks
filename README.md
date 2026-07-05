# CBD_tasks — Component-Based TODO List with Lit

A TODO list app built with Lit custom elements. State lives in `<todo-app>`; child components communicate through properties (down) and custom events (up).

**Repository:** https://github.com/YousefShabib/CBD_tasks

## Run locally

```bash
npm install
npm run dev
```

## Component architecture

```
<todo-app>                    ← state + add / toggle / delete
  ├── <todo-input>            ← emits add-todo
  └── <todo-list>             ← renders items
        └── <todo-item> × n   ← emits toggle-todo, delete-todo
```

| Component | Role |
|-----------|------|
| `todo-app` | Root container; holds the todos array |
| `todo-input` | Form for adding a new task |
| `todo-list` | Maps todos to `<todo-item>` elements |
| `todo-item` | One task: checkbox + text + delete button |

## Design principles

| Principle | How it is shown |
|-----------|-----------------|
| **Modularity** | Four separate files under `src/components/`, each defining one custom element |
| **Reusability** | `<todo-item>` works anywhere you pass a `todo` object and listen for its events |
| **Encapsulation** | Each component owns its template, styles, and internal logic; only properties and events are public |
| **Composition** | `<todo-app>` builds the full UI by nesting `<todo-input>` and `<todo-list>` |
| **Separation of concerns** | Input, list rendering, single-item UI, and app state are handled by different components |

## Project structure

```
src/
  main.js
  components/
    todo-app.js
    todo-input.js
    todo-list.js
    todo-item.js
```
