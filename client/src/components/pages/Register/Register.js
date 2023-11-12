import React, { useState } from 'react';
import { Box, Heading, Button, Alert, Spinner, Input } from '@chakra-ui/react';
import { API_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!email || !password || !repeatPassword) {
      setStatus('clientError');
      return;
    }

    // Check if passwords match
    if (password !== repeatPassword) {
      setStatus('passwordMismatch');
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
        setStatus('success');
        setTimeout(() => navigate('/'), 3000);
      } else if (response.status === 400) {
        setStatus('clientError');
      } else if (response.status === 409) {
        setStatus('emailError');
      } else {
        setStatus('serverError');
      }
    } catch (error) {
      setStatus('serverError');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={4} w="100%">
      <Box maxW="md" mx="auto" bg="white" p={8} rounded="lg" shadow="md">
        <Heading mb={4}>Register</Heading>

        {status === 'success' && (
          <Alert status="success" mb={4}>
            You have been successfully registered! You can now log in...
          </Alert>
        )}

        {status === 'serverError' && (
          <Alert status="error" mb={4}>
            Something went wrong... Unexpected error. Try again!
          </Alert>
        )}

        {status === 'clientError' && (
          <Alert status="error" mb={4}>
            Not enough data. You must complete all fields.
          </Alert>
        )}

        {status === 'emailError' && (
          <Alert status="warning" mb={4}>
            Email already exists. You need to use a different email.
          </Alert>
        )}

        {status === 'passwordMismatch' && (
          <Alert status="warning" mb={4}>
            Passwords do not match. Please check your input.
          </Alert>
        )}

        {status === 'loading' && <Spinner size="lg" mb={4} />}

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