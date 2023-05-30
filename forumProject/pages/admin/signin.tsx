import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Img,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Signin = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const submitForm = async () => {
    try {
      const response = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
      });

      if (!response?.error) {
        return router.push('/admin');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box overflow={'hidden'} w={"100vw"} position={"absolute"}   bgImage="url('/adminBGPF.jpg')"
      bgSize="cover"
      bgPosition="center">
      <Box
        display={"flex"}
        flexDirection={"row"}


bg={"white"}
        height={'100vh'}
        width={'500px'}


      >
        <Grid
          templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
          gap={6}
          pt={40}
          justifyContent={'center'}
          display={'flex'}
        >
          <GridItem w={500} maxW={'90%'}>
            <VStack>
     <Img src="/Wisecool logo mini.svg" height="300px"/>

              <Input
                h={'50px'}
                rounded={'full'}
                placeholder="Enter your email address"
                bg={'white'}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                h={'50px'}
                rounded={'full'}
                placeholder="Enter your password"
                type="password"
                bg={'white'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                h={'40px'}
                p={4}
                bg={'#3182ce'}
                rounded={'full'}
                w={60}
                textColor={'white'}
                onClick={submitForm}
              >
                Submit
              </Button>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default Signin;
