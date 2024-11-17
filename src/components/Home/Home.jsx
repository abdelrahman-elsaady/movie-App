import  { useContext, useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import './home.css'; 
import { MdStarOutline } from "react-icons/md";
import { MdStarRate } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { AddMovie, RemoveMovie } from '../Store/Slices/Favourite';
// import { movieAction } from '../Store/Slices/movies';
import { langContext } from '../../context/lang';
import { useMyCustomHookToFetchDataForReactLabDay6WithInstructorMona } from '../../hooks/useFetch';


export default function Home() {

  
  
  const {lang}=useContext(langContext)
  
  const {Favourite} = useSelector((state)=>state.fave)
  
  console.log("aboda");
  
  
  // console.log(moviesData);
  
  
  const dispatch  =useDispatch()
  
  const [pageNumber, setPageNumber] = useState(1); 
  
  console.log(pageNumber);

  // const [search, setQuery] = useState('');
  // https://api.themoviedb.org/3/movie/popular?
  // https://api.themoviedb.org/3/search/movie?
  
  const {data } = useMyCustomHookToFetchDataForReactLabDay6WithInstructorMona(`https://api.themoviedb.org/3/movie/popular`,{
    
      api_key:"a3e2c620182dee11a077b74a47ca4e1d",
      language:lang,
      page:pageNumber,
  }
  )








  // console.log(search);
  
  const navigate = useNavigate();

  // console.log(data);

  // console.log(data.data?.results);



  // useEffect(() => {

    // dispatch(movieAction({search,pageNumber,lang}))

          //  if(query.trim().length==0){
          //    Instance.get(`/movie/popular?&page=${pageNumber}`).then((res) => {
  
          //     setMovies(res.data.results);
          // }).catch((err) => {
          //     console.log(err);
          //   })
          //  }else{
          //        console.log(query);
                 
          //   Instance.get(`/search/movie?&query=${query}&page=${pageNumber}`).then((res) => {
   
          //     setMovies(res.data.results);

          //  })
          //  }
          //  console.log(pageNumber);
  // }, [search,pageNumber,lang]);

  const handleNext = () => {
    setPageNumber(prevPage => prevPage + 1);
    
  };

  const handlePrev = () => {
    if (pageNumber > 1) {
      setPageNumber(prevPage => prevPage - 1);
    }
  };


  return (
  
    
    <>
      <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>search here</Form.Label>
        <Form.Control type="text" placeholder="enter movie name"
         onChange={(e) =>{ 
            setQuery(e.target.value)
            setPageNumber(1)
          } } />
      </Form.Group>
      
    </Form>
       
      

      <Row xs={1} md={4} className="g-4 mt-4">
        {data.map((movie) => (
          <Col key={movie.id}>
            <Card className="bg-image hover-overlay ">
              <img 
                className=" img-fluid img-hover-scale rounded" 
                onClick={() => navigate(`/Details/${movie.id}`)}  
                src={"https://image.tmdb.org/t/p/original" + movie.poster_path} 
                alt={movie.original_title}
              />
              
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.title}</Card.Text>
                <Card.Text> Language : {movie.original_language}</Card.Text>
              </Card.Body>
              {Favourite.findIndex(favMovie => favMovie.id === movie.id) >= 0?<h5> Added to favourite 
                     <MdStarRate onClick={() => dispatch(RemoveMovie(movie))} className='fs-1' /></h5>:
              <p>
                 Click on star to add to favourite: 
                    : <MdStarOutline onClick={() =>  dispatch(AddMovie(movie))}className='fs-1' />
                </p>
              }
             
              
              
              <button 
                className="btn btn-danger" 
                onClick={() => navigate(`/Details/${movie.id}`)}>
                Details
              </button>
             
            </Card>
          </Col>
        ))}
      </Row> 

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-primary" onClick={handlePrev} disabled={pageNumber === 1}>
          Previous
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Next
        </button>
      </div> 
    </>
  );
}
