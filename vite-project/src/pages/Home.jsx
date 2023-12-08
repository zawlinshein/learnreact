import React, { useRef, memo, useState } from "react";

export default function Home() {
    // Create a ref using the useRef hook
    const inputRef = useRef(null);

    const [name, setName] = useState("");

    const [age, setAge] = useState(0);

    // Your function to handle count or other logic
    const handleCount = () => {
        console.log(inputRef.current.value);
    };

    return (
        <>
            <h1>Home</h1>
            {/* Attach the ref to the input element */}
            <input type='text' ref={inputRef} onChange={(e) => setName(e.target.value)} />
            <input type='number' ref={inputRef} onChange={(e) => setAge(e.target.value)} />
            {/* Call the handleCount function on button click */}
            <button onClick={handleCount}>Click me</button>
            <Greeting name={name} />
            <Age age={age} />
        </>
    );
}

const Greeting = memo(function Greeting({ name }) {
    console.log("name");
    return <h1>Hello, {name}!</h1>;
});

const Age = memo(function Age({ age }) {
    console.log("age");
    return <h1>Hello, {age}!</h1>;
});
