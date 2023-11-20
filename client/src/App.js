import React from 'react';
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

function App() {

  return (
    <ChakraProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/product/:id" element={<ProductOverView />} />
        <Route path="/cart/:userId" element={<Cart />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;