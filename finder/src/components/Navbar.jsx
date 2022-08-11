import React, { useState } from 'react';
import { Link as ReactRouter } from "react-router-dom";
import { chakra, Box, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent,
  DrawerCloseButton, Flex, Image, Input, Text, IconButton, Button, Stack, Popover, PopoverTrigger, useColorModeValue, Link, useDisclosure, Center } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import parseJwt from "../hooks/parseJwt";
import Register from './Register';
import Login from './Login';

export default function WithSubnavigation() {
  
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const token = localStorage.getItem('user')
  const user = token ? parseJwt(token) : {}

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
  const btnRef = React.useRef()

  const handlerDrawer = e => {
    e.target.innerText === 'Register'
    ? setIsRegistering(true)
    : setIsLoggingIn(true);
    onOpen()
  }

  const handleCloseDrawer = () => {
    setIsRegistering(false)
    setIsLoggingIn(false)
    onClose()
  }
  
  const handleLogout = () => {
    localStorage.clear()
    setIsLoggingIn(false)
    onClose()
  }

  if(localStorage.getItem('registering')) {
    localStorage.clear()
    setIsRegistering(false);
    setIsLoggingIn(true)
  } 
  
    return (
      <Box position={'fixed'} width={'100%'} paddingTop={"140px"}>
        <Flex minH={"60px"} py={{ base: 2 }} px={{ base: 4 }} borderBottom={4} borderStyle="solid" borderColor={'rgba(0, 0, 0, 0)'} align="center" bgGradient="linear(to-l, rgba(196, 192, 157, 0.3), rgba(181, 214, 178, 0.5))" >
          <Flex flex={{ base: 1, md: "auto" }} ml={{ base: -2 }} display={{ base: "flex", md: "none" }} >
            <IconButton onClick={onToggle} icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />} variant={"ghost"} aria-label={"Toggle Navigation"} />
  
            {/* LOGO */}
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Box boxSize="80PX">
            </Box>
            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
  
          {/* BUSCADOR */}
          <Link as={ReactRouter} to="/search">
            <Button display={{ base: "none", md: "inline-flex" }} m={5} mr={4} fontSize={"m"} fontWeight={600} color={"#C4C09D"} bg={"#1A1A1A"} _hover={{ bg: "#53131e" }}>
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
                <Text fontSize='lg' color='white' fontWeight={'bold'} textTransform={'capitalize'} >
                  Hi, {user.fname}!
                </Text>
              </Center>
  
            </Stack>
          ) : (
            
            <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6}>
              {/* BOTON REGISTER  */}
              <>
                <Button ref={btnRef} display={{ base: "none", md: "inline-flex" }} m={5} mr={-5} fontSize={"m"} fontWeight={600} color={"#C4C09D"} bg={"#1A1A1A"} _hover={{ bg: "#53131e" }} onClick={handlerDrawer} >
                  Register
                </Button>
                
              {/* </Link> */}
              </>
              {/* BOTON LOGIN  */}
              <Link as={ReactRouter} to="/">
                <Button ref={btnRef} display={{ base: "none", md: "inline-flex" }} m={5} mr={4} fontSize={"m"} fontWeight={600} color={"#C4C09D"} bg={"#1A1A1A"} _hover={{ bg: "#53131e" }} onClick={handlerDrawer} >
                  Log In
                </Button>
              </Link>

              <Drawer
                  isOpen={isOpen}
                  placement='right'
                  onClose={handleCloseDrawer}
                  //finalFocusRef={btnRef}
                  size={'md'}
                  bg={'rgba(196, 192, 157, 0.3)'}
                >

                  <DrawerOverlay />
                  <DrawerContent bg={'rgba(0, 0, 0, 0)'}>
                    <DrawerCloseButton mr={3} />

                    <DrawerBody>
                      {console.log('isRegistering: ', isRegistering)}
                      {console.log('isLoggingIn: ', isLoggingIn)}
                      {isRegistering && <Register />}
                      {isLoggingIn && <Login />}
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
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
          <Popover /* trigger={"hover"} */ placement={"bottom-start"}>
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