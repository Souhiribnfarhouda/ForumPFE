import { Flex, HStack, Img, Text } from '@chakra-ui/react';
import React from 'react';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <HStack
      bg="white"
      height="60px"
      padding="6px 12px"
      borderColor="black"
      shadow={'md'}
      position={'sticky'}
      justifyContent={'space-between'}
    >
      <Flex align="center" height="60px" mr="40px">
       
       <Link href={"/"}><Img src="/Wisecool logo mini.svg" height="60px"/></Link>
       <Text fontSize='2xl' color={'#0466c8'} as={'i'}>Wisecool</Text>
      </Flex>
      <SearchInput />
      <RightContent />
      {/* <Directory/> */}
    </HStack>
  );
};
export default Navbar;
