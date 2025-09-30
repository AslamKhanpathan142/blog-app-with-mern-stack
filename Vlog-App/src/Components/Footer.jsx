
import React from 'react'
import "../styles//Footer.css"

const Footer = () => {
  return (
    <footer className="custom-footer7">
      <div className="footer-content7">
        {/* Main Footer Section */}
        <div className="footer-main7">
          <div className="footer-brand7">
            <div className="brand-logo7">
              <span className="logo-icon7">✍️</span>
              <div className="brand-text7">
                <h3>BlogsApp</h3>
                <p>Share your stories with the world</p>
              </div>
            </div>
            <p className="brand-description7">
              A platform for writers and readers to connect, share ideas, and inspire each other through the power of storytelling.
            </p>
           
          </div>

          <div className="footer-links7">
            <div className="link-column7">
              <h4>Platform</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/Api">Browse Blogs</a></li>
                <li><a href="#">Write Blog</a></li>
                <li><a href="#">Favorites</a></li>
              </ul>
            </div>

            <div className="link-column7">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Community</a></li>
              </ul>
            </div>

            <div className="link-column7">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="newsletter-section7">
          <div className="newsletter-content7">
            <div className="newsletter-text7">
              <h4>📬 Stay Updated</h4>
              <p>Get the latest blogs and writing tips delivered to your inbox</p>
            </div>
            <div className="newsletter-form7">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input7"
              />
              <button className="newsletter-btn7">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom7">
          <div className="footer-bottom-content7">
            <div className="copyright7">
              <p>© 2024 BlogsApp. All rights reserved. Made with ❤️ for writers worldwide.</p>
            </div>
            <div className="footer-bottom-links7">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="scroll-to-top7" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <span className="scroll-icon7">↑</span>
      </button>
    </footer>
  )
}

export default Footer