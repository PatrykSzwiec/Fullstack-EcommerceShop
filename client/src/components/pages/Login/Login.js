import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Alert,
  Spinner,
  Text,
  Heading,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/usersRedux';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../../config';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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
      console.log('Login Response:', res);
  
      if (res.ok) {
        const data = await res.json();
  
        if (data.message === 'success') {
          setStatus('success');
          dispatch(logIn({ email }));
          setTimeout(() => navigate('/'), 3000);
        } else {
          setStatus('serverError');
        }
      } else if (res.status === 400) {
        const data = await res.json();
        if (data.error === 'authentication_failed') {
          setStatus('authenticationFailed');
        } else {
          setStatus('clientError');
        }
      } else {
        setStatus('serverError');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setStatus('serverError');
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

          {status === 'success' && (
            <Alert status="success" mb={4}>
              You have been successfully logged in!
            </Alert>
          )}

          {status === 'serverError' && (
            <Alert status="error" mb={4}>
              Something went wrong... Unexpected error. Try again!
            </Alert>
          )}

          {status === 'clientError' && (
            <Alert status="error" mb={4}>
              Incorrect data. Login or password is incorrect...
            </Alert>
          )}

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