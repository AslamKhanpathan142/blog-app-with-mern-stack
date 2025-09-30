
import React from "react";
import "../styles/Para.css";
import Searchbar from "./Searchbar";

const Para = () => {
  

  const stats = [
    { number: "10K+", label: "Active Readers" },
    { number: "2K+", label: "Blogs Published" },
    { number: "500+", label: "Creative Writers" },
    { number: "95%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="para-container3">
      {/* Hero Section */}
      <section className="hero-section3">
        <div className="hero-background3">
          <div className="hero-overlay3"></div>
        </div>
        <div className="hero-content3">
          <div className="hero-badge3">
            <span className="badge-icon3">✨</span>A LIFESTYLE BLOG
          </div>
          <h1 className="hero-title3">
            Lovely Little <span className="highlight3">Things</span>
          </h1>
          <p className="hero-subtitle3">
            Discover inspiring stories, share your journey, and connect with a
            community of passionate writers and readers.
          </p>
          <div className="hero-actions3">
            <button className="btn-primary">
              <span className="btn-icon3">📝</span>
              Start Writing
            </button>
            <button className="btn-secondary">
              <span className="btn-icon">🔍</span>
              Explore Blogs
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section3">
          <div className="stats-container3">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item3">
                <div className="stat-number3">{stat.number}</div>
                <div className="stat-label3">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section3">
        <div className="container">
          <div className="about-content3">
            <div className="about-text3">
              <div className="section-badge3">
                <span className="badge-icon3">📖</span>
                ABOUT OUR PLATFORM
              </div>
              <h2>Your Gateway to Meaningful Storytelling</h2>
              <p>
                This blogs app is a digital platform where users can create,
                share, and manage blog posts effortlessly. It empowers
                individuals to express their ideas, stories, or expertise
                through engaging content. The app provides tools for formatting,
                adding visuals, and organizing blogs into categories or tags for
                better accessibility.
              </p>
              <p>
                With features like user authentication, responsive design, and
                comment sections, it fosters a sense of community and
                interaction among writers and readers. Whether you're a seasoned
                blogger or a beginner, a blogs app makes storytelling and
                sharing ideas seamless and enjoyable.
              </p>
              <div className="about-features3">
                <div className="feature3">
                  <span className="feature-icon3">🎨</span>
                  <span>Easy Content Creation</span>
                </div>
                <div className="feature3">
                  <span className="feature-icon">🌐</span>
                  <span>Global Community</span>
                </div>
                <div className="feature3">
                  <span className="feature-icon3">📱</span>
                  <span>Mobile Friendly</span>
                </div>
                <div className="feature3">
                  <span className="feature-icon3">🔒</span>
                  <span>Secure Platform</span>
                </div>
              </div>
              <button className="btn-outline3">
                <span className="btn-icon3">📚</span>
                Read More Stories
              </button>
            </div>
            <div className="about-visual3">
              <div className="visual-card3">
                <div className="visual-icon3">✍️</div>
                <h4>Start Your Writing Journey Today</h4>
                <p>Join thousands of writers sharing their stories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section3">
        <div className="container">
          <div className="cta-content3">
            <h2>Ready to Share Your Story?</h2>
            <p>
              Join our community of writers and start your blogging journey
              today
            </p>
            <div className="cta-actions3">
              <button className="btn-cta-primary3">
                <span className="btn-icon3">🚀</span>
                Get Started Now
              </button>
              <button className="btn-cta-secondary3">
                <span className="btn-icon3">📚</span>
                Browse Examples
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Para;
