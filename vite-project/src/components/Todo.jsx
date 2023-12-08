import { memo } from "react";

const Button = memo((props) => {
    console.log("button created");
    return <button onClick={props.clickEvent}>{props.buttonName}</button>;
});

export const Todo = memo(({ todo, event: { deleteTodo, setComplete, editContent } }) => {
    console.log("todo created");
    console.log(todo.id);
    return (
        <li
            style={{
                display: "flex",
                gap: "10px",
                border: `10px solid ${!todo.isCompleted ? "red" : "green"}`,
                padding: "10px",
                wordBreak: "break-all",
            }}
        >
            <span>{todo.id}</span>
            {todo.title}
            <Button buttonName='edit' clickEvent={() => editContent(todo)} />
            <Button buttonName='delete' clickEvent={() => deleteTodo(todo)} />
            {!todo.isCompleted && (
                <Button
                    clickEvent={() => setComplete({ ...todo, isCompleted: true })}
                    buttonName='completed'
                />
            )}
        </li>
    );
});
