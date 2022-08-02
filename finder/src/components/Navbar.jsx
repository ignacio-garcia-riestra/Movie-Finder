import React from 'react';
import { Link as ReactRouter } from "react-router-dom";
import { useNavigate } from 'react-router';
import { chakra, Box, Flex, Image, Text, IconButton, Button, Stack, Popover, PopoverTrigger, useColorModeValue, Link, useDisclosure, Center } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
//import logo from "../assets/logo.jpg";
import { useDispatch } from 'react-redux'
//import { userLogout } from '../store/user';
import axios from 'axios';

export default function WithSubnavigation() {
  
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : {}
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const handleLogout = () => {
     /*  dispatch(userLogout())
        .then(() => { */
          
          return navigate("/")
        //}
        //)
    }
  
    /* const [products, setProducts] = useState([])
  
    axios.get(`http://localhost:3001/api/carts/${cart.id}`)
      .then(res => setProducts(res.data[0].products)) */
  
  
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Box position={'fixed'} width={'100%'} paddingTop={"140px"}>
        <Flex /* bg={useColorModeValue("#C4C09D", "gray.800")} */ color={useColorModeValue("gray.600", "white")} minH={"60px"} py={{ base: 2 }} px={{ base: 4 }} borderBottom={4} borderStyle="solid" borderColor={'rgba(0, 0, 0, 0)'} align="center" bgGradient="linear(to-l, rgba(196, 192, 157, 0.3), rgba(181, 214, 178, 0.5))" >
          <Flex flex={{ base: 1, md: "auto" }} ml={{ base: -2 }} display={{ base: "flex", md: "none" }} >
            <IconButton onClick={onToggle} icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />} variant={"ghost"} aria-label={"Toggle Navigation"} />
  
            {/* LOGO */}
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Box boxSize="80PX">
              <Link to="/" as={ReactRouter}>
                {/* <Image src={logo} alt="Good Vibes" /> */}
              </Link>
            </Box>
            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
  
          {/* BUSCADOR */}
          <Link as={ReactRouter} to="/search">
            <Button display={{ base: "none", md: "inline-flex" }} m={5} mr={4} fontSize={"m"} fontWeight={600} color={"#C4C09D"} bg={"#53131e"} /* hover={{ bg: "#fffacc" }} */>
              Search
            </Button>
          </Link>
  
          {/* BOTONES */}
  
          {user.id ? (
            <Stack
              flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6}>
              {/* BOTON LOGOUT  */}
              <Link as={ReactRouter} to="/">
                <Button onClick={handleLogout} m={5} mr={0} display={{ base: "none", md: "inline-flex" }} fontSize={"sm"} fontWeight={600} color={"#D4B742"} bg={"#1A1A1A"} _hover={{ bg: "#1A1A1A" }}>
                  LogOut
                </Button>
              </Link>
              {/* SALUDO  */}
              <Center w='150px' py='25px' >
                <Text fontSize='md' color='white' >Hi, {user.name}!</Text>
              </Center>
  
            </Stack>
          ) : (
  
            <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6}>
              {/* BOTON REGISTER  */}
              <Link as={ReactRouter} to="/register">
                <Button display={{ base: "none", md: "inline-flex" }} m={5} mr={-5} fontSize={"m"} fontWeight={600} color={"#C4C09D"} bg={"#1A1A1A"} _hover={{ bg: "#1A1A1A" }}>
                  Register
                </Button>
              </Link>
  
              {/* BOTON LOGIN  */}
              <Link as={ReactRouter} to="/login">
                <Button display={{ base: "none", md: "inline-flex" }} m={5} mr={4} fontSize={"m"} fontWeight={600} color={"#C4C09D"} bg={"#1A1A1A"} hover={{ bg: "#D4B742" }}>
                  Log In
                </Button>
              </Link>
            </Stack>
          )}

        </Flex>
      </Box>
    );
  }
  
  // PRODUCTOS - MARCAS
  const DesktopNav = () => {
    const linkColor = useColorModeValue("white", "gray.200");
    const linkHoverColor = useColorModeValue("lightgrey", "white");
  
    // PRODUCTS Y BRANDS
    return (
      <Stack direction={"row"} spacing={2}>
        <Box>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link as={ReactRouter} to="/products" w='40px' fontSize={"4xl"} color={"#53131e"} fontWeight={'bold'} _hover={{ textDecoration: "none", color: "#FFEFBD" }} >
                <Center w='150px' py='15px' >
                  <h6>MovieFinder</h6>
                </Center>
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
      </Stack>
    );
  };