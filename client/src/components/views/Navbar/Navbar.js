import React, { useEffect, useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import {
  Box,
  Heading,
  Flex,
  IconButton,
  Container,
  Image,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineMenu, AiOutlineSearch, AiOutlineUser, AiOutlineShoppingCart, AiOutlineLogout } from 'react-icons/ai';
import HamburgerMenu from '../../features/HamburgerMenu/HamburgerMenu';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../../redux/usersRedux';
import getUserIdFromToken from '../../utils/getUserIdFromToken';
import { API_URL } from '../../../config';


const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();
  const [cartItemCount, setCartItemCount] = useState(null);

  useEffect(() => {
    const userId = getUserIdFromToken();

    const fetchCartItemCount = async () => {
      try {
        if (userId) {
          const response = await fetch(`${API_URL}/cart/${userId}`);
          if (response.ok) {
            const cartItems = await response.json();
            setCartItemCount(cartItems.length);
          } else {
            throw new Error('Failed to fetch cart item count');
          }
        }
      } catch (error) {
        console.error('Error fetching cart item count:', error);
      }
    };

    const interval = setInterval(() => {
      fetchCartItemCount();
    }, 1000);
 
    return () => clearInterval(interval);
  }, [user]);

  const handleAccountClick = () => {
    if (user) {
      navigate('/account');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    dispatch(logOut());
    setCartItemCount(0);

    toast({
      title: 'Logging out...',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const handleCartNavigation = () => {
    const userId = getUserIdFromToken();
    navigate(`/cart/${userId}`);
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
            <Box position="relative">
              <IconButton
                aria-label="Cart"
                icon={<AiOutlineShoppingCart />}
                variant="ghost"
                fontSize="2.5rem"
                onClick={handleCartNavigation}
              />
              {cartItemCount !== null && cartItemCount > 0 && (
                <Box
                  position="absolute"
                  top="-8px"
                  right="-8px"
                  borderRadius="50%"
                  bg="red.500"
                  color="white"
                  width="20px"
                  height="20px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontSize="0.8rem"
                  fontWeight="bold"
                  zIndex="1"
                  onClick={handleCartNavigation} // Handle click for the count overlay
                >
                  {cartItemCount}
                </Box>
              )}
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;