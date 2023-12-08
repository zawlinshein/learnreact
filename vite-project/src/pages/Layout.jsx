import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/contact'>Content</Link>
                    </li>
                    <li>
                        <Link to='/todo'>Todo</Link>
                    </li>
                    <li>
                        <Link to='/cat'>Cat</Link>
                    </li>
                    <li>
                        <Link to='/tic-tac-toe'>Tic-tac-toe</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    );
};

export default Layout;
