import React from "react";
import { Box } from "@chakra-ui/react";

const Results = () => {

  //getTrendyMovies()

  return (
    /* aplicar bg #b5d6b2 */
    <>
      <Box
        minHeight={'full'}
        my={"-132px"}
        bgImage="https://i0.wp.com/taiwan-scene.com/wp-content/uploads/2021/09/taiwan-film-moview-cinema-taipei-eslite-art-house-1.jpg?resize=1100%2C633&ssl=1"
        //boxSizing="350px"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize={"cover"}
      >
        <Box 
          paddingTop={"230"}
          paddingBottom={"40"}
        >
          {/* <Gallery /> Reemplazar por grid */}
        </Box>
      </Box>
      RESULTADOS
    </>
  );
};

export default Results;