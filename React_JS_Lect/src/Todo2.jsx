import { useReducer, useRef, useEffect } from "react"

const initial = {
  input: "",
  todos: [],
  editIndex: null,
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, input: action.payload }

    case "ADD_TODO":
      if (!state.input.trim()) return state
      return {
        ...state,
        input: "",
        editIndex: null,
        todos: [...state.todos, { text: state.input.trim(), done: false }],
      }

    case "UPDATE_TODO": {
      if (!state.input.trim()) return state
      const updated = [...state.todos]
      updated[state.editIndex] = { ...updated[state.editIndex], text: state.input.trim() }
      return { ...state, todos: updated, input: "", editIndex: null }
    }

    case "EDIT_TODO":
      return { ...state, input: state.todos[action.payload].text, editIndex: action.payload }

    case "CANCEL_EDIT":
      return { ...state, input: "", editIndex: null }

    case "DELETE_TODO": {
      const wasEditing = state.editIndex === action.payload
      const newEditIndex = wasEditing
        ? null
        : state.editIndex !== null && state.editIndex > action.payload
        ? state.editIndex - 1
        : state.editIndex
      return {
        ...state,
        todos: state.todos.filter((_, i) => i !== action.payload),
        input: wasEditing ? "" : state.input,
        editIndex: newEditIndex,
      }
    }

    case "TOGGLE_TODO": {
      const toggled = [...state.todos]
      toggled[action.payload] = { ...toggled[action.payload], done: !toggled[action.payload].done }
      return { ...state, todos: toggled }
    }

    case "CLEAR_DONE":
      return { ...state, todos: state.todos.filter(t => !t.done), input: "", editIndex: null }

    default:
      return state
  }
}

