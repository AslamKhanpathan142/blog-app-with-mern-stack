
import React, { useEffect, useState } from "react";
import "../styles/Favorite.css";

function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/FavoriteVlogs`)
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to remove this blog from favorites?")) {
      return;
    }

    setDeletingId(id);
    fetch(`${import.meta.env.VITE_API_URL}/api/deleteVlog/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Deleted vlog:", data);
        // Refresh the favorites list after deletion
        fetchFavorites();
      })
      .catch((err) => {
        console.log("error", err);
        alert("Error deleting blog. Please try again.");
      })
      .finally(() => setDeletingId(null));
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="favorites-container2">
        <div className="favorites-loading2">
          <div className="loading-spinner2"></div>
          <p>Loading your favorite blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-container2">
      {/* Header Section */}
      <div className="favorites-header2">
        <div className="header-content2">
          <div className="header-icon2">❤️</div>
          <h1>Favorite Blogs</h1>
          <p>Your personal collection of inspiring stories and thoughts</p>
          <div className="favorites-stats2">
            <div className="stat-card2">
              <span className="stat-number2">{favorites.length}</span>
              <span className="stat-label2">Saved Blogs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="favorites-content2">
        {favorites.length === 0 ? (
          <div className="empty-state2">
            <div className="empty-icon2">📚</div>
            <h3>No favorite blogs yet</h3>
            <p>Start exploring and add blogs that inspire you to your favorites!</p>
            <button 
              className="explore-btn2"
              onClick={() => window.location.href = '/Api'}
            >
              <span className="btn-icon2">🔍</span>
              Explore Blogs
            </button>
          </div>
        ) : (
          <>
            <div className="favorites-grid2">
              {favorites.map((fav) => (
                <div key={fav._id} className="blog-card2">
                  <div className="card-header2">
                    <div className="card-badge2">
                      <span className="badge-icon2">❤️</span>
                      Favorite
                    </div>
                    <div className="card-actions2">
                      <button
                        className={`delete-btn2 ${deletingId === fav._id ? 'deleting' : ''}`}
                        onClick={() => handleDelete(fav._id)}
                        disabled={deletingId === fav._id}
                        title="Remove from favorites"
                      >
                        {deletingId === fav._id ? (
                          <div className="delete-spinner2"></div>
                        ) : (
                          <>
                            <span className="delete-icon2">🗑️</span>
                            Remove
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="card-body2">
                    <h3 className="blog-title2">{fav.tittle || "Untitled Blog"}</h3>
                    <p className="blog-content2">
                      {truncateText(fav.vlog || "No content available")}
                    </p>
                    
                    {fav.vlog && fav.vlog.length > 150 && (
                      <button className="read-more-btn2">
                        Read Full Story
                      </button>
                    )}
                  </div>

                  <div className="card-footer2">
                    <div className="blog-meta2">
                      <span className="meta-item2">
                        <span className="meta-icon2">📖</span>
                        {Math.ceil((fav.vlog || "").length / 200)} min read
                      </span>
                      <span className="meta-item2">
                        <span className="meta-icon2">📅</span>
                        {formatDate(fav.createdAt || new Date())}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Footer */}
            <div className="favorites-summary2">
              <div className="summary-card2">
                <div className="summary-icon2">🎉</div>
                <div className="summary-content2">
                  <h4>Great Collection!</h4>
                  <p>You have {favorites.length} favorite blog{favorites.length !== 1 ? 's' : ''} saved</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Favorite;