import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();

    return (
        <header className="header">
            <Link to="/" className="site-title">
                My Blog
            </Link>

            <nav>
                <Link to="/">Home</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/contact">Contact</Link>

                {user ? (
                    <>
                        <span>Welcome, {user.username}!</span>
                        <button onClick={logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </nav>
        </header>
    );
}

export default Navbar;