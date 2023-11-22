import React, { useState, useEffect } from 'react';
import { Box, Image, Text, Badge, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SingleProduct = ({ product }) => {
  const [uniqueImages, setUniqueImages] = useState(new Set());
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setUniqueImages((prevSet) => new Set([...prevSet, product.images[0].url]));
    }
  }, [product]);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  if (!product || !product.images || product.images.length === 0 || !uniqueImages.has(product.images[0].url)) {
    return null;
  }

  return (
    <Link to={`/product/${product.id}`}>
      <Box
        mx={{ base: "auto", md: 2 }}
        my={4}
        w="100%"
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
        position="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        boxShadow={hovered ? '0px 4px 12px rgba(0, 0, 0, 0.4)' : 'none'}
      >
        {/* Show the main image */}
        {product.images[0] && (
          <Image src={product.images[0].url} alt={product.name} />
        )}

        <Box p={{ base: 2, md: 6 }}>
          <Box d="flex" alignItems="baseline" justifyContent="space-between">
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="semibold" lineHeight="tight">
              {product.name}
            </Text>
            <Badge borderRadius="full" px="2" colorScheme="teal">
              ${product.price}
            </Badge>
          </Box>

          <Text mt="2" color="gray.600" fontSize={{ base: "sm", md: "md" }}>
            {product.shortDescription}
          </Text>

          {hovered && (
            <Flex
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              alignItems="center"
              justifyContent="center"
              background="rgba(0, 0, 0, 0.4)"
            >
              <Button colorScheme="teal">
                Click to Show More
              </Button>
            </Flex>
          )}
        </Box>
      </Box>
    </Link>
  );
};

export default SingleProduct;