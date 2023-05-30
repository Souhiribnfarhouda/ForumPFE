import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  HStack,
  Heading,
  IconButton,
  Img,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  BsBookmark,
  BsCheck,
  BsFillBookmarkFill,
  BsPlusLg,
  BsThreeDotsVertical,
} from 'react-icons/bs';
import { AiOutlineComment, AiOutlineLike, AiTwotoneLike } from 'react-icons/ai';
import AnimateHeight, { Height } from 'react-animate-height';

import Parser from 'html-react-parser';
import { json } from 'stream/consumers';
import { useSession } from 'next-auth/react';
import CommentsCard from '../CommentsCard';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/lib/fetcher';
import axios from 'axios';

interface Props {
  item: any;
}

const CardPost: FC<Props> = ({ item }) => {
  const { data: session } = useSession();
  const [height, setHeight] = useState<Height>(0);
  const initialFocusRef = React.useRef();
  const [like, setLike] = useState(false);
  const [tag, setTag] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');

  const { data: comments } = useSWR(
    `http://localhost:9000/api/comment/${item.id}`,
    fetcher
  );


  const storedArray = typeof window !== 'undefined' ? JSON.parse(localStorage?.getItem("Tag") as string) : []
  
  const handleTag = useCallback(() => {

  const storedArray = typeof window !== 'undefined' ? JSON.parse(localStorage?.getItem("Tag") as string) : [];
  const index = storedArray?.indexOf(item?.id);

  if (index === -1) {
    // If the element is not in the array, add it
    storedArray.push(item?.id);
    setTag(true);
  } else {
    // If the element is in the array, remove it
    storedArray.splice(index, 1);
    setTag(false);
  }

  localStorage.setItem("Tag", JSON.stringify(storedArray));
}, [item, setTag]);



  useEffect(() => {

    const index = storedArray?.indexOf(item?.id);
    if (index === -1) {
      setTag(false);
    } else {
      setTag(true);
    }
  }, [item?.id]);

  useEffect(() => {
    console.log(item?.community?.members)

    const userInCommunity = item?.community?.members.some((member: any) => member.userId === session?.user.id)
    setIsJoined(userInCommunity)
  }, [item?.community?.members, session?.user?.id])

  const handleSubmit = async (e: any) => {
    if (content?.length) {
      const body = {
        content,
        postId: item.id,
        userId: session?.user.id,
        userImg: session?.user.image,
        userName: session?.user.name,
        userEmail: session?.user.email,
      };
      try {
        await fetch('http://localhost:9000/api/comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        await mutate(`http://localhost:9000/api/comment/${item.id}`);
        setContent('');
      } catch (error) {
        console.error(error);
      }
    } else {
      return;
    }
  };

  const likeReaction = async (e: any) => {
    try {
      const response = await axios.put(
        `http://localhost:9000/api/post/${item.id}/likeReaction`,
        { userId: session?.user.id, reaction: e }
      );
      const data = response.data;

      await mutate(
        'http://localhost:9000/api/post?userId=' + (session?.user.id || '')
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const sadReaction = async (e: any) => {
    try {
      const response = await axios.put(
        `http://localhost:9000/api/post/${item.id}/sadReaction`,
        { userId: session?.user.id, reaction: e }
      );
      const data = response.data;

      await mutate(
        'http://localhost:9000/api/post?userId=' + (session?.user.id || '')
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const angryReaction = async (e: any) => {
    try {
      const response = await axios.put(
        `http://localhost:9000/api/post/${item.id}/angryReaction`,
        { userId: session?.user.id, reaction: e }
      );
      const data = response.data;
      await mutate(
        'http://localhost:9000/api/post?userId=' + (session?.user.id || '')
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const loveReaction = async (e: any) => {
    try {
      const response = await axios.put(
        `http://localhost:9000/api/post/${item.id}/loveReaction`,
        { userId: session?.user.id, reaction: e }
      );
      const data = response.data;
      await mutate(
        'http://localhost:9000/api/post?userId=' + (session?.user.id || '')
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card maxW="3xl">
      <CardBody>
        <Box
          w={'100%'}
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'center'}
        >
          <Img
            src={item?.imageUrl}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            height={'300px'}
          />
        </Box>
        <Stack mt="6" spacing="3">
          <Flex>
            <Flex flex="1" gap="4">
              <Avatar name="Segun Adebayo" src={item?.user.image} />

              <Box w={"100%"}>
                <Heading size="sm">{item?.user.name}</Heading>
{item?.community?.members?.length>0? <HStack py={2} justifyContent={"space-between"}>
                <Text>{item.community?.name}</Text>
                  {!session?.user ?"":   <Button isLoading={isLoading} leftIcon={isJoined ? <BsCheck /> : <BsPlusLg />} colorScheme={isJoined ? "gray" : 'messenger'} variant='solid' h={6} rounded={"full"} right={0} onClick={async (e) => {
                    if (!session?.user) return;
                    setIsLoading(true);

                    await axios.put(
                      'http://localhost:9000/api/community/' +
                        item.community?.id,
                      {
                        ...item.community,
                        id: undefined,
                        members: [
                          ...item.community.members,
                          ...(!item.community.members.find(
                            (e: any) => e.userId === session.user.id
                          )
                            ? [{ userId: session?.user.id, type: 'student' }]
                            : []),
                        ],
                      }
                 
                    );   setIsLoading(false);
                    await mutate(
                      'http://localhost:9000/api/post?userId=' +
                        (session?.user.id || '')
                    )
                  }} isDisabled={isJoined}>
   {isJoined?"member":"Join"} 
                </Button>}
               
                </HStack>:"" }
               
            
              </Box>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<BsThreeDotsVertical />}
            />
          </Flex>
          <Heading size="md">{item?.title}</Heading>
          <p>{Parser(item?.content)}</p>
        </Stack>
      </CardBody>
      <Divider color={'gray.300'} />
      {session?.user.id.length && (
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <Popover placement="bottom" closeOnBlur={false}>
            <PopoverTrigger>
              <Button
                flex="1"
                variant="ghost"
                leftIcon={like ? <AiTwotoneLike /> : <AiOutlineLike />}
              >
                Reactions
              </Button>
            </PopoverTrigger>
            <PopoverContent
              color="white"
              bg="gray.200"
              w={'auto'}
              rounded={'full'}
            >
              <PopoverFooter
                border="0"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={4}
              >
                <HStack>
                  <VStack>
                    <Avatar
                      name="like"
                      src={'/like.png'}
                      size={'xs'}
                      onClick={(e: any) => likeReaction(e.target.alt)}
                    />
                    <Text textColor={'black'} fontSize={'sm'}>
                      {item?.reaction?.filter((e: any) => e.type === 'like')
                        ?.length || 0}
                    </Text>
                  </VStack>
                  <VStack>
                    {' '}
                    <Avatar
                      name="angry"
                      src={'/angry.png'}
                      size={'xs'}
                      onClick={(e: any) => angryReaction(e.target.alt)}
                    />
                    <Text textColor={'black'} fontSize={'sm'}>
                      {item?.reaction?.filter((e: any) => e.type === 'angry')
                        ?.length || 0}
                    </Text>
                  </VStack>
                  <VStack>
                    {' '}
                    <Avatar
                      name="love"
                      src={'/love.png'}
                      size={'xs'}
                      onClick={(e: any) => loveReaction(e.target.alt)}
                    />
                    <Text textColor={'black'} fontSize={'sm'}>
                      {item?.reaction?.filter((e: any) => e.type === 'love')
                        ?.length || 0}
                    </Text>
                  </VStack>
                  <VStack>
                    <Avatar
                      name="sad"
                      src={'/sad.png'}
                      size={'xs'}
                      onClick={(e: any) => sadReaction(e.target.alt)}
                    />
                    <Text textColor={'black'} fontSize={'sm'}>
                      {item?.reaction?.filter((e: any) => e.type === 'sad')
                        ?.length || 0}
                    </Text>
                  </VStack>
                </HStack>
              </PopoverFooter>
            </PopoverContent>
          </Popover>

          <Button
            flex="1"
            variant="ghost"
            leftIcon={<AiOutlineComment />}
            onClick={() => {
              setHeight(height === 0 ? 500 : 0);
            }}
          >
            {comments?.length ? comments?.length : ''} Comments
          </Button>
          <Button
            flex="1"
            variant="ghost"
            onClick={() => handleTag()}
            leftIcon={tag ? <BsFillBookmarkFill /> : <BsBookmark />}
          ></Button>
        </CardFooter>
      )}
      <Divider color={'gray.300'} />

      <AnimateHeight id="example-panel" duration={500} height={height}>
        <Box display={'flex'} flexDirection={'column'} height={'100%'}>
          {comments?.length !== 0 ? (
            <Box overflow={'auto'} height={'420px'}>
              {' '}
              {comments?.map((comment: any, key: any) => (
                <CommentsCard key={key} item={comment} />
              ))}
            </Box>
          ) : (
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              justifyContent={'center'}
              height={'420px'}
            >
              no comment
            </Box>
          )}
          <Box
            bottom={0}
            position={'absolute'}
            w={'100%'}
            display={'flex'}
            justifyContent={'center'}
            p={4}
          >
            <InputGroup size="md" w={'90%'}>
              <Input
                pr="4.5rem"
                type={'text'}
                value={content}
                onChange={(e) => setContent(e.target.value as string)}
                placeholder="Enter comment"
              />
              <InputRightElement width="4.5rem" p={2}>
                <Button h="1.75rem" size="sm" p={2} onClick={handleSubmit}>
                  Publish
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
      </AnimateHeight>
    </Card>
  );
};

export default CardPost;
