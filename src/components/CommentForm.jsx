import { useState } from "react";

function CommentForm({ onAddComment }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !comment.trim()) {
      return;
    }

    onAddComment({
      id: Date.now(),
      name: name.trim(),
      text: comment.trim(),
    });

    setName("");
    setComment("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Your Name</label>
      <input
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />

      <label htmlFor="comment">Your Comment</label>
      <textarea
        id="comment"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        required
      />

      <button type="submit">Submit Comment</button>
    </form>
  );
}

export default CommentForm;