import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { langContext } from "../../context/lang";
import { Instance } from "../../services/instance";
import { FaStar, FaPlay, FaCalendar, FaClock } from 'react-icons/fa';
import './details.css';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useContext(langContext);
  const [movie, setMovie] = useState({});
  const [video, setVideo] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const [movieRes, similarRes] = await Promise.all([
          Instance.get(`/movie/${id}?language=${lang}`, {
            params: { append_to_response: "videos,credits,reviews" }
          }),
          Instance.get(`/movie/${id}/similar?language=${lang}`)
        ]);

        setMovie(movieRes.data);
        const trailer = movieRes.data.videos.results.find(
          (vid) => vid.type === "Trailer"
        );
        setVideo(trailer);
        setCast(movieRes.data.credits.cast.slice(0, 6));
        setSimilarMovies(similarRes.data.results.slice(0, 6));
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
    window.scrollTo(0, 0);
  }, [id, lang]);

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="movie-details">
      {/* Hero Banner */}
      <div 
        className="hero-banner" 
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="poster-container">
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title}
                className="movie-poster"
              />
            </div>
            <div className="movie-info">
              <h1>{movie.title}</h1>
              <div className="movie-meta">
                <span className="rating">
                  <FaStar /> {movie.vote_average?.toFixed(1)}
                </span>
                <span className="year">
                  <FaCalendar /> {movie.release_date?.split('-')[0]}
                </span>
                {movie.runtime && (
                  <span className="runtime">
                    <FaClock /> {formatRuntime(movie.runtime)}
                  </span>
                )}
              </div>
              <p className="tagline">{movie.tagline}</p>
              <div className="genres">
                {movie.genres?.map(genre => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="overview">{movie.overview}</p>
              {video && (
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
      {showTrailer && video && (
        <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
          <div className="trailer-content">
            <button className="close-trailer" onClick={() => setShowTrailer(false)}>×</button>
            <iframe
              src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
              title="Movie Trailer"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <div className="content-sections">
        {/* Cast Section */}
        <section className="cast-section">
          <h2>Top Cast</h2>
          <div className="cast-grid">
            {cast.map((person) => (
              <div key={person.id} className="cast-card">
                <div className="cast-image">
                  <img
                    src={person.profile_path 
                      ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                      : 'https://via.placeholder.com/200x300'
                    }
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

        {/* Similar Movies Section */}
        <section className="similar-section">
          <h2>Similar Movies</h2>
          <div className="similar-grid">
            {similarMovies.map((movie) => (
              <div 
                key={movie.id} 
                className="similar-card"
                onClick={() => navigate(`/Details/${movie.id}`)}
              >
                <div className="similar-poster">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div className="similar-overlay">
                    <span className="similar-rating">
                      <FaStar /> {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split('-')[0]}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
