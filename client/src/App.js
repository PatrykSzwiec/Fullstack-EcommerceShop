import React, { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/views/Navbar/Navbar';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import NotFound from './components/pages/NotFound/NotFound';
import Account from './components/pages/Account/Account';
import ProductOverView from './components/pages/ProductOverView/ProductOverView';
import Cart from './components/pages/Cart/Cart';
import { useDispatch } from 'react-redux';
import { logIn } from './redux/usersRedux';
import { API_URL } from './config';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserFromToken = async () => {
      try {
        console.log('Fetching user...');
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await fetch(`${API_URL}/auth/user`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
            },
          });
  
          if (response.ok) {
            const user = await response.json();
            // Dispatch login action with user details retrieved from the server
            dispatch(logIn(user)); // Modify as per your Redux action structure
          } else {
            // Handle invalid token or other errors
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
  
    fetchUserFromToken();
  }, [dispatch]);

  return (
    <ChakraProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/product/:id" element={<ProductOverView />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;