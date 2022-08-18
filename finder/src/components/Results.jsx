import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import GridWithResults from "../utils/resultsGrid";
import { useNavigate } from "react-router";

const Results = () => {

  const navigate = useNavigate()
  const results = useSelector(state => state.results)

  useEffect(()=> {
    !results.length && navigate('/')
  },[results])

  return (
    <>
      <Box
        minHeight={'full'}
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
          <GridWithResults results={results}/>
        </Box>
      </Box>
    </>
  );
};

export default Results;