import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Flex, IconButton, Container, Image, useDisclosure } from '@chakra-ui/react';
import { AiOutlineMenu, AiOutlineSearch, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import HamburgerMenu from '../../features/HamburgerMenu/HamburgerMenu';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box p={4} w="100%">
      <Container maxW="70%">
        <Flex align="center" justify="space-between">
          <Box>
            <IconButton
              aria-label="Options"
              icon={<AiOutlineMenu />} // Use AiOutlineMenu for hamburger icon
              variant="ghost"
              onClick={onOpen}
              fontSize="2.5rem"
            />
          </Box>

          <Heading as="h1" size="lg">
            <Link to="/">
              <Image src="/logo.png" alt="Your logo" />
            </Link>
          </Heading>

          <HamburgerMenu isOpen={isOpen} onClose={onClose} />

          <Flex align="center">
            <IconButton
              aria-label="Search"
              icon={<AiOutlineSearch />}
              variant="ghost"
              mr={2}
              fontSize="2.5rem"
            />
            <IconButton
              aria-label="Account"
              icon={<AiOutlineUser />}
              variant="ghost"
              mr={2}
              fontSize="2.5rem"
            />
            <IconButton
              aria-label="Cart"
              icon={<AiOutlineShoppingCart />}
              variant="ghost"
              fontSize="2.5rem"
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;