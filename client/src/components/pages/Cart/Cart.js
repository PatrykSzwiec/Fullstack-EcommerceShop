import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Input,
  Image,
  Flex,
} from '@chakra-ui/react';
import { API_URL } from '../../../config';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${API_URL}/cart/:userId`, {
          method: 'GET',
          // Include the user ID in the URL or through authentication headers
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }
  
        const data = await response.json();
        setCartItems(data.data || []); // Ensure setting an empty array if data is null or undefined
      } catch (error) {
        console.error('Error fetching cart items:', error);
        // Handle error, show an error message to the user
      }
    };
  
    fetchCartItems();
  }, []);

  const handleAmountChange = async (productId, newAmount) => {
    try {
      const response = await fetch(`${API_URL}/cart/update/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: newAmount }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item quantity in the cart');
      }

      // Update the cart items after successful response
      // Fetch updated cart data or modify locally
    } catch (error) {
      console.error('Error updating item quantity:', error);
      // Handle error, show an error message to the user
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/cart/remove/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from the cart');
      }

      // Update the cart items after successful response
      // Fetch updated cart data or modify locally
    } catch (error) {
      console.error('Error removing item from cart:', error);
      // Handle error, show an error message to the user
    }
  };

  const handleMakeOrder = async () => {
    try {
      const response = await fetch(`${API_URL}/cart/finalize/:userId`, {
        method: 'PATCH',
        // Add necessary headers or user ID in the URL for authentication
      });

      if (!response.ok) {
        throw new Error('Failed to finalize order');
      }

      // Handle order finalization, maybe redirect or show success message
    } catch (error) {
      console.error('Error finalizing order:', error);
      // Handle error, show an error message to the user
    }
  };

  return (
    <Box p={4} w="80%">
      <Flex>
        {/* Column 1 */}
        <Box flex="1">
          {cartItems.map((item) => (
            <Box key={item.id} mb={4} p={4} borderWidth="1px" borderRadius="md">
              <Flex alignItems="center" justify="space-between" mb={2}>
                <HStack spacing={4}>
                  <Image src={item.image} alt={item.name} w="50px" />
                  <VStack align="flex-start">
                    <Text>{item.name}</Text>
                    <Text>{item.size}</Text>
                    <Text>${item.price}</Text>
                  </VStack>
                </HStack>
                <VStack align="flex-end">
                  <HStack>
                    <Button onClick={() => handleAmountChange(item.id, item.amount - 1)}>-</Button>
                    <Input type="number" value={item.amount} readOnly />
                    <Button onClick={() => handleAmountChange(item.id, item.amount + 1)}>+</Button>
                  </HStack>
                  <Button onClick={() => handleRemoveItem(item.id)}>Remove</Button>
                </VStack>
              </Flex>
            </Box>
          ))}
        </Box>
        {/* Column 2 */}
        <Box flex="1">
          <VStack spacing={4}>
            <Box p={4} borderWidth="1px" borderRadius="md">
              <Text fontSize="lg">Total Price</Text>
              <Text fontWeight="semibold">$</Text>
            </Box>
            <Button colorScheme="teal" onClick={handleMakeOrder}>
              Make an Order
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Cart;