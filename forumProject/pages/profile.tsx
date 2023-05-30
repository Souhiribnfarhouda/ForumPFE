import Profilcard from '@/components/CardPost/Profilcard';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { AiOutlineComment } from 'react-icons/ai';
import { FcTodoList } from 'react-icons/fc';
import { FaHashtag } from 'react-icons/fa';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { useEffect, useState } from 'react';
import ProfilModal from '@/components/ProfilModal/ProfilModal';
import { useRouter } from 'next/router';

const Profile = () => {
   const router = useRouter();
  const [editUserModal, setEditModal] = useState(false);
  const { data: session } = useSession();
 const [tag,setTag]=useState(0)


    const storedArray = typeof window !== 'undefined' ? JSON.parse(localStorage?.getItem("Tag") as string) : []

  useEffect(() => {
  setTag(storedArray?.length)
}, [storedArray?.length])
  const { data: user } = useSWR(
    session?.user.id
      ? 'http://localhost:9000/api/user/' + session?.user.id
      : null,
    fetcher
  );

  const { data: comments } = useSWR(
    session?.user.email
      ? `http://localhost:9000/api/post/comment/${session?.user.email}`
      : null,
    fetcher
  );
  const { data: posts } = useSWR(
    session?.user.email
      ? `http://localhost:9000/api/post/${session?.user.id}`
      : null,
    fetcher
  );

  return (
    <Box h={'100vh'} align="center" justify="center" bg={'#f5f5f5'}>
      <Box          bg="url('/profilBG.jpg')"

      backgroundSize="cover"
      backgroundPosition="center" w={'100vw'} h={'300px'} />
      <Flex
        position="relative"
        direction="column"
        align="center"
        justify="center"
        bg={'white'}
        w={'70%'}
        mt={'-150px'}
        p={6}
        rounded={'lg'}
        shadow={'md'}
      >
         <Button
          size="sm"
          position="absolute"
          top={4}
          bg={"#1c9fe8"}
          left={4}
textColor={"white"}

          onClick={() =>router.back()}
        >
<IoReturnUpBackOutline size={22}/>
        </Button>
        <Avatar
          size="xl"
          src={user?.image as string}
          mt={'-80px'}
          border={'4px'}
          borderColor={'black'}
        />
        <Heading mt={4} mb={2}>
          {user?.name}
        </Heading>

        <Text color="gray.500" fontSize="lg">
          Software Developer
        </Text>
        <Box
          mt={6}
          p={6}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
          w="full"
        >
          <Text mb={4}>Bio:</Text>
          <Text>{user?.bio}</Text>
        </Box>
        <Button
          size="sm"
          position="absolute"
          top={4}
          right={4}
          bg={"#1c9fe8"}
textColor={"white"}
          onClick={() => setEditModal(true)}
        >
          Edit
        </Button>
      </Flex>
      <Box>
        <HStack
          pt={'90px'}
          px={'200px'}
          w={'100%'}
          justifyContent={'start'}
          alignItems={'start'}
          bg={'#f5f5f5'}
        >
          <Box w={'300px'}>
            <List
              spacing={8}
              cursor={'pointer'}
              display={'flex'}
              flexDirection={'column'}
              alignItems={'baseline'}
              ml={'60px'}
            >
              <ListItem>
                <ListIcon as={FcTodoList} />
                {posts?.length} post published
              </ListItem>
              <ListItem>
                <ListIcon as={AiOutlineComment} color="green.500" />
                {comments?.length ? comments?.length : 0} comments written
              </ListItem>
              <ListItem>
                <ListIcon as={FaHashtag} color="green.500" />{tag} tags followed
              </ListItem>
            </List>
          </Box>
          <Box>
            {posts?.map((item: any, key: any) => (
              <Profilcard key={key} item={item} />
            ))}
          </Box>
        </HStack>
      </Box>

      <ProfilModal isOpen={editUserModal} onClose={() => setEditModal(false)} />
    </Box>
  );
};

export default Profile;
