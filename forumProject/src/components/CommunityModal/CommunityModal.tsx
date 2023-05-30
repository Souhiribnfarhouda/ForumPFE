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
  Flex,
} from '@chakra-ui/react';
import Select from 'react-select';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import useSWR, { mutate } from 'swr';
import axios from 'axios';

const CommunityModal = ({ isOpen, selectedCommunity, onClose }: any) => {
  const { data: session } = useSession();

  const { data: users } = useSWR<any[]>(
    'http://localhost:9000/api/user',
    fetcher
  );

  const [name, setName] = useState<string>();
  const [type, setType] = useState<string>();
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    if (selectedCommunity) {
      setName(selectedCommunity.name);
      setType(selectedCommunity.type);
      setMembers(
        selectedCommunity.members.map((m: any) => ({
          userId: m.userId,
          type: m.type,
        }))
      );
    } else {
      setName('');
      setType('');
      setMembers([]);
    }
  }, [isOpen, selectedCommunity]);

  const onSubmit = async () => {
    if (selectedCommunity?.id)
      await axios.put(
        'http://localhost:9000/api/community/' + selectedCommunity?.id,
        {
          name,
          type,
          members,
          ownerId: session?.user.id,
        }
      );
    else
      await axios.post('http://localhost:9000/api/community', {
        name,
        type,
        members,
        ownerId: session?.user.id,
      });
    await mutate('http://localhost:9000/api/community/' + session?.user.id);
    setName('');
    setType('');
    setMembers([]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {selectedCommunity?.id ? 'Update' : 'Ajouter'} une communiter
        </ModalHeader>
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
            <FormLabel>Type</FormLabel>
            <Select
              value={type ? { label: type, value: type } : undefined}
              placeholder="Select ..."
              onChange={(option: any) => setType(option.value)}
              options={[
                { label: 'prive', value: 'prive' },
                { label: 'public', value: 'public' },
              ]}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Members</FormLabel>
            <Select
              value={''}
              onChange={(option: any) => {
                setMembers([
                  ...members,
                  { userId: option.value, type: 'student' },
                ]);
              }}
              placeholder="Select user"
              isSearchable={true}
              options={
                users
                  ?.filter((u) => !members.find((m) => m.userId === u.id))
                  ?.map((user, index) => ({
                    value: user.id,
                    label: user.name,
                  })) as any
              }
            />
            {members.map((member, index) => {
              const memberUser = users?.find((e) => e.id === member.userId);

              return (
                <Flex
                  w="full"
                  pl="2"
                  mt="1"
                  justifyContent={'space-between'}
                  alignItems="center"
                  key={index}
                >
                  <p style={{ margin: 0, width: 200 }}>{memberUser?.name}</p>

                  <Select
                    value={
                      member.type
                        ? { label: member.type, value: member.type }
                        : undefined
                    }
                    onChange={(option: any) => {
                      const data = [...members];
                      data[index].type = option.value;
                      setMembers(data);
                    }}
                    placeholder="Select user"
                    options={[
                      { label: 'student', value: 'student' },
                      { label: 'teacher', value: 'teacher' },
                    ]}
                  />

                  <Button
                    variant="unstyled"
                    display="flex"
                    justifyContent={'center'}
                    alignItems="center"
                    onClick={() =>
                      setMembers(
                        members.filter((e) => e.userId !== member.userId)
                      )
                    }
                  >
                    <MdDelete color="red" />
                  </Button>
                </Flex>
              );
            })}
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

export default CommunityModal;
