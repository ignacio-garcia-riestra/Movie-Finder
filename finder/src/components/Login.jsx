import {
  Flex,
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "@sweetalert/with-react";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState([""]);

  const schema = {
    email: Yup.string()
      .email("El formato de email ingresado no es válido")
      .required("Se requiere un email"),
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(/^(?=.*[a-z])/, "La contraseña debe tener al menos 1 minúscula")
      .matches(/^(?=.*[A-Z])/, "La contraseña debe tener al menos 1 mayúscula")
      .matches(/^(?=.*[0-9])/, "La contraseña debe tener al menos 1 número")
      .required("Se requiere contraseña"),
  };

  const handleError = (e) => {
    e.preventDefault();
    schema[e.target.name]
      .validate(e.target.value)
      .then(() => {
        switch (e.target.name) {
          case "email":
            setEmail(e.target.value);
            break;
          default:
            setPassword(e.target.value);
            break;
        }
        setFormErrors(
          formErrors.filter((elem) => !elem.includes(e.target.name))
        );
      })
      .catch((err) => {
        formErrors.every((elem) => !elem.includes(e.target.name))
          ? setFormErrors(
              formErrors.concat(e.target.name + ":" + err.errors[0])
            )
          : setFormErrors(
              formErrors.map((elem) =>
                elem.includes(e.target.name)
                  ? `${e.target.name}:${err.errors[0]}`
                  : elem
              )
            );
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formErrors.length < 2) {
      axios
        .post("http://localhost:8000/api/user/login", {
          email,
          password,
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("user", res.data.data.token);
          navigate("/");
        })
        .catch((err) => {
          console.log(err.response.data);
          swal({ text: err.response.data.mensaje, icon: "error" });
        });
    } else {
      swal({ text: "Verifique campos con datos erróneos", icon: "error" });
    }
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
          <Heading fontSize={"4xl"} textAlign={"center"} color={"#53131e"}>
            Login
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
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    borderColor={"black"}
                    onChange={handleError}
                  />
                  {formErrors.some((elem) => elem.includes("email")) && (
                    <Text color={"red"}>
                      {
                        formErrors
                          .find((elem) => elem.includes("email"))
                          .split(":")[1]
                      }
                    </Text>
                  )}
                </FormControl>
              </div>
              <div>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      borderColor={"black"}
                      onChange={handleError}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {formErrors.some((elem) => elem.includes("password")) && (
                    <Text color={"red"}>
                      {
                        formErrors
                          .find((elem) => elem.includes("password"))
                          .split(":")[1]
                      }
                    </Text>
                  )}
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
                  Login
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Not registred yet?
                  <Link to="/" style={{ paddingLeft: '6px', fontWeight: "bold", color: "#53131e" }}>
                    Get an account
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
};

export default Login;