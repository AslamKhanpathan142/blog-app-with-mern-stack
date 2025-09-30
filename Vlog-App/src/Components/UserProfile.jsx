
import React, { useEffect, useState } from "react";
import "../styles/UserProfile.css";
import Favorite from '../Components/Favorite'

function UserProfile() {
  const [myVlogs, setMyVlogs] = useState([]);
  const [user, setUser] = useState({ name: "", email: "" });
  const [activeTab, setActiveTab] = useState("blogs");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    Promise.all([
      fetch("http://localhost:8000/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res => res.json()),
      
      fetch("http://localhost:8000/api/myVlogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res => res.json())
    ])
    .then(([userData, vlogsData]) => {
      setUser(userData);
      setMyVlogs(vlogsData);
    })
    .catch((err) => console.error("Error:", err))
    .finally(() => setLoading(false));
  }, []);

  const handleEditProfile = () => {
    // Add edit profile functionality
    alert("Edit profile feature coming soon!");
  };

  const handleDeleteBlog = (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:8000/api/deleteVlog/${blogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => res.json())
      .then(() => {
        setMyVlogs(myVlogs.filter(blog => blog._id !== blogId));
      })
      .catch(err => console.error("Error deleting blog:", err));
    }
  };

  const truncateContent = (text, maxLength = 120) => {
    if (!text) return "No content available";
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  };

  const stats = {
    totalBlogs: myVlogs.length,
    totalWords: myVlogs.reduce((acc, blog) => acc + (blog.vlog ? blog.vlog.split(' ').length : 0), 0),
    avgReadTime: myVlogs.length > 0 ? Math.ceil(myVlogs.reduce((acc, blog) => acc + (blog.vlog ? blog.vlog.length : 0), 0) / myVlogs.length / 200) : 0
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-background">
          <div className="background-overlay"></div>
        </div>
        <div className="profile-content">
          <div className="avatar-section">
            <div className="user-avatar">
              <span className="avatar-initials">{getInitials(user.name)}</span>
            </div>
            <div className="user-info">
              <h1 className="user-name">{user.name || "User"}</h1>
              <p className="user-email">{user.email}</p>
              <p className="user-bio">Blogger & Storyteller</p>
            </div>
          </div>
          <button className="edit-profile-btn" onClick={handleEditProfile}>
            <span className="btn-icon">✏️</span>
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <div className="stat-number">{stats.totalBlogs}</div>
              <div className="stat-label">Total Blogs</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📖</div>
            <div className="stat-content">
              <div className="stat-number">{stats.totalWords}</div>
              <div className="stat-label">Words Written</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <div className="stat-number">{stats.avgReadTime}</div>
              <div className="stat-label">Avg. Read Time (min)</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-number">1.2K</div>
              <div className="stat-label">Readers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="profile-tabs">
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === "blogs" ? "active" : ""}`}
            onClick={() => setActiveTab("blogs")}
          >
            <span className="tab-icon">📚</span>
            My Blogs
          </button>
          <button 
            className={`tab-btn ${activeTab === "favorites" ? "active" : ""}`}
            onClick={() => setActiveTab("favorites")}
          >
            <span className="tab-icon">❤️</span>
            Favorites
          </button>
          <button 
            className={`tab-btn ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <span className="tab-icon">⚙️</span>
            Settings
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="profile-content-section">
        {activeTab === "blogs" && (
          <div className="blogs-section">
            <div className="section-header">
              <h2>Your Published Blogs</h2>
              <p>Manage and view all your published stories</p>
            </div>

            {myVlogs.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>No Blogs Yet</h3>
                <p>Start your writing journey by creating your first blog post!</p>
                <button 
                  className="create-first-btn"
                  onClick={() => window.location.href = '/Create'}
                >
                  <span className="btn-icon">✍️</span>
                  Write Your First Blog
                </button>
              </div>
            ) : (
              <div className="blogs-grid">
                {myVlogs.map((vlog) => (
                  <div key={vlog._id} className="blog-card">
                    <div className="card-header">
                      <h3 className="blog-title">{vlog.tittle || "Untitled Blog"}</h3>
                      <div className="blog-actions">
                        <button 
                          className="action-btn edit-btn"
                          title="Edit Blog"
                        >
                          ✏️
                        </button>
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteBlog(vlog._id)}
                          title="Delete Blog"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="blog-content">
                        {truncateContent(vlog.vlog)}
                      </p>
                    </div>
                    <div className="card-footer">
                      <div className="blog-meta">
                        <span className="meta-item">
                          <span className="meta-icon">📅</span>
                          {vlog.createdAt ? new Date(vlog.createdAt).toLocaleDateString() : "Recent"}
                        </span>
                        <span className="meta-item">
                          <span className="meta-icon">📖</span>
                          {Math.ceil((vlog.vlog || "").length / 200)} min read
                        </span>
                      </div>
                      <button className="read-more-btn">
                        Read Full Story
                        <span className="arrow">→</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "favorites" && <Favorite />}

        {activeTab === "settings" && (
          <div className="settings-section">
            <div className="section-header">
              <h2>Account Settings</h2>
              <p>Manage your account preferences and security</p>
            </div>
            <div className="settings-grid">
              <div className="setting-card">
                <div className="setting-icon">👤</div>
                <div className="setting-content">
                  <h4>Profile Information</h4>
                  <p>Update your name, email, and bio</p>
                </div>
                <button className="setting-action">Edit</button>
              </div>
              <div className="setting-card">
                <div className="setting-icon">🔒</div>
                <div className="setting-content">
                  <h4>Security</h4>
                  <p>Change your password and security settings</p>
                </div>
                <button className="setting-action">Manage</button>
              </div>
              <div className="setting-card">
                <div className="setting-icon">🔔</div>
                <div className="setting-content">
                  <h4>Notifications</h4>
                  <p>Control your email and push notifications</p>
                </div>
                <button className="setting-action">Configure</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;