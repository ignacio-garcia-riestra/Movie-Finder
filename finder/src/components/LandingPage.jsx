import '../App.css';
import Gallery from '../utils/welcomeCarousel';
import { Box } from "@chakra-ui/react";
import React from "react";

const LandingPage = () => {


  return (
    /* aplicar bg #b5d6b2 */
    <>
      <Box
        minHeight={"auto"}
        my={"-132px"}
        bgImage="https://i0.wp.com/taiwan-scene.com/wp-content/uploads/2021/09/taiwan-film-moview-cinema-taipei-eslite-art-house-1.jpg?resize=1100%2C633&ssl=1"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize={"cover"}
      >
        <Box 
          paddingTop={"230"}
          paddingBottom={"40"}
        >
          <Gallery />
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;