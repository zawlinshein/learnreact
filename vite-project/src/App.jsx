import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import TodoPage from "./pages/TodoPage.jsx";

function App() {
    // i don't really know what this does yet ( call the function that responsible for getting the data and stop ??)

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path='contact' element={<Contact />} />
                        <Route path='todo' element={<TodoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
