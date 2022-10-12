import { Link } from "react-router-dom";
import { Box, Grid, GridItem, Text, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function GridWithResults({ results }) {
  const [hoverId, setHoverId] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const path = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2";

  useEffect(() => {
    setWidth(hoverId ? "231px" : "210px");
    setHeight(hoverId ? "346.5px" : "315px");
  }, [hoverId]);

  return results.length ? (
    <Grid
      mt={10}
      mx={"auto"}
      templateColumns="repeat(5, 1fr)"
      gap={'12'}
      justifyItems={"center"}
      w={"full"}
      textAlign={"center"}
      
    >
      {results.map((item, i) => {
        console.log(item)
        const content_id = item.id;
        const category = item.release_date ? 'movie' : item.first_air_date ? 'tv' : 'person'
        const url = item.poster_path ? item.poster_path : item.profile_path;
        const backImg =
          item.poster_path || item.profile_path ? path + url : null;
        const rawTitle = item.name ? item.name : item.title;
        const title = rawTitle.length <= 21 ? rawTitle
                      : `${rawTitle.slice(0,17)}...`
        const year = item.release_date
          ? item.release_date.slice(0, 4)
          : item.first_air_date
          ? `(${item.first_air_date.slice(0, 4)})`
          : null;
        const score = item.vote_average * 10;
        const scoreColor = score > 70
                           ? 'green.400' : score > 60
                           ? 'yellow.400' : score > 50
                           ? 'orange.400' : 'red.500'
        const role = item.known_for_department;
        console.log(item)
        return (
          <Link key={i} to={`/details/${category}/${content_id}`}>
            <GridItem
              border={item.id === hoverId ? "1px" : '0px'}
              borderRadius={"lg"}
              bg={"rgb(0,0,0,0.7)"}
              minH={'413px'}
              borderColor="rgba(181, 214, 178, 0.6)"
              id={item.id}
              marginBottom={item.id === hoverId ? '-35px' : 0}
              onMouseEnter={(e) => {
                console.log("MOUSE ENTER ", e.target.parentElement.id);
                setHoverId(Number(e.target.parentElement.id));
              }}
              onMouseLeave={() => setHoverId(null)}
            >
              <GridItem
                w={item.id === hoverId ? width : '210px'}
                h={item.id === hoverId ? height : '315px'}
                bgImg={backImg}
                bgSize={"cover"}
                bgPosition="center"
              />
                <CircularProgress 
                  value={score} 
                  thickness='9px' 
                  size='38px' 
                  color={scoreColor}
                  ml={'-144px'}
                  paddingTop='10px'
                  >
                    <CircularProgressLabel color='white' fontSize='11px' paddingTop={'10px'} >
                      {score}%
                    </CircularProgressLabel>
                </CircularProgress>
              {console.log('ITEM ID ES ', item.id)}
              {console.log('HOVER ID ES ', hoverId)}
              {console.log('ITEM ID ES ', item.id)}
              <Box
                w={item.id === hoverId ? width : '210px'}
                h={"auto"}
                color={"rgba(181, 214, 178, 0.8)"}
                fontWeight={"bold"}
                p={"5px"}
              >
                <Text p={1}>{title}</Text>
                <Text p={1}>{year}</Text>
                <Text>{role}</Text>
              </Box>
            </GridItem>
          </Link>
        );
      })}
    </Grid>
  ) : (
    <></>
  );
}
