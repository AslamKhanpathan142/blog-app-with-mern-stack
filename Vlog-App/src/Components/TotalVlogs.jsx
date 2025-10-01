
import React, { useEffect, useState } from 'react';
import "../styles/TotalVlogs.css";

const TotalVlogs = () => {
  const [vlogs, setVlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoritingId, setFavoritingId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/users`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setVlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  const handleFavorite = (vlog) => {
    setFavoritingId(vlog._id);
    const favVlog = {
      tittle: vlog.tittle,
      vlog: vlog.vlog,
    };
    
    fetch(`${import.meta.env.VITE_API_URL}/api/FavoriteVlogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(favVlog),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        alert("✅ " + data.message);
      })
      .catch(err => {
        console.error("Favorite error:", err);
        alert("❌ Failed to add to favorites");
      })
      .finally(() => setFavoritingId(null));
  };

  const truncateContent = (text, maxLength = 150) => {
    if (!text) return "No content available";
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const getReadTime = (text) => {
    return Math.ceil((text || "").length / 200);
  };

  const filteredVlogs = vlogs.filter(vlog => {
    const matchesSearch = vlog.tittle?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         vlog.vlog?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const categories = [
    { id: 'all', name: 'All Blogs', icon: '📚', count: vlogs.length },
    { id: 'recent', name: 'Recently Added', icon: '🆕', count: vlogs.length },
    { id: 'popular', name: 'Most Popular', icon: '🔥', count: vlogs.length },
    { id: 'featured', name: 'Featured', icon: '⭐', count: vlogs.length }
  ];

  if (loading) {
    return (
      <div className="blogs-loading5">
        <div className="loading-spinner5"></div>
        <p>Discovering amazing blogs...</p>
      </div>
    );
  }

  return (
    <div className="blogs-explorer5">
      {/* Hero Section */}
      <section className="blogs-hero5">
        <div className="hero-background5">
          <div className="hero-overlay5"></div>
        </div>
        <div className="hero-content5">
          <div className="hero-badge5">
            <span className="badge-icon5">🌟</span>
            EXPLORE COMMUNITY BLOGS
          </div>
          <h1 className="hero-title5">Discover Amazing Stories</h1>
          <p className="hero-subtitle5">
            Dive into a world of inspiring stories, personal experiences, and creative writing from our community of passionate bloggers.
          </p>
          <div className="hero-stats5">
            <div className="stat5">
              <div className="stat-number5">{vlogs.length}</div>
              <div className="stat-label5">Blogs Published</div>
            </div>
            <div className="stat5">
              <div className="stat-number5">1.2K+</div>
              <div className="stat-label5">Active Readers</div>
            </div>
            <div className="stat5">
              <div className="stat-number5">500+</div>
              <div className="stat-label5">Writers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="blogs-filters5">
        <div className="container5">
          <div className="filters-header5">
            <h2>Browse Our Collection</h2>
            <p>Find stories that inspire and resonate with you</p>
          </div>

          {/* Search Bar */}
          <div className="search-container5">
            <div className="search-input-wrapper5">
              <span className="search-icon5">🔍</span>
              <input
                type="text"
                className="search-input5"
                placeholder="Search blogs by title or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="clear-search5"
                  onClick={() => setSearchTerm('')}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="category-filters5">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-filter5 ${filter === category.id ? 'active' : ''}`}
                onClick={() => setFilter(category.id)}
              >
                <span className="filter-icon5">{category.icon}</span>
                <span className="filter-text5">{category.name}</span>
                <span className="filter-count5">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="blogs-grid-section5">
        <div className="container5">
          {/* Results Header */}
          <div className="results-header5">
            <h3>
              {searchTerm ? (
                <>Search Results for "<span className="search-query5">"{searchTerm}"</span>"</>
              ) : (
                "Latest Community Blogs"
              )}
            </h3>
            <div className="results-count5">
              Showing {filteredVlogs.length} of {vlogs.length} blog{filteredVlogs.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Blogs Grid */}
          {filteredVlogs.length === 0 ? (
            <div className="no-results5">
              <div className="no-results-icon5">🔍</div>
              <h4>No blogs found</h4>
              <p>
                {searchTerm 
                  ? `No blogs match your search for "${searchTerm}". Try different keywords.`
                  : "No blogs available at the moment. Check back later!"
                }
              </p>
              {searchTerm && (
                <button 
                  className="clear-filters-btn5"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="blogs-grid5">
              {filteredVlogs.map((vlog) => (
                <div key={vlog._id} className="blog-card5">
                  <div className="card-header5">
                    <div className="blog-category5">
                      <span className="category-badge5">📝 Story</span>
                    </div>
                    <div className="blog-actions5">
                      <button
                        className={`favorite-btn5 ${favoritingId === vlog._id ? 'favoriting' : ''}`}
                        onClick={() => handleFavorite(vlog)}
                        disabled={favoritingId === vlog._id}
                        title="Add to favorites"
                      >
                        {favoritingId === vlog._id ? (
                          <div className="favorite-spinner5"></div>
                        ) : (
                          <>
                            <span className="heart-icon5">❤️</span>
                            Save
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="card-body5">
                    <h3 className="blog-title5">{vlog.tittle || "Untitled Blog"}</h3>
                    <p className="blog-content5">
                      {truncateContent(vlog.vlog)}
                    </p>
                    
                    {vlog.vlog && vlog.vlog.length > 150 && (
                      <button className="read-more-btn5">
                        Read Full Story
                        <span className="arrow5">→</span>
                      </button>
                    )}
                  </div>

                  <div className="card-footer5">
                    <div className="blog-meta5">
                      <div className="meta-item5">
                        <span className="meta-icon5">📖</span>
                        {getReadTime(vlog.vlog)} min read
                      </div>
                      <div className="meta-item5">
                        <span className="meta-icon5">👁️</span>
                        {Math.floor(Math.random() * 1000) + 100} views
                      </div>
                    </div>
                    <div className="author-info5">
                      <div className="author-avatar5">
                        {vlog.author?.charAt(0) || 'U'}
                      </div>
                      <div className="author-details5">
                        <div className="author-name5">{vlog.author || "Unknown Author"}</div>
                        <div className="post-date5">
                          {vlog.createdAt ? new Date(vlog.createdAt).toLocaleDateString() : "Recently"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Section */}
          {filteredVlogs.length > 0 && (
            <div className="load-more-section5">
              <p>Showing {filteredVlogs.length} of {vlogs.length} amazing stories</p>
              <button className="load-more-btn5">
                <span className="btn-icon5">📚</span>
                Load More Blogs
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
     
    </div>
  );
}

export default TotalVlogs;