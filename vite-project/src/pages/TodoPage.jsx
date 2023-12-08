import * as MyNamingSpace from "../components/Todo.jsx";

import Form from "../components/Form.jsx";
import Parent from "../components/Parent.jsx";

import CustomeUseEffect from "../useeffect/CustomeUseEffect.ts";
import { createContext, useRef, useState } from "react";
import { flushSync } from "react-dom";

export const ThemeContext = createContext(null);

export default function TodoPage() {
    const CustomeUseEffect2 = CustomeUseEffect();

    const [theme, setTheme] = useState("white");

    const todoRef = useRef(null);

    const testRef = useRef(0);

    let normalVariable = 1;

    console.log(normalVariable);
    console.log(testRef);

    const handleCLick = () => {
        normalVariable++;
        testRef.current++;
        console.log(normalVariable);
        console.log(testRef);
    };

    // responsibe for submitting the input value or updating the curren todo
    const submit = (e, todo) => {
        e.preventDefault();

        let newTodo;

        if (!todo) {
            if (CustomeUseEffect2.input.length >= 1) {
                newTodo = {
                    title: CustomeUseEffect2.input,
                    isCompleted: false,
                };
                try {
                    fetch(CustomeUseEffect2.URL + CustomeUseEffect2.TODO, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newTodo),
                    })
                        .then((response) => response.json())
                        .then((json) =>
                            flushSync(() => {
                                CustomeUseEffect2.setTodos([...CustomeUseEffect2.todos, json]);
                            })
                        );
                    console.log(todoRef.current);
                    todoRef.current.lastChild.scrollIntoView({
                        behavior: "smooth",
                    });
                    CustomeUseEffect2.setInput("");
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            newTodo = todo;
            if (CustomeUseEffect2.input.length >= 1) {
                edit(newTodo);
            }
            CustomeUseEffect2.setEditTodo(null);
            CustomeUseEffect2.setInput("");
        }
    };

    // fetch the data

    // delete todo
    const deleteTodo = async (todo) => {
        try {
            fetch(`${CustomeUseEffect2.URL}${CustomeUseEffect2.TODO}/${todo.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(() => {
                CustomeUseEffect2.setEditTodo(null);
                CustomeUseEffect2.setTodos(CustomeUseEffect2.todos.filter((t) => todo.id != t.id));
            });
        } catch (error) {
            console.log(error);
        }
    };

    // update todo
    const edit = (todo) => {
        try {
            fetch(`${CustomeUseEffect2.URL}${CustomeUseEffect2.TODO}/${todo.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(todo),
            });
            CustomeUseEffect2.setTodos((prevTodos) => {
                return prevTodos.map((currTodo) => {
                    return currTodo.id === todo.id ? todo : currTodo;
                });
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
        CustomeUseEffect2.setInput(todo.title);
        CustomeUseEffect2.setEditTodo(todo);
    };

    return (
        <>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                <Form
                    submit={(e) => submit(e, CustomeUseEffect2.editTodo)}
                    change={(e) => {
                        const value = e.target.value;
                        if (CustomeUseEffect2.editTodo) {
                            CustomeUseEffect2.setEditTodo({
                                ...CustomeUseEffect2.editTodo,
                                title: value,
                            });
                            CustomeUseEffect2.setInput(value);
                        } else {
                            CustomeUseEffect2.setInput(value);
                        }
                    }}
                    value={CustomeUseEffect2.input}
                />
            </ThemeContext.Provider>
            <div>
                <ul
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                    ref={todoRef}
                >
                    {CustomeUseEffect2.todos.map((todo) => {
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
                <Parent />
                <button onClick={handleCLick}>Click</button>
            </div>
        </>
    );
}
