import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { FaStar, FaPlay, FaHeart, FaRegHeart } from 'react-icons/fa';
import { AddMovie, RemoveMovie } from '../Store/Slices/Favourite';
import { movieAction } from '../Store/Slices/movies';
import { langContext } from '../../context/lang';
import './home.css';

export default function Home() {
  const { lang } = useContext(langContext);
  const { Favourite } = useSelector((state) => state.fave);
  const { moviesData: Movies, loading } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setQuery] = useState('');

  useEffect(() => {
    dispatch(movieAction({ search, pageNumber, lang }));
  }, [search, pageNumber, lang]);

  return (
    <>
      <div className='container-fluied'>
    <div className="movies-container">
      {/* Search Section */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search for movies..."
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
            {Movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <div className="poster-container">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                  />
                  <div className="poster-overlay">
                    <div className="overlay-buttons">
                      <button 
                        className="play-button"
                        onClick={() => navigate(`/Details/${movie.id}`)}
                      >
                        <FaPlay />
                      </button>
                      <button 
                        className="favorite-button"
                        onClick={() => {
                          const isFavorite = Favourite.findIndex(fav => fav.id === movie.id) >= 0;
                          dispatch(isFavorite ? RemoveMovie(movie) : AddMovie(movie));
                        }}
                      >
                        {Favourite.findIndex(fav => fav.id === movie.id) >= 0 ? 
                          <FaHeart className="heart-filled" /> : 
                          <FaRegHeart />
                        }
                      </button>
                    </div>
                  </div>
                </div>
                <div className="movie-info">
                  <div className="movie-header">
                    <h3>{movie.title}</h3>
                    <span className="rating">
                      <FaStar className="star-icon" />
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                  <div className="movie-meta">
                    <span className="release-date">
                      {movie.release_date?.split('-')[0]}
                    </span>
                    <span className="language">
                      {movie.original_language.toUpperCase()}
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
    </div>
      </>

  );
}
