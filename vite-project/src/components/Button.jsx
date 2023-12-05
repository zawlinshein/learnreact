const Button = (props) => {
    return <button onClick={props.clickEvent}>{props.buttonName}</button>;
};

export const Todo = ({ todo, event: { deleteTodo, setComplete, editContent } }) => {
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
                    clickEvent={() =>
                        setComplete({ id: todo.id, title: todo.title, isCompleted: true })
                    }
                    buttonName='completed'
                />
            )}
        </li>
    );
};
