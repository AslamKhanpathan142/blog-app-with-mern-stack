
import React from "react";
import { useState, useEffect } from "react";
import "../styles/CreateVlog.css";

function CreateVlog() {
  const [title, setTitle] = useState("");
  const [vlog, setVlogs] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const HandleCreateVlog = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newVlogs = { title, vlog };
    const token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_API_URL}/api/createVlogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newVlogs),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Vlog created successfully!");
        setTitle('');
        setVlogs('');
      })
      .catch((err) => console.log("Error:", err))
      .finally(() => setIsSubmitting(false));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="create-vlog-container1">
      {/* Hero Section */}
      <div className="create-hero1">
        <div className="hero-content1">
          <div className="hero-icon1">✍️</div>
          <h1 className="hero-title1">Create Your Blog</h1>
          <p className="hero-subtitle1">
            Share your thoughts, stories, and experiences with the world
          </p>
          <div className="hero-quote1">
            "Your words can inspire someone today. Start writing!"
          </div>
        </div>
      </div>

      {/* Blog Form Section */}
      <div className="form-section1">
        <div className="form-container1">
          <div className="form-header1">
            <div className="form-icon1">📝</div>
            <h2>Write Your Blog</h2>
            <p>Fill in the details below to create your amazing blog post</p>
          </div>

          <form onSubmit={HandleCreateVlog} className="blog-form1">
            {/* Title Input */}
            <div className="form-group1">
              <label className="form-label1">
                <span className="label-icon1">📌</span>
                Blog Title
              </label>
              <div className="input-container1">
                <input
                  type="text"
                  className="form-input1"
                  placeholder="Give your blog an engaging title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <div className="input-focus-border1"></div>
              </div>
              <div className="input-hint1">Keep it catchy and descriptive</div>
            </div>

            {/* Content Textarea */}
            <div className="form-group1">
              <label className="form-label1">
                <span className="label-icon1">📄</span>
                Blog Content
              </label>
              <div className="textarea-container1">
                <textarea
                  className="form-textarea1"
                  placeholder="Pour your thoughts here... Share your story, ideas, or experiences..."
                  rows="8"
                  value={vlog}
                  onChange={(e) => setVlogs(e.target.value)}
                  required
                ></textarea>
                <div className="textarea-focus-border1"></div>
              </div>
              <div className="input-hint1">Minimum 100 characters recommended</div>
              <div className="character-count1">
                {vlog.length} characters
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`submit-btn1 ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner1"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <span className="btn-icon1">🚀</span>
                  Publish Blog
                </>
              )}
            </button>
          </form>

          {/* Tips Section */}
          <div className="tips-section1">
            <h3>💡 Writing Tips</h3>
            <div className="tips-grid1">
              <div className="tip-card1">
                <span className="tip-icon1">🎯</span>
                <p>Be specific with your title</p>
              </div>
              <div className="tip-card1">
                <span className="tip-icon1">✨</span>
                <p>Use clear and concise language</p>
              </div>
              <div className="tip-card1">
                <span className="tip-icon1">📖</span>
                <p>Tell a story with beginning, middle, and end</p>
              </div>
              <div className="tip-card1">
                <span className="tip-icon1">😊</span>
                <p>Write like you're talking to a friend</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateVlog;
