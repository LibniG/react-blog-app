function CommentList({ comments }) {
  return (
    <section>
      <h2>Comments</h2>

      {comments.map((comment) => (
        <div key={comment.id}>
          <h3>{comment.name}</h3>
          <p>{comment.text}</p>
        </div>
      ))}
    </section>
  );
}

export default CommentList;