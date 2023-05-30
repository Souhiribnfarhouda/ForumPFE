import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  CardBody,
  Card,
  Box,
  Stack,
  Flex,
  Avatar,
  Heading,
  IconButton,
  Img,
  TableContainer,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Parser from 'html-react-parser';
import { MdEdit, MdDelete } from 'react-icons/md';
interface Props {
  isOpen: boolean;
  selected: any;
  onClose: any;
}

const PostView: FC<Props> = ({ isOpen, selected, onClose }) => {
  console.log(selected)
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <TableContainer>
  <Table variant='striped' colorScheme="blue" bg={"white"} rounded={"lg"}>

    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Email</Th>
                <Th>Role</Th>

                
      </Tr>
    </Thead>
    <Tbody>
      {selected?.map((member:any, index:any) => (
              <Tr key={index}>
                <Td display={"flex"} flexDirection={"row"} alignItems={"center"} gap={2}><Img src={member?.user?.image}  h={"32px"} w={"32px"} rounded={"full"} />{member?.user?.name}</Td>
                <Td>{member?.user?.email}</Td>
                <Td>{member?.user?.role}</Td>
             
              </Tr>
            ))}
    
    </Tbody>
   
  </Table>
</TableContainer>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent> 
    </Modal>
  );
};

export default PostView;
