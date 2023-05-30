import AddUser from '@/components/AddUser/AddUser';
import PostView from '@/components/PostView';
import { fetcher } from '@/lib/fetcher';
import {
  Box,
  Button,
  Flex,
  Img,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { FC, useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import {  MdDelete } from 'react-icons/md';
import useSWR from 'swr';

const Posts: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectPost, setSelectPost] = useState<any>();

  const { data: posts, mutate } = useSWR(
    'http://localhost:9000/api/post',
    fetcher
  );
console.log(posts)

  const deletePost = async (post: any) => {
    try {
      await fetch(`http://localhost:9000/api/deletePost/${post.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json());
      await mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p="4" pt={16}>
      <Box>
        <TableContainer>
          <Table
            variant="striped"
            colorScheme="blue"
            bg={'white'}
            rounded={'lg'}
          >
            <Thead>
              <Tr>

                <Th>User</Th>
                <Th>Title</Th>
                <Th>Email</Th>
                <Th>createdAt</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts?.map((post: any, index: any) => (
                <Tr key={index} h={'60px'}>
                  <Td h={'60px'} display={'flex'} alignItems={'center'}>
                    {post.user.name}
                  </Td>
                  <Td>{post.title}</Td>
                  <Td>{post.user.email}</Td>
                  <Td>
                    {format(new Date(post.createdAt), 'yyyy-MM-dd , HH:mm')}
                  </Td>
                  <Td display={'flex'} alignItems={'center'} h={'60px'}>
                    <Button variant={'unstyled'}>
                      <AiFillEye
                        onClick={() => {
                          setSelectPost(post);
                          setIsOpen(true);
                        }}
                      />
                    </Button>
                    <Popover>
                      <PopoverTrigger>
                        <Button variant={'unstyled'}>
                          <MdDelete />
                        </Button>
                      </PopoverTrigger>
                      <Portal>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverHeader>Are you sur ?</PopoverHeader>
                          <PopoverCloseButton />
                          <PopoverBody>
                            <Button
                              colorScheme="blue"
                              onClick={() => deletePost(post)}
                            >
                              Yes
                            </Button>
                          </PopoverBody>
                        </PopoverContent>
                      </Portal>
                    </Popover>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <PostView
        isOpen={isOpen}
        selectPost={selectPost}
        onClose={() => {
          setSelectPost(undefined);
          setIsOpen(false);
        }}
      />
    </Box>
  );
};

export default Posts;
