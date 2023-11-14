import React from 'react';
import { Box, Text, Center, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Account = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const userName = user ? user.email.split('@')[0] : '';

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      {user ? (
        <Center>
          <Box
            width="50%"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
          >
            <Center  flexDirection="column">
              <Text as="h2" fontSize="xl" fontWeight="bold" textAlign="center">
                Welcome {userName}
              </Text>
              <Text mt={2} textAlign="center">Your account information:</Text>
            </Center>

           
          </Box>
        </Center>
      ) : (
        <Center>
          <Box
            width="50%"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
          >
            <Text as="h2" fontSize="xl" fontWeight="bold">
              Oh hello! Did you look for someone?
            </Text>
            <Text>Currently, no one is logged in.</Text>
            <Button mt={4} onClick={goToLogin}>
              Go to Login
            </Button>
          </Box>
        </Center>
      )}
    </>
  );
};

export default Account;