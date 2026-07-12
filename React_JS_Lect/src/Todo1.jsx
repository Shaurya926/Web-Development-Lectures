import React, { useEffect, useState } from 'react';

const Todo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(() => {
    const data = localStorage.getItem("key");
    return data ? JSON.parse(data) : [];
  });
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    localStorage.setItem("key", JSON.stringify(todos));
  }, [todos]);

  function deleteTodo(id) {
    setTodos(todos.filter((_, index) => index !== id));
  }

  function startEdit(id) {
    setEditId(id);              // mark which item is in edit mode
    setEditValue(todos[id]);    // pre-fill input with current text
  }

  function saveEdit(id) {
    const updated = todos.map((item, index) =>
      index === id ? editValue : item   // replace only the edited item
    );
    setTodos(updated);
    setEditId(null);       // exit edit mode
    setEditValue("");
  }

  return (
    <div className='Main'>
      <h1>Todo List</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter a task'
      />
      <button onClick={() => { setTodos([...todos, input]); setInput(""); }}>
        Add
      </button>

      {todos.map((todo, id) => (
        <div className='F' key={id}>
          {editId === id ? (
            // ✅ Edit mode: show input + save button
            <>
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <button onClick={() => saveEdit(id)}>Save</button>
            </>
          ) : (
            // ✅ Normal mode: show text + action buttons
            <>
              <h3>{todo}</h3>
              <div className='field'>
                <button onClick={() => deleteTodo(id)}>Delete</button>
                <button onClick={() => startEdit(id)}>Edit</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Todo;