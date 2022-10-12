import { Box, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

const Details = () => {

  const location = useLocation()
  const [content, setContent] = useState({})
  const [indexImg, setIndexImg] = useState(0)
  const rootImgUrl = 'https://image.tmdb.org/t/p/original'
  const genericBgImage = 'https://i0.wp.com/taiwan-scene.com/wp-content/uploads/2021/09/taiwan-film-moview-cinema-taipei-eslite-art-house-1.jpg?resize=1100%2C633&ssl=1'
  

  const loadContent = () => {
    console.log('ENTRAMOS AL LOADER')
    const category = location.pathname.split('/').slice(-2)[0]
    const id = location.pathname.split('/').slice(-1)[0]
    axios.get(`http://localhost:8000/api/releases/details/${category}/${id}`)
    .then(res => setContent(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    loadContent()
  },[location])

  useEffect(() => {
    setTimeout(()=> setIndexImg(indexImg < 4 ? (indexImg + 1) : 0)
  , 2000)
  }, [indexImg])

  return (content.backdrop ?
    /* aplicar bg #b5d6b2 */
    <>{console.log(content)}
      <Box
        minHeight={"114vh"}
        my={"-132px"}
        pt={'270px'}
        bgImage={
          content.backdrop[indexImg]?.file_path
          ? rootImgUrl + content.backdrop[indexImg]?.file_path
          : genericBgImage}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize={"cover"}
      >
        <Box 
          w={'20%'}
          ml={'40px'}
          p={"25px"}
          borderRadius={'20'}
          bg={'rgba(0, 0, 0, 0.5)'}
        >
          <Heading color='white' size={'lg'} >{content.title || content.name}</Heading>
          <Text mt={'10px'} color='white' fontSize={'lg'}>{content.overview}</Text>
        </Box>
      </Box>
    </>
    : <></>
  );
};

export default Details;