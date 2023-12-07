import * as MyNamingSpace from "../components/Todo.jsx";

import Form from "../components/Form.jsx";
import Parent from "../components/Parent.jsx";

import CustomeUseEffect from "../useeffect/CustomeUseEffect.ts";

export default function TodoPage() {
    const CustomeUseEffect2 = CustomeUseEffect();

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
                            CustomeUseEffect2.setTodos([...CustomeUseEffect2.todos, json])
                        );
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
        CustomeUseEffect2.setInput(todo.title);
        CustomeUseEffect2.setEditTodo(todo);
    };

    return (
        <>
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
            <div>
                <ul
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
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
            </div>
        </>
    );
}
