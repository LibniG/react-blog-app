import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BlogPostsPage from "./pages/BlogPostsPage";
import IndividualPostPage from "./pages/IndividualPostPage";
import ContactPage from "./pages/ContactPage";
import { useTheme } from "./context/ThemeContext";

import "./App.css";

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
          path="/posts/:postId"
          element={<IndividualPostPage />}
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