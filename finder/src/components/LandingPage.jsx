import '../App.css';
import Gallery from '../utils/welcomeCarousel';
import { Box, Center, Heading, Image } from "@chakra-ui/react";
import React from "react";
import { getTrendyMovies } from "../utils/getTrendyMovies";
import axios from "axios";

const LandingPage = () => {

  //getTrendyMovies()

  return (
    /* aplicar bg #b5d6b2 */
    <>
      <Box
        minHeight={"auto"}
        my={"-132px"}
        bgImage="https://i0.wp.com/taiwan-scene.com/wp-content/uploads/2021/09/taiwan-film-moview-cinema-taipei-eslite-art-house-1.jpg?resize=1100%2C633&ssl=1"
        //boxSizing="350px"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize={"cover"}
      >
        {/* <Heading
          height={"1100px"}
          color={"white"}
          fontSize={"2xl"}
          paddingTop={"140"}
          textAlign={"center"}
          textDecorationLine={"underline"}
        >
          
        </Heading> */}
        <Box 
          paddingTop={"230"}
          paddingBottom={"40"}
          //</Box>className='App'
        >
          <Gallery />
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
