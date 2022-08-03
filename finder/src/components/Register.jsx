import { Flex, Box, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Button, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
//import { useDispatch } from 'react-redux'
//import { userRegister } from '../store/user';
import axios from 'axios'

const Register = () => {

  const navigate = useNavigate();
  const fname = useInput();
  const lname = useInput();
  const email = useInput();
  const password = useInput();

  //const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false);

  /* const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegister({
      name: name.value,
      email: email.value,
      password: password.value,
    }))
      .then(() => navigate("/login"))
  } */

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/user/register', {
      fname: fname.value,
      lname: lname.value,
      email: email.value,
      password: password.value,
    })
    .then(() => navigate('/login'))
  }

  return (
    <Flex minH={'50vh'}align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={6} mx={'auto'} maxW={'xl'} py={12} px={10}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Register
          </Heading>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Box rounded={'lg'}bg={useColorModeValue('white', 'gray.700')}boxShadow={'lg'}p={8}>
            <Stack spacing={4}>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input {...fname}type="text" />
              </FormControl>
              <FormControl id="firstName" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input {...lname}type="text" />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input {...email}type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input {...password} type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button variant={'ghost'} onClick={() =>setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button type='submit' loadingText="Submitting" size="lg" bg={'blue.400'} color={'white'}_hover={{bg: 'blue.500', }}>
                  Create Account
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link to="/login" style={{ color: "#0096c7" }}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}

export default Register;