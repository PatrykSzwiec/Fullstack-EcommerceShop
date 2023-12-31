import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Divider,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../config';
import getUserIdFromToken from '../../utils/getUserIdFromToken';

const ProductOverView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [amount, setAmount] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [sizesWithQuantity, setSizesWithQuantity] = useState([]);
  const toast = useToast();
  const [hovered, setHovered] = useState(false);

  const userId = getUserIdFromToken();

  const handleImageHover = () => {
    setHovered(!hovered);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/product/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
        if (data && data.sizes) {
          setSizesWithQuantity(data.sizes);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setAmount(1);
  };

  const handleAmountChange = (newAmount) => {
    if (selectedSize) {
      if (newAmount < 1) {
        setAmount(1);
      } else if (newAmount <= selectedSize.quantity) {
        setAmount(newAmount);
      } else {
        setAmount(selectedSize.quantity);
      }
    }
  };

  const handleAddToCart = async () => {
    if (selectedSize) {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          return;
        }

        const response = await fetch(`${API_URL}/cart/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            productId: selectedSize.productId,
            size: selectedSize.size,
            quantity: amount,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          //console.log('Product added to cart:', data);
          toast({
            title: 'Product added to cart!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        } else {
          throw new Error('Failed to add item to cart');
        }
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Box w="100%" p={4}>
      <Container maxW="70%" mt={8}>
        <Flex direction={{ base: "column", md: "row" }} gap={6}>
          {/* Column 1 - Image Carousel */}
          <Box w={{ base: "100%", md: "50%" }}>
            <Image
              src={hovered ? product.images[1].url : product.images[0].url}
              alt={product.name}
              w="100%"
              onMouseOver={handleImageHover}
              onMouseOut={handleImageHover}
            />
          </Box>

          {/* Column 2 - Product Details */}
          <Box w={{ base: "100%", md: "50%" }}>
            <VStack align="flex-start" spacing={4}>
              <Text fontSize="2xl" fontWeight="semibold">
                {product.name}
              </Text>
              <Text fontSize="lg" fontWeight="semibold">
                ${product.price}
              </Text>
              <HStack spacing={2}>
                {sizesWithQuantity.map((size) => (
                  <Tooltip key={size.id} label={`Quantity: ${size.quantity}`}>
                    <Button
                      size="sm"
                      variant={selectedSize === size ? 'solid' : 'outline'}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size.size}
                    </Button>
                  </Tooltip>
                ))}
              </HStack>
              <HStack spacing={4}>
                {/* Decrease amount button */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAmountChange(amount - 1)}
                >
                  -
                </Button>
                <Text>{amount}</Text>
                {/* Increase amount button */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAmountChange(amount + 1)}
                >
                  +
                </Button>
                {/* Add to Cart button */}
                <Button
                  colorScheme="teal"
                  variant="solid"
                  onClick={handleAddToCart}
                >
                  Add to Cart - ${product.price * amount}
                </Button>
              </HStack>
              <Divider w="100%" />
              <Text fontSize="lg" fontWeight="medium">
                Description:
              </Text>
              <Text color="gray.600">{product.description}</Text>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default ProductOverView;