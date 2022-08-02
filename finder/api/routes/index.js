const express = require("express");
const movies = require('./movies')
//const users = require('./users')
const router = express.Router();

router.use('/movies', movies)
//router.use('/users', users)

router.get("/", (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=86982a86d58f890410a6e2810d43832b`)
    .then(trendingMovies => res.send(trendingMovies.data))
    .catch(error => console.log(error));
});

module.exports = router;