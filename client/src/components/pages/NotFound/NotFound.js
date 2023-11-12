import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';

const NotFound = () => {
  return (
    <Box textAlign="center" mt="20">
      <Heading as="h1" fontSize="6xl" color="red.500">
        404
      </Heading>
      <Text fontSize="2xl" color="gray.600" fontWeight="bold">
        Oops! Page not found.
      </Text>
      <Text fontSize="lg" color="gray.500" mt="4">
        The page you are looking for might be in another universe.
      </Text>
    </Box>
  );
};

export default NotFound;