import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>About ShreeHaven</h2>
          <p>Your go-to destination for trendy and affordable fashion.</p>
        </div>
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>Email: info@shreehaven.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h2>Follow Us</h2>
          <p>Stay connected on social media for updates and promotions.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{'&copy; '}2024 ShreeHaven. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
