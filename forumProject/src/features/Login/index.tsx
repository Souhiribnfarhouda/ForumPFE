import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  GridItem,
  Center,
  Divider,
  Grid,
  VStack,
} from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { BsGithub, BsLinkedin, BsFacebook, BsApple } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

const avatars = [
  {
    name: 'Ryan Florence',
    url: 'https://bit.ly/ryan-florence',
  },
  {
    name: 'Segun Adebayo',
    url: 'https://bit.ly/sage-adebayo',
  },
  {
    name: 'Kent Dodds',
    url: 'https://bit.ly/kent-c-dodds',
  },
  {
    name: 'Prosper Otemuyiwa',
    url: 'https://bit.ly/prosper-baba',
  },
  {
    name: 'Christian Nwamba',
    url: 'https://bit.ly/code-beast',
  },
];

export default function Login() {

    const router = useRouter();
  const { data: session } = useSession();
  const inputRef = useRef(null);

  const handleLinkClick = (event: any) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    inputRef.current.select();
  };

  if (session) {
    router.push('/');

  }
  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}>
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
            Senior web designers{' '}
            <Text
              as={'span'}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text">
              &
            </Text>{' '}
            Full-Stack Developers
          </Heading>
          <Stack direction={'row'} spacing={4} align={'center'}>
          
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  size={ 'lg'}
                  position={'relative'}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bgGradient: 'linear(to-bl, red.400,#1c9fe8',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
              +
            </Text>
            <Flex
              align={'center'}
              justify={'center'}
              fontFamily={'heading'}
              fontSize={{ base: 'sm', md: 'lg' }}
              bg={'gray.800'}
              color={'white'}
              rounded={'full'}
              minWidth={'60px' }
              minHeight={'60px' }
              position={'relative'}
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0,
              }}>
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack

          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}>
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={ '4xl' }>
              Join our team
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text">
                !
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              We’re looking for amazing engineers just like you! Become a part
              of our rockstar engineering team and skyrocket your career!
            </Text>
          </Stack>
       <VStack>
              <Text
                bgGradient="linear(to-b, #1c9fe8, #7642eb)"
                bgClip="text"
                fontSize="3xl"
                fontWeight="bold"
              >
                Sign up / Log in
              </Text>
              <Grid
                templateColumns="repeat(2, 1fr)"
                justifyContent="center"
                alignItems="center"
                autoFlow="row dense"
              >
                <GridItem colSpan={{ base: 2, sm: 2, lg: 1 }}>
                  <Center p={2}>
                    <Button
                      w={'full'}
                      py={{ base: 6 }}
                      px={{ base: 12 }}
                      maxW={'md'}
                      onClick={() => signIn('google')}
                      bg={'white'}
                      _hover={{ textColor: 'black', bg: '#EDF2F7' }}
                      variant={'outline'}
                      rounded={'full'}
                      leftIcon={<FcGoogle />}
                    >
                      <Center>
                        <Text>Sign in with Google</Text>
                      </Center>
                    </Button>
                  </Center>
                </GridItem>{' '}
                <GridItem colSpan={{ base: 2, sm: 2, lg: 1 }}>
                  <Center p={2}>
                    <Button
                      w={'full'}
                      py={6}
                      px={12}
                      maxW={'md'}
                      onClick={() => signIn('facebook')}
                      bg={'white'}
                      _hover={{ textColor: 'black', bg: '#EDF2F7' }}
                      variant={'outline'}
                      rounded={'full'}
                      leftIcon={<BsGithub />}
                    >
                      <Center>
                        <Text>Sign in with Github</Text>
                      </Center>
                    </Button>
                  </Center>
                </GridItem>{' '}
                <GridItem colSpan={{ base: 2, sm: 2, lg: 1 }}>
                  <Center p={2}>
                    <Button
                      w={'full'}
                      py={6}
                      px={12}
                      maxW={'md'}
                      onClick={() => signIn('github')}
                      bg={'white'}
                      _hover={{ textColor: 'black', bg: '#EDF2F7' }}
                      variant={'outline'}
                      rounded={'full'}
                      leftIcon={<BsLinkedin color="blue" />}
                    >
                      <Center>
                        <Text>Sign in with Linkedin</Text>
                      </Center>
                    </Button>
                  </Center>
                </GridItem>{' '}
                <GridItem colSpan={{ base: 2, sm: 2, lg: 1 }}>
                  <Center p={2}>
                    <Button
                      w={'full'}
                      py={6}
                      px={12}
                      maxW={'md'}
                      onClick={() => signIn('linkedin')}
                      bg={'white'}
                      _hover={{ textColor: 'black', bg: '#EDF2F7' }}
                      variant={'outline'}
                      rounded={'full'}
                      leftIcon={<BsFacebook color="blue" />}
                    >
                      <Center>
                        <Text>Sign in with Facebook</Text>
                      </Center>
                    </Button>
                  </Center>
                </GridItem>{' '}
                <GridItem colSpan={2}>
                  <Center p={2}>
                    <Button
                      w={300}
                      py={6}
                      px={12}
                      maxW={'md'}
                      onClick={() => signIn('apple')}
                      bg={'white'}
                      _hover={{ textColor: 'black', bg: '#EDF2F7' }}
                      variant={'outline'}
                      rounded={'full'}
                      leftIcon={<BsApple />}
                    >
                      <Center>
                        <Text>Sign in with Apple</Text>
                      </Center>
                    </Button>
                  </Center>
                </GridItem>
              </Grid>
              <Divider w={'80%'} />
            
            
            </VStack>
        </Stack>
      </Container>
      <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(70px)' }}
      />
    </Box>
  );
}

export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={'30vw' }
      zIndex={ 0 }
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle cx="71" cy="61" r="111" fill="#1c9fe8" />
      <circle cx="244" cy="106" r="139" fill="#1c9fe8" />
      <circle cy="291" r="139" fill="#1c9fe8" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#1c9fe8" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#1c9fe8" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#1c9fe8" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#1c9fe8" />
    </Icon>
  );
};