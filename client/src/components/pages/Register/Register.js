import React, { useState } from 'react';
import { Box, Heading, Button, Input, useToast } from '@chakra-ui/react';
import { API_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !repeatPassword) {
      toast({
        title: 'Incomplete Data',
        description: 'Please fill out all fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password !== repeatPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Passwords do not match. Please check your input.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, repeatPassword }),
      });

      if (response.status === 201) {
        toast({
          title: 'Registration Successful',
          description: 'You have been successfully registered!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => navigate('/'), 3000);
      } else if (response.status === 400) {
        toast({
          title: 'Incomplete Data',
          description: 'Not enough data. Please complete all fields. Password must be at least 6 characters',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else if (response.status === 409) {
        toast({
          title: 'Email Already Exists',
          description: 'The email already exists. Please use a different email.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Registration Failed',
          description: 'Something went wrong. Please try again!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Server Error',
        description: 'Something went wrong. Please try again!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={4} w="100%">
      <Box maxW="md" mx="auto" bg="white" p={8} rounded="lg" shadow="md">
        <Heading mb={4}>Register</Heading>

        <form onSubmit={handleSubmit}>
          <Box mb={4}>
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          <Box mb={4}>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          <Box mb={4}>
            <Input
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </Box>

          <Button type="submit" colorScheme="teal" isLoading={isLoading}>
            Sign up
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Register;