export default function Todo() {
  const [state, dispatch] = useReducer(reducer, initial)
  const inputRef = useRef(null)
  const isEditing = state.editIndex !== null
  const total = state.todos.length
  const doneCount = state.todos.filter(t => t.done).length
  const progress = total ? Math.round((doneCount / total) * 100) : 0

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing) inputRef.current?.focus()
  }, [state.editIndex])

  function submit() {
    dispatch({ type: isEditing ? "UPDATE_TODO" : "ADD_TODO" })
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") submit()
    if (e.key === "Escape" && isEditing) dispatch({ type: "CANCEL_EDIT" })
  }

  return (
    <div className="todo-wrapper">
      <h1 className="todo-title">My Tasks</h1>
      <p className="todo-subtitle">
        {total === 0 ? "Nothing here yet" : `${doneCount} of ${total} completed`}
      </p>

      {total > 0 && (
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%`, background: progress === 100 ? "#16a34a" : "#2563eb" }}
          />
        </div>
      )}

      {/* Input */}
      <div className="input-row">
        <input
          ref={inputRef}
          value={state.input}
          onChange={e => dispatch({ type: "SET_INPUT", payload: e.target.value })}
          onKeyDown={handleKeyDown}
          placeholder={isEditing ? "Edit task…" : "Add a new task…"}
          className={isEditing ? "input editing" : "input"}
          aria-label={isEditing ? "Edit task" : "New task"}
        />
        {isEditing && (
          <button className="btn icon-btn" onClick={() => dispatch({ type: "CANCEL_EDIT" })} title="Cancel (Esc)">
            ✕
          </button>
        )}
        <button
          className="btn primary-btn"
          onClick={submit}
          disabled={!state.input.trim()}
          title={isEditing ? "Save (Enter)" : "Add (Enter)"}
        >
          {isEditing ? "Update" : "+ Add"}
        </button>
      </div>

      {/* List */}
      {total === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <span>Add your first task above</span>
        </div>
      ) : (
        <ul className="todo-list">
          {state.todos.map((todo, i) => (
            <li key={i} className={`todo-item${state.editIndex === i ? " editing-active" : ""}`}>
              <button
                className={`check-btn${todo.done ? " checked" : ""}`}
                onClick={() => dispatch({ type: "TOGGLE_TODO", payload: i })}
                aria-label={todo.done ? "Mark incomplete" : "Mark complete"}
              >
                {todo.done && "✓"}
              </button>

              <span className={`todo-text${todo.done ? " done" : ""}`}>{todo.text}</span>

              <div className="item-actions">
                <button
                  className="btn action-btn"
                  onClick={() => dispatch({ type: "EDIT_TODO", payload: i })}
                  aria-label={`Edit: ${todo.text}`}
                >
                  Edit
                </button>
                <button
                  className="btn action-btn danger"
                  onClick={() => dispatch({ type: "DELETE_TODO", payload: i })}
                  aria-label={`Delete: ${todo.text}`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Footer */}
      {total > 0 && (
        <div className="todo-footer">
          <span>{total - doneCount} task{total - doneCount !== 1 ? "s" : ""} remaining</span>
          {doneCount > 0 && (
            <button className="clear-btn" onClick={() => dispatch({ type: "CLEAR_DONE" })}>
              Clear {doneCount} completed
            </button>
          )}
        </div>
      )}

      <style>{`
        .todo-wrapper { max-width: 480px; margin: 2rem auto; padding: 0 1rem; font-family: system-ui, sans-serif; }

        .todo-title  { font-size: 22px; font-weight: 600; margin: 0; color: #111; }
        .todo-subtitle { font-size: 13px; color: #888; margin: 4px 0 12px; }

        .progress-track { height: 3px; background: #151617; border-radius: 2px; margin-bottom: 16px; overflow: hidden; }
        .progress-fill  { height: 100%; border-radius: 2px; transition: width 0.4s ease, background 0.3s ease; }

        .input-row { display: flex; gap: 8px; margin-bottom: 16px; }
        .input {
          flex: 1; padding: 9px 12px; font-size: 14px; border-radius: 8px;
          border: 1px solid #d1d5db; outline: none; transition: border-color 0.15s, box-shadow 0.15s;
        }
        .input:focus        { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
        .input.editing:focus { border-color: #d97706; box-shadow: 0 0 0 3px rgba(217,119,6,0.12); }

        .btn { padding: 9px 14px; font-size: 13px; font-weight: 500; border-radius: 8px; border: 1px solid #13376e; background: #1b0a0a; cursor: pointer; transition: background 0.12s; }
        .btn:hover:not(:disabled) { background: #1d59cf; }
        .btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .primary-btn { background: #111; color: #946c6c; border-color: #111; white-space: nowrap; }
        .primary-btn:hover:not(:disabled) { background: #374151; }
        .icon-btn { padding: 9px 11px; }

        .empty-state {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          padding: 40px 16px; color: #aaa; font-size: 14px;
          border: 1px dashed #e5e7eb; border-radius: 12px; text-align: center;
        }
        .empty-icon { font-size: 28px; opacity: 0.5; }

        .todo-list { list-style: none; padding: 0; margin: 0; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
        .todo-item {
          display: flex; align-items: center; gap: 10px; padding: 11px 14px;
          border-bottom: 1px solid #f3f4f6; background: #fff;
          transition: background 0.15s; animation: slideIn 0.18s ease;
        }
        .todo-item:last-child { border-bottom: none; }
        .todo-item:hover { background: #fafafa; }
        .todo-item:hover .item-actions { opacity: 1; }
        .todo-item.editing-active { background: #fffbeb; border-left: 3px solid #d97706; padding-left: 11px; }

        .check-btn {
          width: 20px; height: 20px; flex-shrink: 0; border-radius: 6px;
          border: 1px solid #0f0f10; background: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: bold; color: #16a34a;
          transition: background 0.15s, border-color 0.15s;
        }
        .check-btn.checked { background: #232524; border-color: #86efac; }
        .check-btn:hover { border-color: #6b7280; }

        .todo-text { flex: 1; font-size: 14px; color: #111; word-break: break-word; transition: color 0.2s; }
        .todo-text.done { text-decoration: line-through; color: #9ca3af; }

        .item-actions { display: flex; gap: 4px; opacity: 0; transition: opacity 0.15s; }
        .action-btn { padding: 4px 10px; font-size: 12px; }
        .action-btn.danger { color: #dc2626; border-color: transparent; }
        .action-btn.danger:hover { background: #9d3232; border-color: #820c0c; }

        .todo-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; font-size: 12px; color: #3f6cbb; }
        .clear-btn { background: none; border: none; cursor: pointer; font-size: 12px; color: #dc2626; font-family: inherit; padding: 0; }
        .clear-btn:hover { text-decoration: underline; }

        @keyframes slideIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}
