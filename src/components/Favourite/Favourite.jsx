import { useDispatch, useSelector } from 'react-redux';
import { RemoveMovie, RemoveSeries } from '../Store/Slices/Favourite';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { MdFavoriteBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './favourite.css';

export default function Favourite() {
    const { Favourite, SeriesFavourite } = useSelector((state) => state.fave);
    const dispatch = useDispatch();

    const hasNoFavorites = Favourite.length === 0 && SeriesFavourite.length === 0;

    return (
        <div className="favourites-page">
            <h2>Your Favourites</h2>
            {hasNoFavorites ? (
                <div className="empty-favourites">
                    <MdFavoriteBorder className="empty-favorite-icon" /> 
                    <p className="empty-message">You haven't added any favorites yet!</p>
                    <div className="explore-links">
                        <Link to="/Home" className="explore-link">
                            Explore Movies
                        </Link>
                        <Link to="/Series" className="explore-link">
                            Explore TV Series
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    {Favourite.length > 0 && (
                        <>
                            <h3 className="section-title">Movies</h3>
                            <Row xs={1} md={4} className="g-4 mt-4">
                                {Favourite.map((movie) => (
                                    <Col key={movie.id}>
                                        <Card className="bg-image hover-overlay">
                                            <img 
                                                className="img-fluid img-hover-scale rounded" 
                                                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
                                                alt={movie.original_title}
                                            />
                                            <Card.Body>
                                                <Card.Title>{movie.original_title}</Card.Title>
                                                <Card.Text>{movie.release_date}</Card.Text>
                                                <Card.Text>Language: {movie.original_language}</Card.Text>
                                                <button 
                                                    className="btn btn-danger" 
                                                    onClick={() => dispatch(RemoveMovie(movie))}>
                                                    Remove from Favourites
                                                </button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </>
                    )}

                    {SeriesFavourite.length > 0 && (
                        <>
                            <h3 className="section-title mt-5">TV Series</h3>
                            <Row xs={1} md={4} className="g-4 mt-4">
                                {SeriesFavourite.map((series) => (
                                    <Col key={series.id}>
                                        <Card className="bg-image hover-overlay">
                                            <img 
                                                className="img-fluid img-hover-scale rounded" 
                                                src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`} 
                                                alt={series.name}
                                            />
                                            <Card.Body>
                                                <Card.Title>{series.name}</Card.Title>
                                                <Card.Text>{series.first_air_date}</Card.Text>
                                                <Card.Text>Language: {series.original_language}</Card.Text>
                                                <button 
                                                    className="btn btn-danger" 
                                                    onClick={() => dispatch(RemoveSeries(series))}>
                                                    Remove from Favourites
                                                </button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
