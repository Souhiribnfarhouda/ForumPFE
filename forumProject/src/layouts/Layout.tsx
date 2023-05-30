import Navbar from '@/components/Navbar/Navbar';
  Text
import { Box, Center, HStack, Stack, useColorModeValue ,Text, Button, Card, CardBody, CardFooter, Heading, Img, CardHeader, VStack, Divider} from '@chakra-ui/react';
import { List, ListItem, ListIcon } from '@chakra-ui/react';
import { FcAbout, FcBusinessContact, FcCollaboration, FcHome, FcTodoList } from 'react-icons/fc';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { GiOldMicrophone } from 'react-icons/gi';
import { RiFileList3Line } from 'react-icons/ri';
import { SiNounproject } from 'react-icons/si';
import {
  BsEmojiSunglasses,
  BsHandThumbsUp,
  BsShop,
  BsTags,
} from 'react-icons/bs';
import { useRouter } from 'next/router';
import { CheckIcon } from '@chakra-ui/icons';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const {status} = useSession();
  const [tag,setTag]=useState(0)

    const storedArray = typeof window !== 'undefined' ? JSON.parse(localStorage?.getItem("Tag") as string) : []

  useEffect(() => {
  setTag(storedArray?.length)
}, [storedArray?.length])

  return (
    <>
    
      {router?.asPath == '/addPost' ||
      router?.asPath == '/profile' ||
      router?.asPath == '/signin' ||
      router?.asPath == '/admin/signin' ? (
        <Box>{children}</Box>
      ) : (
          <>
              <Box position={'fixed'} top={0} left={0} w={'100%'} zIndex={'99'}>
        <Navbar />
      </Box>
          <Box
              w={'100%'} h={"100vh"}
              overflow={"auto"}
              bg={'#f0f0f0'}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
          >
            <Box w={'300px'} position={'fixed'}  bg="white" pt={"40px"} mt={'60px'} px={"30px"} h={"100%"} >
                <List spacing={8} cursor={'pointer'}>
                <ListItem>
                  <ListIcon as={FcHome} color="green.500" />
                  <Link href={"/"} >Home</Link> 
                  </ListItem>
                  <Divider/>
                <ListItem>
                  <ListIcon as={FcTodoList} color="green.500" />
                <Link href={"/readingList"}>{tag} Reading List</Link> 
                  </ListItem>
                  <Divider/>
                  
                <ListItem>
                  <ListIcon as={FcCollaboration} color="green.500" />
                  <Link href={"/community"}>Community</Link> 
                  </ListItem>
                  <Divider/>
                  
                <ListItem>
                  <ListIcon as={FcAbout} color="green.500" />
                  <Link href={"/about"}>About</Link>
                  </ListItem>
                  <Divider/>
                  
                <ListItem>
                  <ListIcon as={FcBusinessContact} color="green.500" />
                  <Link href={"/contact"}>Contact</Link> 
                  </ListItem>

                  
                <ListItem fontWeight={'black'}>Other</ListItem>
                <ListItem>
                  <ListIcon as={BsHandThumbsUp} color="green.500" />
                  Code of Conduct
                  </ListItem>

                  
                <ListItem>
                  <ListIcon as={BsEmojiSunglasses} color="green.500" />
                  Privacy Policy
                  </ListItem>

                <ListItem>
                  <ListIcon as={SiNounproject} color="green.500" />
                  Terms of use
                </ListItem>
              </List>
            </Box>
            <Box pl={"30%"} pt={'80px'}  >
              {children}
              </Box>
              {status=="authenticated" && router?.asPath !== '/community'?<Box w={"300px"} pt={'80px'} mr={"40px"}> <Card>
                  <Img src='/cover.jpeg' h={"40px"} w={"full"}/>
                <CardHeader>
      <Heading size='md'> Home</Heading>
    </CardHeader>
    <CardBody>
      <Text>Your personal Forum frontpage. Come here to check in with your favorite communities.</Text>
    </CardBody>
    <CardFooter>
                  <VStack w={"100%"}><Button w={"full"} textColor={"white"} bg={"#1c9fe8"}  rounded={"full"}>Create Post</Button>
      <Button w={"full"} variant={"outline"} color={"#1c9fe8"}rounded={"full"}>Community</Button></VStack>
                  
    </CardFooter>
  </Card></Box>:"" }
          </Box>
        </>
      )}
  
    </>
  );
};
export default Layout;
