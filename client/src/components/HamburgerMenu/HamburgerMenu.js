import React from 'react';
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Box, List, ListItem, Text, Flex, Icon } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

const HamburgerMenu = ({ isOpen, onClose }) => {
  const defaultSize = window.innerWidth > 768 ? 'lg' : 'xs';

  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={defaultSize}>
      <DrawerOverlay />
      <DrawerContent bg="black" color="white">
        <DrawerCloseButton />
        <DrawerBody>
          <List spacing={4} mt={4} ml={4}>
            <ListItem>
              <Text fontSize="lg" fontWeight="bold">Men's zone</Text>
              <List ml={4} mt={2}>
                <ListItem _hover={{ color: 'orange.300' }} display="flex" alignItems="center">
                  <Icon as={ChevronRightIcon} />
                  <Text>T-Shirts</Text>
                </ListItem>
                <ListItem _hover={{ color: 'orange.300' }} display="flex" alignItems="center">
                  <Icon as={ChevronRightIcon} />
                  <Text>Headwear</Text>
                </ListItem>
                <ListItem _hover={{ color: 'orange.300' }} display="flex" alignItems="center">
                  <Icon as={ChevronRightIcon} />
                  <Text>Tops</Text>
                </ListItem>
                <ListItem _hover={{ color: 'orange.300' }} display="flex" alignItems="center">
                  <Icon as={ChevronRightIcon} />
                  <Text>Bottoms</Text>
                </ListItem>
              </List>
            </ListItem>
            <ListItem>
              <Text fontSize="lg" fontWeight="bold">Woman zone</Text>
              <List ml={4} mt={2}>
                <ListItem _hover={{ color: 'orange.300' }} display="flex" alignItems="center">
                  <Icon as={ChevronRightIcon} />
                  <Text>T-Shirts</Text>
                </ListItem>
                <ListItem _hover={{ color: 'orange.300' }} display="flex" alignItems="center">
                  <Icon as={ChevronRightIcon} />
                  <Text>Headwear</Text>
                </ListItem>
                <ListItem _hover={{ color: 'orange.300' }} display="flex" alignItems="center">
                  <Icon as={ChevronRightIcon} />
                  <Text>Tops</Text>
                </ListItem>
                <ListItem _hover={{ color: 'orange.300' }} display="flex" alignItems="center">
                  <Icon as={ChevronRightIcon} />
                  <Text>Bottoms</Text>
                </ListItem>
                <ListItem _hover={{ color: 'orange.300' }} display="flex" alignItems="center">
                  <Icon as={ChevronRightIcon} />
                  <Text>Dresses</Text>
                </ListItem>
              </List>
            </ListItem>
            <ListItem _hover={{ color: 'orange.300' }}>
              <Text fontSize="lg" fontWeight="bold">Help Center</Text>
            </ListItem>
            <ListItem _hover={{ color: 'orange.300' }}>
              <Text fontSize="lg" fontWeight="bold">Newsletter</Text>
            </ListItem>
            <ListItem _hover={{ color: 'orange.300' }}>
              <Text fontSize="lg" fontWeight="bold">Follow Us</Text>
              <List ml={4} mt={2}>
                <ListItem _hover={{ color: 'orange.300' }}>
                  <Text>Instagram</Text>
                </ListItem>
                <ListItem _hover={{ color: 'orange.300' }}>
                  <Text>Facebook</Text>
                </ListItem>
              </List>
            </ListItem>
          </List>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default HamburgerMenu;