import { useState } from "react";
import Child from "./Child.jsx";

export default function Parent() {
    const [valueInParent, setValueInParent] = useState("");

    const handleChange = (value) => {
        setValueInParent(value);
    };

    return (
        <div>
            <input
                onChange={(e) => handleChange(e.target.value)}
                placeholder={"parent input"}
            ></input>
            <p>{valueInParent}</p>
            <Child parentEvent={handleChange} />
        </div>
    );
}
