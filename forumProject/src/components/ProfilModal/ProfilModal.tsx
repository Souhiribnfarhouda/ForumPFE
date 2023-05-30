import { fetcher } from '@/lib/fetcher';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  Box,
  Flex,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import e from 'express';

const ProfilModal = ({ isOpen, onClose }: any) => {
  const { data: session } = useSession();

  const { data: user } = useSWR(
    session?.user.id
      ? 'http://localhost:9000/api/user/' + session?.user.id
      : null,
    fetcher
  );

  const [name, setName] = useState<string>();
  const [bio, setBio] = useState<string>();

  useEffect(() => {
    if (!isOpen) return;

    setName(user.name);
    setBio(user.bio);
  }, [isOpen, user]);

  const onSubmit = async () => {
    await axios.put('http://localhost:9000/api/user/' + user?.id, {
      name,
      bio,
    });

    await mutate('http://localhost:9000/api/user/' + session?.user.id);
    await mutate('http://localhost:9000/api/user');


    setName('');
    setBio('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update profil</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nom</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              border={'1px'}
              bg={'white'}
              borderColor={'gray.200'}
              placeholder="nom"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              border={'1px'}
              bg={'white'}
              borderColor={'gray.200'}
              placeholder="nom"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue" onClick={onSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfilModal;
