import React, { useEffect, useState } from "react";
import { useNavigate, Link as ReactRouter } from "react-router-dom";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Popover,
  PopoverTrigger,
  Link,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import parseJwt from "../hooks/parseJwt";
import Register from "./Register";
import Login from "./Login";
import Search from "./Search";

export default function WithSubnavigation() {
  const navigate = useNavigate();
  const queryString = window.location.search.slice(1);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const token = localStorage.getItem("user");
  const user = token ? parseJwt(token) : {};

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const btnRef = React.useRef();

  const handlerDrawer = (e) => {
    onOpen();
    navigate(`/?${e.target.innerText.toLowerCase()}`);
  };

  const handleCloseDrawer = () => {
    onClose();
    //navigate("/");
  };

  const handleLogout = () => {
    localStorage.clear();
    onClose();
  };

  useEffect(() => {
    setIsLoggingIn(queryString === "login");
    setIsRegistering(queryString === "register");
    setIsSearching(queryString === "search");
    window.location.pathname === '/results' && onClose();
  }, [queryString]);

  useEffect(() => {
    onClose();
  }, [token]);

  return (
    <Box position={"fixed"} width={"100%"} paddingTop={"140px"}>
      <Flex
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={4}
        borderStyle="solid"
        borderColor={"rgba(0, 0, 0, 0)"}
        align="center"
        bgGradient="linear(to-l, rgba(196, 192, 157, 0.5), rgba(181, 214, 178, 0.7))"
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          ml={"90px"}
        >
          <DesktopNav />
        </Flex>

        {/* BUSCADOR */}
        <Button
          display={{ base: "none", md: "inline-flex" }}
          m={5}
          mr={4}
          fontSize={"m"}
          fontWeight={600}
          color={"#C4C09D"}
          bg={"#1A1A1A"}
          _hover={{ bg: "#53131e" }}
          onClick={handlerDrawer}
        >
          Search
        </Button>

        {/* BOTONES */}

        {user.id ? (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            {/* BOTON LOGOUT  */}
            <Link as={ReactRouter} to="/">
              <Button
                onClick={handleLogout}
                m={5}
                mr={0}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"#D4B742"}
                bg={"#1A1A1A"}
                _hover={{ bg: "#1A1A1A" }}
              >
                LogOut
              </Button>
            </Link>
            {/* SALUDO  */}
            <Center w="150px" py="25px">
              <Text
                fontSize="lg"
                color="white"
                fontWeight={"bold"}
                textTransform={"capitalize"}
              >
                Hi, {user.fname}!
              </Text>
            </Center>
          </Stack>
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            {/* BOTON REGISTER  */}
            <Button
              ref={btnRef}
              display={{ base: "none", md: "inline-flex" }}
              m={5}
              mr={-2}
              fontSize={"m"}
              fontWeight={600}
              color={"#C4C09D"}
              bg={"#1A1A1A"}
              _hover={{ bg: "#53131e" }}
              onClick={handlerDrawer}
            >
              Register
            </Button>

            {/* BOTON LOGIN  */}
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              <Button
                ref={btnRef}
                display={{ base: "none", md: "inline-flex" }}
                m={5}
                mr={4}
                fontSize={"m"}
                fontWeight={600}
                color={"#C4C09D"}
                bg={"#1A1A1A"}
                _hover={{ bg: "#53131e" }}
                onClick={handlerDrawer}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        )}
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={handleCloseDrawer}
          size={"md"}
          bg={"rgba(196, 192, 157, 0.3)"}
        >
          <DrawerContent bg={"rgba(0, 0, 0, 0)"}>
            <DrawerCloseButton mr={3} />
            <DrawerBody>
              {isRegistering && <Register />}
              {isLoggingIn && <Login />}
              {isSearching && <Search />}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
}

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={2}>
      <Box>
        <Popover trigger={"hover"} placement={"bottom-start"}>
          <PopoverTrigger>
            <Link
              as={ReactRouter}
              to="/"
              w="40px"
              fontSize={"4xl"}
              color={"#53131e"}
              fontWeight={"bold"}
              _hover={{ textDecoration: "none", color: "#1a1a1a" }}
            >
              <Center w="150px" py="15px">
                <h6>MovieFinder</h6>
              </Center>
            </Link>
          </PopoverTrigger>
        </Popover>
      </Box>
    </Stack>
  );
};