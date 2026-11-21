import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function BlogPostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch blog posts");
                }

                return response.json();
            })
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <main className="main-content">
                <p className="loading-message">
                    Loading blog posts...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="main-content">
                <p className="error-message">
                    Error: {error}
                </p>
            </main>
        );
    }

    return (
        <main className="main-content">
            <h1 className="page-heading">Blog Posts</h1>

            <div className="post-list">
                {posts.map((post) => (
                    <article className="blog-card" key={post.id}>
                        <h2>{post.title}</h2>

                        <p className="post-content">
                            {post.body.substring(0, 100)}...
                        </p>

                        <Link
                            className="read-more"
                            to={`/posts/${post.id}`}
                        >
                            Read More
                        </Link>
                    </article>
                ))}
            </div>
        </main>
    );
}

export default BlogPostsPage;