import { useDispatch, useSelector } from 'react-redux';
import { RemoveMovie } from '../Store/Slices/Favourite';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { MdFavoriteBorder } from 'react-icons/md'; // Icon for empty state
import { Link } from 'react-router-dom';
import './favourite.css'; // Custom CSS for additional styling

export default function Favourite() {
    const { Favourite } = useSelector((state) => state.fave);
    const dispatch = useDispatch();

    return (
        <div className="favourites-page">
            <h2>Your Favourites</h2>
            {Favourite.length === 0 ? (
                <div className="empty-favourites">
                    <MdFavoriteBorder className="empty-favorite-icon" /> 
                    <p className="empty-message">You have not added any movies to your favorites yet!</p>
                    <Link to="/Home" className="explore-link">
                        Explore Movies
                    </Link>
                </div>
            ) : (
                <Row xs={1} md={4} className="g-4 mt-4">
                    {Favourite.map((movie) => (
                        <Col key={movie.id}>
                            <Card className="bg-image hover-overlay">
                                <img 
                                    className="img-fluid img-hover-scale rounded" 
                                    src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path} 
                                    alt={movie.original_title}
                                />
                                <Card.Body>
                                    <Card.Title>{movie.original_title}</Card.Title>
                                    <Card.Text>{movie.release_date}</Card.Text>
                                    <Card.Text> Language : {movie.original_language}</Card.Text>
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
            )}
        </div>
    );
}
