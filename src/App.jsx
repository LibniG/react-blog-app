import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import BlogPostsPage from "./pages/BlogPostsPage";
import IndividualPostPage from "./pages/IndividualPostPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";

import { useTheme } from "./context/ThemeContext";
import { useAuth } from "./context/AuthContext";

import "./App.css";

function ProtectedRoute({ children }) {
    const { user } = useAuth();

    return user ? children : <Navigate to="/login" />;
}

function App() {
    const { theme } = useTheme();

    return (
        <div className={`app ${theme}-theme`}>
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={<BlogPostsPage />}
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/blog"
                    element={
                        <ProtectedRoute>
                            <BlogPostsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/posts/:postId"
                    element={
                        <ProtectedRoute>
                            <IndividualPostPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/contact"
                    element={<ContactPage />}
                />
            </Routes>

            <footer className="footer">
                <p>&copy; 2026 My Blog. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;