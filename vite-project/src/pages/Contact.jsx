import { useReducer, useState, memo } from "react";

function reducer(state, action) {
    if (action.type === "incremented_age") {
        return {
            age: state.age + 1,
        };
    } else if (action.type === "change_name") {
        return {
            name: "lol",
            age: state.age,
        };
    }
    throw Error("Unknown action.");
}

export default function Contact() {
    const [state, dispatch] = useReducer(reducer, { name: "", age: 20 });

    return (
        <>
            <button
                onClick={() => {
                    dispatch({ type: "incremented_age" });
                }}
            >
                Increment age nad remove name
            </button>
            <button
                onClick={() => {
                    dispatch({ type: "change_name" });
                }}
            >
                change name to lo;=l
            </button>
            <p>
                Hello! You are {state.age}. name : {state.name}
            </p>
            <MyApp />
        </>
    );
}

function MyApp() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    return (
        <>
            <label>
                Name{": "}
                <input value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Address{": "}
                <input value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
            <Greeting name={name} />
        </>
    );
}

const Greeting = memo(function Greeting({ name }) {
    console.log("Greeting was rendered at", new Date().toLocaleTimeString());
    return (
        <h3>
            Hello{name && ", "}
            {name}!
        </h3>
    );
});
