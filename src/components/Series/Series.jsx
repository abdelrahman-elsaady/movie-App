import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { FaStar, FaPlay, FaHeart, FaRegHeart } from 'react-icons/fa';
import { Instance } from '../../services/instance';
import { langContext } from '../../context/lang';
import { AddSeries, RemoveSeries } from '../Store/Slices/Favourite';
import './Series.css';

export default function Series() {
  const { lang } = useContext(langContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { SeriesFavourite } = useSelector((state) => state.fave);
  
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setQuery] = useState('');

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoading(true);
        const endpoint = search.trim() 
          ? `/search/tv?language=${lang}&query=${search}&page=${pageNumber}`
          : `/tv/popular?language=${lang}&page=${pageNumber}`;
        
        const response = await Instance.get(endpoint);
        setSeries(response.data.results);
        console.log(response.data.results);
      } catch (err) {
        setError('Failed to fetch series');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [search, pageNumber, lang]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="movies-container">
      <div className="search-section">
        <input
          type="text"
          placeholder="Search TV Series..."
          className="search-input"
          onChange={(e) => {
            setQuery(e.target.value);
            setPageNumber(1);
          }}
        />
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="movies-grid">
            {series.map((show) => (
              <div key={show.id} className="movie-card">
                <div className="poster-container">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.name}
                    className="movie-poster"
                  />
                  <div className="poster-overlay">
                    <div className="overlay-buttons">
                      <button 
                        className="play-button"
                        onClick={() => navigate(`/series/${show.id}`)}
                      >
                        <FaPlay />
                      </button>
                      <button 
                        className="favorite-button"
                        onClick={() => {
                          const isFavorite = SeriesFavourite.findIndex(fav => fav.id === show.id) >= 0;
                          dispatch(isFavorite ? RemoveSeries(show) : AddSeries(show));
                        }}
                      >
                        {SeriesFavourite.findIndex(fav => fav.id === show.id) >= 0 ? 
                          <FaHeart className="heart-filled" /> : 
                          <FaRegHeart />
                        }
                      </button>
                    </div>
                  </div>
                </div>
                <div className="movie-info">
                  <div className="movie-header">
                    <h3>{show.name}</h3>
                    <span className="rating">
                      <FaStar className="star-icon" />
                      {show.vote_average.toFixed(1)}
                    </span>
                  </div>
                  <div className="movie-meta">
                    <span className="release-date">
                      {show.first_air_date?.split('-')[0]}
                    </span>
                    <span className="language">
                      {show.original_language.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              className="pagination-button"
              onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
              disabled={pageNumber === 1}
            >
              Previous
            </button>
            <span className="page-number">Page {pageNumber}</span>
            <button
              className="pagination-button"
              onClick={() => setPageNumber(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
} 