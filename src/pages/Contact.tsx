import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact-page">
      <div className="contact-form">
        <h2>Contact Me</h2>
        <form>
          <input type="text" name="name" placeholder="Your Name" />
          <input type="email" name="email" placeholder="Your Email" />
          <textarea name="message" placeholder="Your Message"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
      <div className="contact-details">
        <p>Studio: 1234 Creative Lane, Hauz Khas, New Delhi - 110016</p>
        <p>Phone: +91 98765 43210</p>
        <p>Email: hello@aryankumar.design</p>
      </div>
    </section>
  );
};

export default Contact;