import { useState } from "react";

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <main className="main-content">
      <section className="blog-card contact-card">
        <h1>Contact Us</h1>
        <p>Have a question? Send us a message.</p>

        <form className="comment-form" onSubmit={handleSubmit}>
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" required />

          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
          />

          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            rows="5"
            required
          />

          <button type="submit">Send Message</button>
        </form>

        {submitted && (
          <p className="success-message">
            Your message has been submitted for this demonstration.
          </p>
        )}
      </section>
    </main>
  );
}

export default ContactPage;