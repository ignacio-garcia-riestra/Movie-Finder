import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from "axios";
import "./styles.css"

export default function Gallery () {   

  const navigate = useNavigate();
  const [trendMovies, setTrendMovies] = useState([]);

  const loadMovies = () => {
    axios.get(`http://localhost:8000/api`)
    .then(res => {
      setTrendMovies(res.data.results)
    })    
    .catch(error => console.log(error));
  }

  const onClickItem = (e) => {
    const contentId = trendMovies[e].id
    navigate(`/details/movie/${contentId}`)
  }

  if (!trendMovies.length) loadMovies()

  return (
    trendMovies.length
    ? <div>
        <h1 className="carousel-title">
          Popular movies this week
        </h1>
          <Carousel
            autoPlay  
            interval="5000" 
            transitionTime="5000" 
            autoplaySpeed="500"
            showStatus={false}
            infiniteLoop
            onClickItem={onClickItem}
          >
            {trendMovies.map((movie, index) => (
              <div key={index} className='carousel-selected'>
                <img
                  className="carousel-img" 
                  src={'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/'+movie.poster_path} alt="" 
                />
              </div>
              )
            )}
          </Carousel>
        
      </div>
    : <></>
  )
};