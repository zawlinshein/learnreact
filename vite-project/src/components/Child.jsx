import { useState } from "react";

export default function Child({ parentEvent }) {
    const [childValue, setChildValue] = useState("");

    const handleEvent = (e) => {
        console.log("changing the value in parent");
        setChildValue(e.target.value);
        parentEvent(e.target.value);
    };

    return <input onChange={handleEvent} value={childValue} placeholder={"child input"}></input>;
}
