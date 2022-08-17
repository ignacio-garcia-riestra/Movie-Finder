const axios = require("axios");
const router = require("express").Router();

router.get('/:category/:keyword', (req, res) => {
    const category = req.params.category
    const keyword = req.params.keyword
    axios.get(`https://api.themoviedb.org/3/search/${category}?api_key=86982a86d58f890410a6e2810d43832b&query=${keyword}`)
    .then(data => data.data.results)
    .then(arr => res.send(arr))
    .catch(err => console.log(err))
});

module.exports = router;