import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './index.css';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [finished, setFinished] = useState(true);

  useEffect(() => {
    const todostr = localStorage.getItem("todos");
    if (todostr) {
      const todos = JSON.parse(todostr);
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleFinished = () => {
    setFinished(!finished);
  };

  const handleEdit = (id) => {
    const itemToEdit = todos.find((item) => item.id === id);
    setTodo(itemToEdit.todo);
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 px-8 py-5 rounded-xl bg-violet-200 min-h-80 w-1/2">
      <h1 className="font-bold text-center text-green-600 text-lg">Manage your task using this Todo-LIST</h1>
        <div className="addTodo flex flex-col gap-2">
          <h2 className="text-lg font-bold">Add todos</h2>
          <input onChange={handleChange} value={todo} type="text" className="w-full rounded-lg p-3 " />
          <button
            onClick={handleAdd}
            className="bg-blue-800 hover:text-yellow-100 text-white px-3 py-1 rounded-md  disabled:bg-red-300"
            disabled={todo.length <= 3}
          >
            ADD
          </button>
        </div>
        <input
          onChange={toggleFinished}
          type="checkbox"
          checked={finished}
        />
        Show finished
        <h2 className="text-m font-bold">Your todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No todos to display</div>}
          {todos.map((item) => (
            (finished || !item.isCompleted) && 
              <div key={item.id} className="todo flex w-1/2 my-3 justify-between">
                <div className="flex gap-5">
                  <input
                    name={item.id}
                    type="checkbox"
                    onChange={() => handleCheckbox(item.id)}
                    checked={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-blue-800 hover:text-yellow-100 text-white px-3 py-1 rounded-md mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-blue-800 hover:text-yellow-100 text-white px-3 py-1 rounded-md mx-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
