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

router.get('/details/:category/:id', (req, res) => {
    const category = req.params.category
    const id = req.params.id
    axios.get(`https://api.themoviedb.org/3/${category}/${id}?api_key=86982a86d58f890410a6e2810d43832b`)
    .then(data => data.data)
    .then(content => {
        axios.get((`https://api.themoviedb.org/3/${category}/${id}/images?api_key=86982a86d58f890410a6e2810d43832b`))
        .then(images => {
            content.backdrop = images.data.backdrops
            res.send(content)
            }
        )
        .catch(err => console.log(err))  
    })
    .catch(err => console.log(err))
});

module.exports = router;