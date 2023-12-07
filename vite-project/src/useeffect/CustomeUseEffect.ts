import { useEffect, useState } from "react";

export default function CustomeUseEffect() {
    // url for fetch data
    const { URL, TODO } = { URL: "http://localhost:3000/", TODO: "todo" };

    // input state
    const [input, setInput] = useState("");

    // todo state
    const [todos, setTodos] = useState([]);

    // to edit the current todo
    const [editTodo, setEditTodo] = useState(null);

    const getTodos = async () => {
        try {
            const response = await fetch(`${URL}${TODO}`);
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTodos();
        return () => {
            console.log("i m being clean up", editTodo);
        };
    }, [editTodo]);

    return {
        input,
        todos,
        editTodo,
        setInput,
        setEditTodo,
        setTodos,
        URL,
        TODO,
    };
}
