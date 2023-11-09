import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/Navbar/Navbar';
import Article from './components/Article/Article';

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Article title="Sample Article" content="This is a sample article content." />
      {/* Add more content components here */}
    </ChakraProvider>
  );
}

export default App;