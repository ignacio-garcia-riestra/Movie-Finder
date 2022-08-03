const express = require("express");
const router = express.Router();
const axios = require("axios");
//const releases = require('./releases')
//const users = require('./users')

//router.use('/releases', releases)
//router.use('/users', users)

router.get("/", (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=86982a86d58f890410a6e2810d43832b`)
    .then(trendingMovies => res.send(trendingMovies.data))
    .catch(error => console.log(error));
});

module.exports = router;