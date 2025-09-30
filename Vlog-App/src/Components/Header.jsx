
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../styles/header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Navbar expand="lg" className="custom-navbar6" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo6">
          <div className="logo-container6">
            <span className="logo-icon6">✍️</span>
            <div className="logo-text6">
              <span className="logo-main6">BlogsApp</span>
              <span className="logo-sub6">Write Your Story</span>
            </div>
          </div>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav6" className="navbar-toggle6" />
        
        <Navbar.Collapse id="navbar-nav6">
          <Nav className="main-nav6">
            <Nav.Link as={Link} to="/" className="nav-item6">
              <span className="nav-icon6">🏠</span>
              <span className="nav-text6">Home</span>
            </Nav.Link>
            
            <Nav.Link as={Link} to="/Api" className="nav-item6">
              <span className="nav-icon6">📝</span>
              <span className="nav-text6">Blogs</span>
            </Nav.Link>
            
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/Create" className="nav-item6">
                  <span className="nav-icon6">✏️</span>
                  <span className="nav-text6" >Create Blog</span>
                </Nav.Link>
                
              
                
                <Nav.Link as={Link} to="/profile" className="nav-item6">
                  <span className="nav-icon6">👤</span>
                  <span className="nav-text6">Profile</span>
                </Nav.Link>
              </>
            )}
          </Nav>

          <div className="auth-section6">
            {!isLoggedIn ? (
              <div className="auth-buttons6">
                <Link to="/login" className="btn-login6">
                  <span className="btn-icon6">🔑</span>
                  Login
                </Link>
                <Link to="/signup" className="btn-signup6">
                  <span className="btn-icon6">📄</span>
                  Sign Up
                </Link>
              </div>
            ) : (
              <button className="btn-logout6" onClick={handleLogout}>
                <span className="btn-icon6">🚪</span>
                Logout
              </button>
            )}
          </div>

          <div className="social-section6">
            <div className="social-icons6">
              <a href="#" className="social-link6" aria-label="Twitter">
                <span className="social-icon">🐦</span>
              </a>
              <a href="#" className="social-link6" aria-label="Facebook">
                <span className="social-icon">👍</span>
              </a>
              <a href="#" className="social-link6" aria-label="Instagram">
                <span className="social-icon6">📸</span>
              </a>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;