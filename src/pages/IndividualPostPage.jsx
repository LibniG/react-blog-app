import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

function IndividualPostPage() {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch post, author, and comments
  useEffect(() => {
    async function fetchPostData() {
      setLoading(true);
      setError("");

      try {
        // Get individual post
        const postResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );

        if (!postResponse.ok) {
          throw new Error("Post not found.");
        }

        const postData = await postResponse.json();
        setPost(postData);

        // Get author information
        const userResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${postData.userId}`
        );

        if (!userResponse.ok) {
          throw new Error("Could not load author information.");
        }

        const userData = await userResponse.json();
        setUser(userData);

        // Get comments
        const commentsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );

        if (!commentsResponse.ok) {
          throw new Error("Could not load comments.");
        }

        const commentsData = await commentsResponse.json();

        // Match the comment format used by your existing CommentList
        setComments(
          commentsData.map((comment) => ({
            id: comment.id,
            name: comment.name,
            text: comment.body,
          }))
        );

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPostData();
  }, [postId]);

  // Add a comment using POST
  async function handleAddComment(comment) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: Number(postId),
            name: comment.name,
            body: comment.text,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit comment.");
      }

      const newComment = await response.json();

      setComments((previousComments) => [
        ...previousComments,
        {
          id: newComment.id,
          name: newComment.name,
          text: newComment.body,
        },
      ]);

    } catch (err) {
      console.error("Error posting comment:", err);
      alert("Unable to post your comment. Please try again.");
    }
  }

  if (loading) {
    return (
      <main className="main-content">
        <p>Loading post...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="main-content">
        <h2>{error}</h2>
        <Link to="/">Return to Home</Link>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="main-content">
        <h2>Post not found</h2>
        <Link to="/">Return to Home</Link>
      </main>
    );
  }

  return (
    <main className="main-content">
      <article className="blog-card">
        <h1>{post.title}</h1>

        <p className="post-meta">
          <strong>Author:</strong> {user?.name}
        </p>

        <p className="post-meta">
          <strong>Email:</strong> {user?.email}
        </p>

        <p className="full-content">{post.body}</p>

        <section className="comments-section">

          {comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            <CommentList comments={comments} />
          )}

          <CommentForm onAddComment={handleAddComment} />
        </section>
      </article>
    </main>
  );
}

export default IndividualPostPage;