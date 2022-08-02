import axios from "axios";
import { useState } from "react";

/* export function getTrendyMovies(){
    axios
      .get(`http://localhost:8000/api`)
      .then(res => {
        console.log('RES GET TRENDY ', res.data);
        //state.getResults(res.data.results);
        //navigate('/results')
      });
} */

export function useTrendyMovies () {
  const [trendMovies, setTrendMovies] = useState([])
  axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=86982a86d58f890410a6e2810d43832b`)
    .then(res => {
      console.log('TRENDING MOVIES DA ', res.data.results)
      setTrendMovies(res.data.results)
    })    
    .catch(error => console.log(error));
}