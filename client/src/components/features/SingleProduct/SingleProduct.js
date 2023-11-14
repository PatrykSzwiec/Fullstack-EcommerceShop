import React, { useState, useEffect } from 'react';
import { Box, Image, Text, Badge } from '@chakra-ui/react';

const SingleProduct = ({ product }) => {
  const [uniqueImages, setUniqueImages] = useState(new Set());

  useEffect(() => {
    // Update the set of unique image URLs when the product changes
    if (product && product.images && product.images.length > 0) {
      setUniqueImages((prevSet) => new Set([...prevSet, product.images[0].url]));
    }
  }, [product]);

  if (!product || !product.images || product.images.length === 0 || !uniqueImages.has(product.images[0].url)) {
    return null;
  }

  return (
    <Box mx="auto" my={4} maxW="250px" borderWidth="1px" rounded="lg" overflow="hidden">
      {product.images[0] && (
        <Image src={product.images[0].url} alt={product.name} />
      )}
      <Box p="6">
        <Box d="flex" alignItems="baseline" justifyContent="space-between">
          <Text fontSize="2xl" fontWeight="semibold" lineHeight="tight">
            {product.name}
          </Text>
          <Badge borderRadius="full" px="2" colorScheme="teal">
            ${product.price}
          </Badge>
        </Box>

        <Text mt="2" color="gray.600">
          {product.shortDescription}
        </Text>
      </Box>
    </Box>
  );
};

export default SingleProduct;