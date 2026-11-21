import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            setError("Please enter your username and password.");
            return;
        }

        const success = login(username.trim(), password);

        if (success) {
            navigate("/blog");
        } else {
            setError("Invalid login information.");
        }
    };

    return (
        <main className="main-content">
            <section className="blog-card login-card">
                <h1>Welcome Back!</h1>
                <p>Log in to access your blog.</p>

                <form className="login-form" onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit">Login</button>
                </form>

                <p>
                    Don't have an account? You can use a username
                    and password to enter this demo application.
                </p>

                <Link to="/">Back to Home</Link>
            </section>
        </main>
    );
}

export default LoginPage;