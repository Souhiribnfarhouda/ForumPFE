import AddUser from '@/components/AddUser/AddUser';
import ProfilModal from '@/components/ProfilModal/ProfilModal';
import { fetcher } from '@/lib/fetcher';
import {
  Box,
  Button,
  Flex,
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
import React, { FC, useState } from 'react';
import { MdAdd, MdDelete, MdEdit, MdPlusOne } from 'react-icons/md';
import useSWR from 'swr';

const User: FC = () => {
  const [editUserModal, setEditModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectUser, setSelectUser] = useState<any>();

  const { data: users, mutate } = useSWR<any[]>(
    'http://localhost:9000/api/user',
    fetcher
  );

  const deleteUser = async (user: any) => {
    try {
      await fetch('http://localhost:9000/api/user/' + user.id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json());
      await mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p="4">
   
      <Box>
        <TableContainer>
  <Table variant='striped' colorScheme="blue" bg={"white"} rounded={"lg"}>

    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Email</Th>
                <Th>Role</Th>
        <Th>Action</Th>
                
      </Tr>
    </Thead>
    <Tbody>
      {users?.map((user, index) => (
              <Tr key={index}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td display={'flex'} alignItems={'center'} h={53}>
                  <Button variant={'unstyled'}>
                    <MdEdit
                      onClick={() => {
                        setSelectUser(user);
        setEditModal(true)
                      }}
                    />
            </Button>
            <Popover>
  <PopoverTrigger>
<Button variant={'unstyled'}>
                    <MdDelete  />
     </Button>
  </PopoverTrigger>
  <Portal>
    <PopoverContent>
      <PopoverArrow />
      <PopoverHeader>Are you sur ?</PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
        <Button colorScheme='blue' onClick={() => deleteUser(user)}>Yes</Button>
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
     
      <ProfilModal isOpen={editUserModal} onClose={() => setEditModal(false)} />

    </Box>
  );
};

export default User;
