import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Radio,
    RadioGroup,
    Heading,
    Text,
    useDisclosure
  } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "@sweetalert/with-react";
  
const Search = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('movie');
  const { onClose } = useDisclosure();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const keyword = e.target[3].value
    const category = value
    axios.get(`http://localhost:8000/api/releases/${category}/${keyword}`)
    .then((res) => {
      !res.data.length && swal({ text: 'No results found for your search', icon: "error" })
      console.log(res.data);
      onClose();
      navigate("/results");
    })
    .catch((err) => {
      console.log(err.response.data);
      swal({ text: err.response.data.mensaje, icon: "error" });
    });
    e.target[3].value = ''
  };  
  
  return (
    <Flex
      minH={"50vh"}
      align={"center"}
      justify={"center"}
      bg={"rgba(196, 192, 157, 0.8)"}
    >
      <Stack spacing={6} mx={"auto"} maxW={"xl"} py={12} px={10}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"} color={"#53131e"} mb={'-20px'}>
            Search by
          </Heading>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Box
            rounded={"lg"}
            bg={"rgba(196, 192, 157, 0.3)"}
            boxShadow={"lg"}
            p={8}
          >
          <Stack spacing={4}>
            <div>
              <FormControl id="search" isRequired>
                <RadioGroup onChange={setValue} value={value}>
                  <Stack direction='row' mb={'18px'} spacing={4} >
                    <Radio 
                      value='movie' size={'lg'} 
                      borderColor={value === 'movie' ? '#53131e' : 'black'} 
                      borderWidth={value === 'movie' ? '2px' : '1px'}
                      colorScheme='black'
                    >
                      <Text pt={'5px'} fontSize={'20px'}
                        color={value === 'movie' && '#53131e'} 
                        fontWeight={value === 'movie' && 'bold'}
                      >
                        Movie
                      </Text>
                    </Radio>
                    <Radio 
                      value='tv' size={'lg'} 
                      borderColor={value === 'tv' ? '#53131e' : 'black'} 
                      borderWidth={value === 'tv' ? '2px' : '1px'}
                      colorScheme='black'
                    >
                      <Text pt={'5px'} fontSize={'20px'} 
                        color={value === 'tv' && '#53131e'} 
                        fontWeight={value === 'tv' && 'bold'}
                      >
                        TV Show
                      </Text>
                    </Radio>
                    <Radio 
                      value='person' size={'lg'} 
                      borderColor={value === 'person' ? '#53131e' : 'black'} 
                      borderWidth={value === 'person' ? '2px' : '1px'}
                      colorScheme='black'
                    >
                      <Text pt={'5px'} fontSize={'20px'}
                        color={value === 'person' && '#53131e'} 
                        fontWeight={value === 'person' && 'bold'}
                      >
                        People
                      </Text>
                    </Radio>
                  </Stack>
                </RadioGroup>
                
                <Input
                  name="search"
                  type="text"
                  borderColor={"black"}
                  placeholder={`Type a keyword to search by ${value}`}
                  _placeholder={{ opacity: 0.7, color: '#53131e', fontSize: '17px' }}
                />
              </FormControl>
            </div>
  
            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                loadingText="Submitting"
                size="lg"
                bg={"#53131e"}
                color={"#C4C09D"}
                _hover={{ bg: "#b5d6b2", color: "#53131e" }}
              >
                Search
              </Button>
            </Stack>
          </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
};
  
export default Search;