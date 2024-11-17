import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import './details.css'
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { langContext } from "../../context/lang";

export default function Details() {

  const { id } = useParams();
console.log(useParams());

  // const { moviesData } = useSelector((state) => state.Movies);

  // const movie = moviesData.find((movie) => movie.id === parseInt(id));
  const {lang}=useContext(langContext)

  const [movie, setfirst] = useState({})

  useEffect(() =>{

    axios.get(`https://api.themoviedb.org/3/movie/${id}`,{
      params:{api_key:"a3e2c620182dee11a077b74a47ca4e1d",language:lang}
    }).then((data) => {
console.log(data.data);

      setfirst(data.data)
    })
console.log(movie);


  },[lang])



  return (
    <div className="details-container">
      <Row className="g-4">
        <Col>
          <Card className="card">
            <Card.Img 
              className="card-img-top" 
              src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path} 
              alt={movie.original_title}
            />
            <Card.Body className="card-body">
              <Card.Title className="card-title">{movie.original_title}</Card.Title>
              <Card.Text className="card-text">{movie.overview}</Card.Text>
              <Card.Text className="release-date">Release Date: {movie.release_date}</Card.Text>
              <Card.Text className="rating">Rating: {movie.vote_average}</Card.Text>
              <Card.Text className="card-text">Language: {movie.original_language}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
