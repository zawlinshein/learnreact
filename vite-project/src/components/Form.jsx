import React, { useContext } from "react";
import { ThemeContext } from "../pages/TodoPage.jsx";

export default function Form({ submit, change, value }) {
    return (
        <ThemeContext.Consumer>
            {({ theme, setTheme }) => {
                console.log(theme, setTheme);
                return (
                    <form onSubmit={submit}>
                        <input type='text' onChange={change} value={value} />
                        <input type='submit' />
                        <Text theme={theme} change={setTheme} />
                    </form>
                );
            }}
        </ThemeContext.Consumer>
    );
}

function Text({ theme, change }) {
    console.log(theme);
    return (
        <button
            style={{
                cursor: "pointer",
            }}
            onClick={() => change(theme === "white" ? "dark" : "white")}
        >
            {theme}
        </button>
    );
}
