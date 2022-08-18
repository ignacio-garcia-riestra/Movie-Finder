import { Link } from 'react-router-dom';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react'

export default function GridWithResults ({ results }) {
  const path = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
  
  return (
    results.length 
    ? <Grid mt={10} mx={'auto'} templateColumns='repeat(5, 1fr)' gap={8} justifyItems={'center'} 
      w={'full'} textAlign={'center'}>
        {results.map((item, i) => {
          const content_id = item.id
          const url = item.poster_path ? item.poster_path : item.profile_path
          const backImg = (item.poster_path || item.profile_path)
                        ? path+url
                        : null
          const title = item.name ? item.name : item.title
          const year = item.release_date
                     ? item.release_date.slice(0,4)
                     : item.first_air_date
                     ? `(${item.first_air_date.slice(0,4)})`
                     : null
          const role = item.known_for_department
          return (
            <Link key={i} to={`/details/${content_id}`}>
              <GridItem border={'0px'} borderRadius={'lg'} bg={'rgb(0,0,0,0.7)'} borderColor='rgba(181, 214, 178, 0.6)' >
                <GridItem w='210px' h='315px' bgImg={backImg} bgSize={"cover"} bgPosition="center"/>
                <Box w={'210px'} h={'auto'} color={'rgba(181, 214, 178, 0.8)'} fontWeight={'bold'} p={'5px'}> 
                  <Text p={1}>{title}</Text>
                  <Text p={1}>{year}</Text>
                  <Text>{role}</Text>
                </Box>
              </GridItem>
            </Link>
          )  
        }
        )}
      </Grid>
    : <></>
  )
}