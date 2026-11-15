import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <Link className="site-title" to="/">
        My Blog
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/posts/1">First Post</Link>
        <Link to="/contact">Contact</Link>

        <button className="theme-button" onClick={toggleTheme}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;