import { Flex, Box, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Button, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import content from '../static/formField';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import swal from '@sweetalert/with-react';
import * as Yup from "yup"; 

const Register = () => {

  const navigate = useNavigate();
  const [fname, setFname] = useState('');
  const [lname, setLname ] = useState('');
  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toMatchPassword, setToMatchPassword] = useState('')
  const [formErrors, setFormErrors] = useState([''])

  const schema =
    {
    fname: Yup.string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .matches(/^[aA-zZ\s]+$/, "Sólo se permiten letras en este campo")
      .required("Se requiere un nombre"),
    lname: Yup.string()
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .matches(/^[aA-zZ\s]+$/, "Sólo se permiten letras en este campo")
      .required("Se requiere un apellido"),
    email: Yup.string()
      .email("El formato de email ingresado no es válido")
      .required("Se requiere un email"),
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(/^(?=.*[a-z])/, "La contraseña debe tener al menos 1 minúscula")
      .matches(/^(?=.*[A-Z])/, "La contraseña debe tener al menos 1 mayúscula")
      .matches(/^(?=.*[0-9])/, "La contraseña debe tener al menos 1 número")
      .required("Se requiere contraseña"),
    rePassword: Yup.string()
      .matches(toMatchPassword, "La contraseña no coincide")
      .required("Se requiere confirmación de contraseña"),
  }
  
  const handleError = e => {
    e.preventDefault();
    schema[e.target.name].validate(e.target.value)
    .then(val => {
      switch (e.target.name) {
        case'fname':
          setFname(e.target.value)           
          break;
        case 'lname':
          setLname(e.target.value)            
          break;
        case 'email':
          setEmail(e.target.value)            
          break;
        default:
          setPassword(e.target.value)          
          break;
    };
      e.target.name === 'password' && setToMatchPassword(e.target.value)
      setFormErrors(formErrors.filter(elem => !elem.includes(e.target.name)))
    })
    .catch(err => {
      formErrors.every(elem => !elem.includes(e.target.name))
      ? setFormErrors(formErrors.concat(e.target.name + ':' + err.errors[0]))
      : setFormErrors(formErrors.map(elem => elem.includes(e.target.name)
        ? `${e.target.name}:${err.errors[0]}`
        : elem
      ))
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formErrors.length < 2) {
      axios.post('http://localhost:8000/api/user/register', {
      fname,
      lname,
      email,
      password,
      })
      .then((tok) => swal({ text: 'Te registraste exitosamente!', icon: 'success' }))
      .catch(err => swal({ text: err.response.data.mensaje, icon: 'error' }))
    } else {swal({ text: 'Verifique campos con datos erróneos', icon: 'error' })}
  }

  return (
   
    <Flex minH={'50vh'}align={'center'} justify={'center'} bg={'rgba(196, 192, 157, 0.8)'}>
      <Stack spacing={6} mx={'auto'} maxW={'xl'} py={12} px={10}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'} color={'#53131e'}>
            Register
          </Heading>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Box rounded={'lg'}bg={'rgba(196, 192, 157, 0.3)'}boxShadow={'lg'}p={8}>
            <Stack spacing={4}>
              {content.inputs.map((input, index) => {
                return (
                  <div key={index}>
                  <FormControl id={input.name} isRequired>
                  <FormLabel>{input.label}</FormLabel>
                  {input.name.includes('word')
                  ? <InputGroup>
                      <Input name={input.name} type={showPassword ? 'text' : 'password'} borderColor={'black'} onChange={handleError}  />
                      <InputRightElement h={'full'}>
                        <Button variant={'ghost'} onClick={() =>setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  : <Input name={input.name} type={input.type} borderColor={'black'} onChange={handleError}/>
                  }
                  
                  </FormControl>
                  {formErrors.some(elem => elem.includes([input.name])) &&
                  <Text color={'red'}>
                    {formErrors.find(elem => elem.includes([input.name])).split(':')[1]}
                  </Text>
                  }
                  </div>
                )
              })}
              
              <Stack spacing={10} pt={2}>
                <Button type='submit' loadingText="Submitting" size="lg" bg={'#53131e'} color={'#C4C09D'}_hover={{bg: '#b5d6b2', color: '#53131e' }}>
                  Create Account
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link to="/login" style={{ fontWeight: 'bold', color: "#53131e" }}>Login</Link>
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