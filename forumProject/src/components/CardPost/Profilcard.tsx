import React, { FC, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  IconButton,
  Img,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import {
  BsBookmark,
  BsFillBookmarkFill,
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
import { MdDelete } from 'react-icons/md';
import axios from 'axios';

interface Props {
  item: any;
}

const Profilcard: FC<Props> = ({ item }) => {
  const { data: session } = useSession();
  const [height, setHeight] = useState<Height>(0);

  const [like, setLike] = useState(false);
  const [tag, setTag] = useState(false);
  const [content, setContent] = useState('');

  const { data: comments } = useSWR(
    `http://localhost:9000/api/comment/${item.id}`,
    fetcher
  );
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

  return (
    <Card maxW="3xl" textAlign={'left'}>
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
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="Segun Adebayo" src={item?.user.image} />

              <Box>
                <Heading size="sm">{item?.user.name}</Heading>
                <p>Creator, Chakra UI</p>
              </Box>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<MdDelete />}
              onClick={async () => {
                await axios.delete('http://localhost:9000/api/post/' + item.id);
                await mutate(
                  `http://localhost:9000/api/post/${session?.user.id}`
                );
              }}
            />
          </Flex>
          <Heading size="md">{item?.title}</Heading>
          <p>{Parser(item?.content ?? '')}</p>
        </Stack>
      </CardBody>
      <CardFooter
        bg={'#f1f1f1'}
        justify="space-between"
        flexWrap="wrap"
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Button
          flex="1"
          variant="ghost"
          onClick={() => setLike(!like)}
          leftIcon={like ? <AiTwotoneLike /> : <AiOutlineLike />}
        >
          Reactions
        </Button>
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
          onClick={() => setTag(!tag)}
          leftIcon={tag ? <BsFillBookmarkFill /> : <BsBookmark />}
        ></Button>
      </CardFooter>
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

export default Profilcard;
