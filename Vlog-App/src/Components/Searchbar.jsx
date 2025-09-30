
import React, { useState } from "react";
import "../styles/Searchbar.css";

function Searchbar() {
  const [search, setSearch] = useState("");
  const [showVlog, setShowVlog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    fetch(`${process.env.REACT_APP_API_URL}/api/search/${search}`)
      .then((res) => res.json())
      .then((data) => {
        setShowVlog(data);
      })
      .catch((err) => {
        console.error("Search error:", err);
        setShowVlog([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const clearSearch = () => {
    setSearch("");
    setShowVlog([]);
    setHasSearched(false);
  };

  const truncateContent = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div className="searchbar-container4">
      {/* Search Hero Section */}
      <div className="search-hero4">
        <div className="search-hero-content4">
          <div className="search-icon4">🔍</div>
          <h1 className="search-title4">Discover Amazing Blogs</h1>
          <p className="search-subtitle4">
            Search through thousands of blogs to find your next favorite read
          </p>
          
          <form onSubmit={handleSearch} className="search-form4">
            <div className="search-input-container4">
              <input
                type="text"
                className="search-input4"
                placeholder="Search for blogs, topics, or authors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="search-actions4">
                {search && (
                  <button 
                    type="button" 
                    className="clear-btn4"
                    onClick={clearSearch}
                  >
                    ✕
                  </button>
                )}
                <button 
                  type="submit" 
                  className="search-btn4"
                  disabled={!search.trim() || isLoading}
                >
                  {isLoading ? (
                    <div className="search-spinner4"></div>
                  ) : (
                    <>
                      <span className="btn-search-icon4">🚀</span>
                      Search
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Search Suggestions */}
          <div className="search-suggestions4">
            <span className="suggestions-label4">Try searching for:</span>
            <div className="suggestion-tags4">
              <button 
                className="suggestion-tag4"
                onClick={() => setSearch("technology")}
              >
                Technology
              </button>
              <button 
                className="suggestion-tag4"
                onClick={() => setSearch("travel")}
              >
                Travel
              </button>
              <button 
                className="suggestion-tag4"
                onClick={() => setSearch("food")}
              >
                Food
              </button>
              <button 
                className="suggestion-tag4"
                onClick={() => setSearch("lifestyle")}
              >
                Lifestyle
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="search-results4">
        {isLoading ? (
          <div className="loading-state4">
            <div className="loading-spinner4"></div>
            <p>Searching for blogs...</p>
          </div>
        ) : hasSearched ? (
          <>
            {/* Results Header */}
            <div className="results-header4">
              <h2 className="results-title4">
                Search Results for "<span className="search-query4">"{search}"</span>"
              </h2>
              <div className="results-stats4">
                Found {showVlog.length} blog{showVlog.length !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Results Grid */}
            {showVlog.length > 0 ? (
              <div className="results-grid4">
                {showVlog.map((vlog) => (
                  <div key={vlog._id} className="blog-result-card4">
                    <div className="card-header4">
                      <h3 className="blog-title4">{vlog.tittle || "Untitled Blog"}</h3>
                      <div className="blog-meta4">
                        <span className="read-time4">
                          📖 {Math.ceil((vlog.vlog || "").length / 200)} min read
                        </span>
                      </div>
                    </div>
                    <div className="card-body4">
                      <p className="blog-content4">
                        {truncateContent(vlog.vlog || "No content available")}
                      </p>
                    </div>
                    <div className="card-footer4">
                      <button className="read-more-btn4">
                        Read Full Story
                        <span className="arrow4">→</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state4">
                <div className="empty-icon4">🔍</div>
                <h3>No blogs found</h3>
                <p>We couldn't find any blogs matching your search. Try different keywords or browse our suggestions.</p>
                <button className="retry-btn4" onClick={clearSearch}>
                  Clear Search
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="initial-state4">
            <div className="initial-icon4">📚</div>
            <h3>Start Exploring</h3>
            <p>Enter a search term above to discover amazing blogs from our community</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Searchbar;