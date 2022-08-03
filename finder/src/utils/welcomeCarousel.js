// src/component/Gallery.js
import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from "axios";
import "./styles.css"

export default function Gallery () {   

  const [trendMovies, setTrendMovies] = useState([])

  const loadMovies = () => {
    axios.get(`http://localhost:8000/api`)
    .then(res => {
      console.log(res.data)
      setTrendMovies(res.data.results)
    })    
    .catch(error => console.log(error));
  }

  if (!trendMovies.length) loadMovies()

  console.log('TREND MOVIES ES ', trendMovies)

  return (
    trendMovies.length
    ? <div>
        <h1 className="carousel-title">
          Popular movies this week
        </h1>
        <Carousel 
          //autoPlay  
          interval="5000" 
          transitionTime="5000" 
          showStatus={false}
          infiniteLoop
        >
        {trendMovies.map(movie => (
          <div>
            {console.log(trendMovies)}
            <img
              className="carousel-img" 
              src={'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/'+movie.poster_path} alt="" 
            />
            {/* <p className="legend">{movie.original_title}</p> */}
          </div>
            )
          )
        }
        </Carousel>
      </div>
    : <></>
  )
};