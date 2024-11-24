import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Instance } from "../../services/instance";
import { langContext } from "../../context/lang";
import { FaStar, FaPlay, FaCalendar, FaTv } from 'react-icons/fa';
import "./SeriesDetails.css";

export default function SeriesDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useContext(langContext);
  const [series, setSeries] = useState({});
  const [seasons, setSeasons] = useState([]);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        setLoading(true);
        const [detailsRes, creditsRes, videosRes] = await Promise.all([
          Instance.get(`/tv/${id}`, { 
            params: { 
              language: lang,
              append_to_response: 'videos,credits,similar'
            } 
          }),
          Instance.get(`/tv/${id}/credits`, { params: { language: lang } }),
          Instance.get(`/tv/${id}/videos`, { params: { language: lang } })
        ]);

        setSeries(detailsRes.data);
        setSeasons(detailsRes.data.seasons);
        setCast(creditsRes.data.cast.slice(0, 6));
        const trailers = videosRes.data.results.filter(
          video => video.type === "Trailer" || video.type === "Teaser"
        );
        setVideos(trailers);
        if (trailers.length > 0) setSelectedVideo(trailers[0]);
      } catch (err) {
        setError('Failed to fetch series details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesDetails();
    window.scrollTo(0, 0);
  }, [id, lang]);

  if (loading) {
    return <div className="loading-spinner"><div className="spinner"></div></div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="movie-details">
      <div 
        className="hero-banner" 
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${series.backdrop_path})`
        }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="poster-container">
              <img 
                src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} 
                alt={series.name}
                className="movie-poster"
              />
            </div>
            <div className="movie-info">
              <h1>{series.name}</h1>
              <div className="movie-meta">
                <span className="rating">
                  <FaStar /> {series.vote_average?.toFixed(1)}
                </span>
                <span className="year">
                  <FaCalendar /> {series.first_air_date?.split('-')[0]}
                </span>
                <span className="episodes">
                  <FaTv /> {series.number_of_seasons} Seasons
                </span>
              </div>
              <p className="tagline">{series.tagline}</p>
              <div className="genres">
                {series.genres?.map(genre => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="overview">{series.overview}</p>
              {selectedVideo && (
                <button 
                  className="play-trailer"
                  onClick={() => setShowTrailer(true)}
                >
                  <FaPlay /> Watch Trailer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && selectedVideo && (
        <div 
          className="trailer-modal" 
          onClick={() => setShowTrailer(false)}
        >
          <div 
            className="trailer-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="close-trailer" 
              onClick={() => setShowTrailer(false)}
              aria-label="Close trailer"
            >
              ×
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
              title="Trailer"
              allowFullScreen
              allow="autoplay"
            ></iframe>
          </div>
        </div>
      )}

      <div className="content-sections">
        {/* Cast Section */}
        <section className="cast-section">
          <h2>Featured Cast</h2>
          <div className="cast-grid">
            {cast.map(person => (
              <div key={person.id} className="cast-card">
                <div className="cast-image">
                  <img
                    src={person.profile_path 
                      ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                      : 'https://via.placeholder.com/200x300'}
                    alt={person.name}
                  />
                </div>
                <div className="cast-info">
                  <h3>{person.name}</h3>
                  <p>{person.character}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seasons Section */}
        <section className="similar-section">
          <h2>Seasons</h2>
          <div className="similar-grid">
            {seasons.map(season => (
              <div key={season.id} className="similar-card">
                <div className="similar-poster">
                  <img
                    src={season.poster_path 
                      ? `https://image.tmdb.org/t/p/w300${season.poster_path}`
                      : 'https://via.placeholder.com/300x450'}
                    alt={season.name}
                  />
                  <div className="similar-overlay">
                    <span className="similar-rating">
                      {season.episode_count} Episodes
                    </span>
                  </div>
                </div>
                <h3>{season.name}</h3>
                <p>{season.air_date?.split('-')[0]}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 