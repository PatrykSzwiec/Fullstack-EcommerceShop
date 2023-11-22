import React, { useState } from 'react';
import {
  Box,
  Text,
  Button,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Image,
  Wrap,
  WrapItem,
  useToast,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';
import getUserIdFromToken from '../../utils/getUserIdFromToken';

const Order = () => {
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const totalPrice = location.state?.cartValue || 0;
  const userId = getUserIdFromToken();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    postCode: '',
    city: '',
    address: '',
    country: '',
  });

  const handleSubmit = async () => {

  const areFieldsEmpty = Object.values(formData).some(value => value === '');

  if (areFieldsEmpty) {
    toast({
      title: 'Incomplete Form',
      description: 'Please fill out all fields before placing the order.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
    return; 
  }

    try {
      const orderData = {
        userId,
        ...formData,
        cartItems: cartItems.map(item => ({
          productId: item.productId,
          size: item.size,
          quantity: item.quantity,
          comments: item.comments || '',
        })),
        totalPrice,
      };
      //console.log(totalPrice,'total rpice');
      //console.log('URL:', `${API_URL}/order/add`);
      //console.log('Payload:', orderData);
  
      const response = await fetch(`${API_URL}/order/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (response.ok) {
        const clearCartResponse = await fetch(`${API_URL}/cart/clear/${userId}`, {
          method: 'DELETE',
        });
  
        if (clearCartResponse.ok) {
          toast({
            title: 'Order placed successfully!',
            description: 'Thanks for your order! Details have been sent to your email.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
  
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          console.error('Failed to clear the cart.');
        }
      } else {
        console.error('Failed to save the order.');
      }
    } catch (error) {
      console.error('Error occurred while saving the order:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateItemTotal = (price, quantity) => price * quantity;

  return (
    <Box w="100%" maxW="90%" mx="auto" p={4}>
    <VStack spacing={4} align="stretch">
      <Box borderWidth="1px" borderRadius="md" p={4}>
        {/* Display cart items */}
        {cartItems.length > 0 ? (
          <Wrap spacing={4} align="center" justify="center">
            {cartItems.map((item, index) => (
              <WrapItem
                key={item.id}
                p={2}
                borderWidth="1px"
                borderRadius="md"
                width="90%"
                maxWidth="90%"
              >
                {/* Adjusted content to fit better on mobile */}
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Image
                    boxSize="100px"
                    src={item.product.images[0].url}
                    alt={item.productId}
                    objectFit="cover"
                    mb={2}
                  />
                  <Text fontWeight="bold" fontSize="md" textAlign="center">
                    {item.product.name}
                  </Text>
                  <Text fontSize="sm" textAlign="center">
                    Size: {item.size} | Quantity: {item.quantity}
                  </Text>
                  <Text fontSize="sm" textAlign="center">
                    Price: ${item.product.price}
                  </Text>
                  <Text fontSize="sm" textAlign="center">
                    Total: ${calculateItemTotal(item.product.price, item.quantity)}
                  </Text>
                  <Text fontSize="sm" textAlign="center">
                    Comment: {item.comments}
                  </Text>
                </Box>
              </WrapItem>
            ))}
          </Wrap>
        ) : (
          <Text textAlign="center">No items in the cart.</Text>
        )}
      </Box>
      <Box borderWidth="1px" borderRadius="md" p={4} width="100%">
        {/* Form for contact details */}
        <VStack spacing={4} align="stretch">
          {/* Form for contact details */}
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="surname">
            <FormLabel>Surname</FormLabel>
            <Input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="postCode">
            <FormLabel>Post Code</FormLabel>
            <Input
              type="text"
              name="postCode"
              value={formData.postCode}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="city">
            <FormLabel>City</FormLabel>
            <Input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="address">
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="country">
            <FormLabel>Country</FormLabel>
            <Input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button colorScheme="teal" onClick={handleSubmit}>
            Place Order
          </Button>
        </VStack>
      </Box>
    </VStack>
  </Box>
);
};

export default Order;