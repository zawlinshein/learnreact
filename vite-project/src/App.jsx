import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import TodoPage from "./pages/TodoPage.jsx";
import Cat from "./pages/Cat.jsx";
import Game from "./pages/TicTacToe.jsx";
import MusicPlyer from "./pages/MusicContainer.tsx";

function App() {
    // i don't really know what this does yet ( call the function that responsible for getting the data and stop ??)

    return (
        <div
            style={{
                paddingTop: "40px",
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path='contact' element={<Contact />} />
                        <Route path='todo' element={<TodoPage />} />
                        <Route path='cat' element={<Cat />} />
                        <Route path='tic-tac-toe' element={<Game />} />
                        <Route path='music-player' element={<MusicPlyer />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
