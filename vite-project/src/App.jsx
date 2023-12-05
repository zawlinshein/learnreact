import { useEffect, useState } from "react";

import * as MyNamingSpace from "./components/Button.jsx";

function App() {
    // url for fetch data
    const { URL, TODO } = { URL: "http://localhost:3000/", TODO: "todo" };

    // input state
    const [input, setInput] = useState("");

    // todo state
    const [todos, setTodos] = useState([]);

    // to edit the current todo
    const [editTodo, setEditTodo] = useState(null);

    // responsibe for submitting the input value or updating the curren todo
    const submit = (e, todo) => {
        e.preventDefault();

        let newTodo;

        if (!todo) {
            console.log(todo);
            if (input.length >= 1) {
                newTodo = {
                    title: input,
                    isCompleted: false,
                };
                try {
                    fetch(URL + TODO, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newTodo),
                    })
                        .then((response) => response.json())
                        .then((json) => setTodos([...todos, json]));
                    setInput("");
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            newTodo = todo;
            console.log(todo);
            edit(newTodo);
            setEditTodo(null);
            setInput("");
        }
    };

    // fetch the data
    const getTodos = async () => {
        try {
            const response = await fetch(`${URL}${TODO}`);
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.log(error);
        }
    };

    // delete todo
    const deleteTodo = async (todo) => {
        try {
            fetch(`${URL}${TODO}/${todo.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setTodos(todos.filter((t) => todo.id != t.id));
        } catch (error) {
            console.log(error);
        }
    };

    // update todo
    const edit = (todo) => {
        try {
            fetch(`${URL}${TODO}/${todo.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(todo),
            });
            setTodos((prevTodos) => {
                const newTodos = [...prevTodos];
                const index = newTodos.findIndex((t) => t.id === todo.id);
                if (index !== -1) {
                    newTodos[index] = todo;
                }
                return newTodos;
            });
        } catch (error) {
            console.log(error);
        }
    };

    // change status for todo
    const setComplete = (todo) => {
        edit(todo);
    };

    // edit todo
    const editContent = (todo) => {
        console.log(todo);
        setInput(todo.title);
        setEditTodo(todo);
        console.log(todo);
    };

    // i don't really know what this does yet
    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div>
            <form onSubmit={(e) => submit(e, editTodo)}>
                <input
                    type='text'
                    onChange={(e) => {
                        const value = e.target.value;
                        if (editTodo) {
                            setEditTodo({ ...editTodo, title: value });
                            setInput(value);
                        } else {
                            setInput(value);
                        }
                    }}
                    value={input}
                />
                <input type='submit' />
            </form>
            <div>
                <ul
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    {todos.map((todo) => {
                        return (
                            <MyNamingSpace.Todo
                                key={todo.id}
                                todo={todo}
                                // pass all function as object to child Components
                                event={{ deleteTodo, setComplete, editContent }}
                            />
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default App;
