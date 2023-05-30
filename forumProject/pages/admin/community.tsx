import AddUser from '@/components/AddUser/AddUser';
import MemberView from '@/components/MemberView';
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

const Community: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [members, setMembers] = useState<any>();

  const { data: community, mutate } = useSWR(
    'http://localhost:9000/api/getcommunity',
    fetcher
  );
console.log(community)

  const deleteCommunity = async (community: any) => {
    try {
      await fetch(`http://localhost:9000/api/community/${community.id}`, {
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

                <Th>Group Name</Th>
                <Th>Owner</Th>
                <Th>Status</Th>
                <Th>Member</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {community?.map((item: any, index: any) => (
                <Tr key={index} h={'60px'}>
                  <Td h={'60px'} display={'flex'} alignItems={'center'}>
                    {item.name}
                  </Td>
                  <Td>{item.owner.name}</Td>
                  <Td>{item.type}</Td>
                  <Td>{item?.members?.length}</Td>
                
                  <Td display={'flex'} alignItems={'center'} h={'60px'}>
                    <Button variant={'unstyled'}>
                      <AiFillEye
                        onClick={() => {
setMembers(item.members)
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
                               onClick={() => deleteCommunity(item)}
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
      <MemberView
        isOpen={isOpen}
        selected={members}
        onClose={() => {
          setMembers(undefined);
          setIsOpen(false);
        }}
      />
    </Box>
  );
};

export default Community;
