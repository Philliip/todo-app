import './App.css';
import {useState} from "react";

function App() {
    // state hook, to track states of the components
    // have current state todos/input and function that updates the state
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    const addTodo = () => {
        if (input.trim()) {
            setTodos([...todos, {id: Date.now(), text: input, completed: false}])
            setInput("")
        }
    }

    return (
        <div className="body">
            <div className="todo">
                <h2>React TODO List</h2>
                <div className='input'>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        className="input-field"
                        id="todoInput"
                        placeholder="Add a new task"
                    />
                    <button onClick={addTodo} className="btn">Add</button>
                </div>
                <ul className="space-y-2">
                    {
                        todos.map((todo) => (
                            <li
                            key={todo.id}
                            className="flex items-center p-3 rounded-lg bg-slate-100 border border-gray-200"
                            >
                                <input type="checkbox"
                                checked={todo.completed}
                                onChange={() => setTodos(
                                   todos.map((t) => (
                                           t.id === todo.id ? {...t, completed: !t.completed} : t
                                   ))
                                       )}
                                className={'mr-2 h-5 w-5 text-blue-600'}
                                />
                                <span className={`flex-grow ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                                    {todo.text}
                                </span>
                                <button
                                    className="ml-2 border-none p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                                    onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))
                                }>Delete</button>
                            </li>
                        ))
                    }

                </ul>

            </div>


        </div>
    );
}

export default App;
