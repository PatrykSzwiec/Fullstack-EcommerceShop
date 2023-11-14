import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, Spinner, Alert, Button } from '@chakra-ui/react';
import SingleProduct from './../../features/SingleProduct/SingleProduct';
import { setProducts } from './../../../redux/productsRedux';
import { API_URL } from '../../../config';

const Home = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const products = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/product`);
      if (res.ok) {
        const data = await res.json();
        dispatch(setProducts(data));
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      dispatch(setProducts([])); // Clear products in case of an error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(products); // Add this line to check if products are in the state
    fetchProducts();
  }, [dispatch]);

  return (
    <Box p={4} maxWidth="70%" mx="auto" position="sticky" top="0" zIndex="sticky">
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(17.5%, 1fr))" gap={6}>
          {products.map((product) => (
            <SingleProduct key={product.id} product={product} />
          ))}
        </Grid>
      )}

      {/* Display an error message if fetching fails */}
      {!isLoading && error && (
        <Alert status="error" mt={4}>
          Failed to fetch products. Please try again later.
        </Alert>
      )}

      {/* Add a refresh button in case of fetching failure */}
      {!isLoading && error && (
        <Button
          colorScheme="teal"
          mt={4}
          onClick={() => {
            setIsLoading(true);
            fetchProducts();
          }}
        >
          Refresh
        </Button>
      )}
    </Box>
  );
};

export default Home;