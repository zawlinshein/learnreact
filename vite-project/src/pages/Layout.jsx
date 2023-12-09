import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav
                style={{
                    position: "fixed",
                    top: "0px",
                    left: "0",
                    width: "100vw",
                    zIndex: 99999,
                }}
            >
                <ul
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                        backgroundColor: "black",
                        padding: "29px",
                        margin: "0px",
                        color: "white",
                    }}
                >
                    <li>
                        <Link to='/' style={{ color: "white" }}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to='/contact' style={{ color: "white" }}>
                            Content
                        </Link>
                    </li>
                    <li>
                        <Link to='/todo' style={{ color: "white" }}>
                            Todo
                        </Link>
                    </li>
                    <li>
                        <Link to='/cat' style={{ color: "white" }}>
                            Cat
                        </Link>
                    </li>
                    <li>
                        <Link to='/tic-tac-toe' style={{ color: "white" }}>
                            Tic-tac-toe
                        </Link>
                    </li>
                    <li>
                        <Link to='/music-player' style={{ color: "white" }}>
                            Music Player
                        </Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    );
};

export default Layout;
