import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Article = ({ title, content }) => {
  return (
    <Box p={4}>
      <Text as="h2" fontSize="xl" fontWeight="bold">
        {title}
      </Text>
      <Text mt={2}>{content}</Text>
    </Box>
  );
};

export default Article;