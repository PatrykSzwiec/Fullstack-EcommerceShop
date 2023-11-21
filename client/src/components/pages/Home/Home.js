import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, Spinner, Alert, Button, Center, Container } from '@chakra-ui/react';
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
      dispatch(setProducts([])); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    //console.log(products);
    fetchProducts();
  }, [dispatch]);

  return (
    <Center>
      <Box p={4} w="100%" position="sticky" top="0" zIndex="sticky">
        <Container maxW="70%">
          {isLoading ? (
            <Spinner size="xl" />
          ) : (
            <Grid templateColumns="repeat(auto-fill, minmax(20%, 1fr))" gap={6}>
              {products.map((product) => (
                <SingleProduct key={product.id} product={product} />
              ))}
            </Grid>
          )}

          {!isLoading && error && (
            <Alert status="error" mt={4}>
              Failed to fetch products. Please try again later.
            </Alert>
          )}

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
        </Container>
      </Box>
    </Center>
  );
};

export default Home;