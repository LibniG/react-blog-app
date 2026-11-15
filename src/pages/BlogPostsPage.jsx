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
    return <p>Loading blog posts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="blog-container">
      <h1>Blog Posts</h1>

      <div className="posts-grid">
        {posts.map((post) => (
          <article className="post-card" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body.substring(0, 100)}...</p>

            <Link to={`/posts/${post.id}`}>
              Read More
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default BlogPostsPage;