import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/usersRedux';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../../config';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSuccessToast = () => {
    toast({
      title: 'Login successful',
      description: 'You have been successfully logged in!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleErrorToast = (errorType) => {
    let description = '';
    switch (errorType) {
      case 'serverError':
        description = 'Something went wrong... Unexpected error. Try again!';
        break;
      case 'clientError':
        description = 'Incorrect data. Login or password is incorrect...';
        break;
      default:
        description = 'An error occurred. Please try again.';
    }

    toast({
      title: 'Login failed',
      description: description,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      };
  
      const res = await fetch(`${API_URL}/auth/login`, options);
      //console.log('Login Response:', res);
  
      if (res.ok) {
        const data = await res.json();
        //console.log('Dane z odpowiedzi:', data);
  
        if (data.message === 'success') {
          localStorage.setItem('accessToken', data.access_token);
          //console.log('Sesja została zapisana w localStorage:', data.access_token);
          handleSuccessToast();
          dispatch(logIn({ email }));
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          handleErrorToast('serverError');
        }
      } else if (res.status === 400) {
        const data = await res.json();
        if (data.error === 'authentication_failed') {
          handleErrorToast('serverError');
        } else {
          handleErrorToast('serverError');
        }
      } else {
        handleErrorToast('serverError');
      }
    } catch (error) {
      console.error('Login Error:', error);
      handleErrorToast('serverError');
      handleErrorToast('serverError');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={4} w="100%">
      <Box maxW="md" mx="auto" bg="white" p={8} rounded="lg" shadow="md">
        <Heading mb={4} textAlign="center">
          Login
        </Heading>
        <Text fontSize="sm" mb={4} textAlign="center">
          Become a participant - don't miss out on opportunities, offers,
          discounts, and discount bonuses.
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </FormControl>

          {isLoading && <Spinner size="lg" mb={4} />}

          <Box textAlign="center">
            <Button colorScheme="teal" type="submit" isLoading={isLoading} mb={4}>
              Sign in
            </Button>

            <Text mb={4}>
              Don't have an account?
            </Text>

            <Button as={Link} to="/register" colorScheme="teal" mb={4}>
              Join us
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;