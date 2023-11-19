import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Box, Heading, Flex, IconButton, Container, Image, useDisclosure } from '@chakra-ui/react';
import { AiOutlineMenu, AiOutlineSearch, AiOutlineUser, AiOutlineShoppingCart, AiOutlineLogout } from 'react-icons/ai';
import HamburgerMenu from '../../features/HamburgerMenu/HamburgerMenu';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../../redux/usersRedux';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleAccountClick = () => {
    if (user) {
      // User is logged in, navigate to account
      navigate('/account');
    } else {
      // User is not logged in, navigate to login page
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    dispatch(logOut());
    window.location.reload();
  };

  const handleCartNavigation = () => {
    navigate('/cart');
  }

  return (
    <Box p={4} w="100%">
      <Container maxW="70%">
        <Flex align="center" justify="space-between">
          <Box>
            <IconButton
              aria-label="Options"
              icon={<AiOutlineMenu />}
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
              onClick={handleAccountClick}
            />

            {user && (
              <IconButton
                aria-label="Logout"
                icon={<AiOutlineLogout />}
                variant="ghost"
                mr={2}
                fontSize="2.5rem"
                onClick={handleLogout}
              />
            )}
            <IconButton
              aria-label="Cart"
              icon={<AiOutlineShoppingCart />}
              variant="ghost"
              fontSize="2.5rem"
              onClick={handleCartNavigation}
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;