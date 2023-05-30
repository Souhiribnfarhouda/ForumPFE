import { Flex, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';

const Navbar: React.FC = () => {
  return (
    <HStack
      bg="white"
      height="80px"
      padding="6px 12px"
      borderColor="black"
      shadow={'lg'}
      position={'sticky'}
      justifyContent={'space-between'}
    >
      <Flex align="center" height="30px" mr="40px">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
      </Flex>

      <RightContent />
    </HStack>
  );
};
export default Navbar;
