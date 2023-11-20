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
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon, AddIcon, MinusIcon } from '@chakra-ui/icons';
import { API_URL } from '../../../config';
import getUserIdFromToken from '../../utils/getUserIdFromToken';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        // Handle case when token is not available
        return;
      }
      
      const userId = getUserIdFromToken();

      const response = await fetch(`${API_URL}/cart/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const cartData = await response.json();
        console.log('Received cart data:', cartData);
        setCartItems(cartData);
        console.log(cartData);
      } else {
        throw new Error('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      // Handle error, show an error message to the user
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);


  const handleAmountChange = async (cartItemId, newQuantity) => {
    console.log('Updating cart item:', cartItemId, 'New quantity:', newQuantity);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        return;
      }

      // Update item quantity
      const response = await fetch(`${API_URL}/cart/update/${cartItemId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newQuantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item quantity');
      }

      // Fetch cart items again to refresh the UI
      fetchCartItems();
    } catch (error) {
      console.error('Error updating item quantity:', error);
      // Handle error, show an error message to the user
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        return;
      }

      // Remove item from cart
      await fetch(`${API_URL}/cart/remove/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Fetch cart items again to refresh the UI
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item from cart:', error);
      // Handle error, show an error message to the user
    }
  };

  // Calculate total price for an individual item
  const calculateItemTotal = (price, quantity) => price * quantity;

  // Calculate total price for all items in the cart
  const calculateTotalPrice = () => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return 0; // Return 0 if cartItems is not an array or is empty
    }
  
    return cartItems.reduce((total, item) => {
      return total + calculateItemTotal(item.product.price, item.quantity);
    }, 0);
  };

  return (
    <Box w="100%" maxW="70%" mx="auto">
      <Flex>
        {/* Column 1 */}
        <Box flex="2">
          {cartItems && cartItems.map((item) => (
            <Flex key={item.id} mb={4} p={4} borderWidth="1px" borderRadius="md" align="center">
              {/* Subcolumn 1: Image */}
              <Box mr={4}>
                <Image boxSize="200px" src={item.product.images[0].url} alt={item.productId} objectFit="cover" />
              </Box>
              {/* Subcolumn 2: Product Details */}
              <VStack align="start" flex="1">
                <Text fontWeight="bold">{item.product.name}</Text>
                <Text>{`Single Price: $${item.product.price}`}</Text>
                <Text>{`Product ID: ${item.product.id} | Size: ${item.size}`}</Text>
                <Text>{`Total Price: $${calculateItemTotal(item.product.price, item.quantity)}`}</Text>
                {/* Quantity Controls */}
                <HStack>
                  <IconButton
                    onClick={() => handleAmountChange(item.id, item.quantity - 1)}
                    aria-label="Decrease"
                    icon={<MinusIcon />}
                    variant="ghost"
                    colorScheme="blue"
                    size="sm"
                  />
                  <Input
                    type="number"
                    value={item.quantity}
                    readOnly
                    size="sm"
                    w="40px"
                    textAlign="center"
                  />
                  <IconButton
                    onClick={() => handleAmountChange(item.id, item.quantity + 1)}
                    aria-label="Increase"
                    icon={<AddIcon />}
                    variant="ghost"
                    colorScheme="blue"
                    size="sm"
                  />
                </HStack>
              </VStack>
              {/* Subcolumn 3: Remove Button */}
              <Box ml="auto">
                <IconButton
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label="Remove"
                  icon={<DeleteIcon />}
                  variant="ghost"
                  colorScheme="red"
                  size="sm"
                />
              </Box>
            </Flex>
          ))}
        </Box>

        {/* Column 2: Cart Price Summary and Order Button */}
        <Box flex="1" pl={4}>
          <VStack spacing={4}>
            <Box p={4} borderWidth="1px" borderRadius="md" w="100%">
              <Text fontSize="lg">Cart Value:</Text>
              <Text fontWeight="semibold">${calculateTotalPrice()}</Text>
            </Box>
            <Button colorScheme="teal" w="100%">
              Proceed to Finalize the Order
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};
export default Cart;