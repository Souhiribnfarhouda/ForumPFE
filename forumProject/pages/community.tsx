import CommunityModal from '@/components/CommunityModal/CommunityModal';
import { fetcher } from '@/lib/fetcher';
import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import useSWR from 'swr';

const Community = () => {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCommunity, setSelectedCommunity] = useState<any>();

  const { data: communities, mutate } = useSWR<any[]>(
    session?.user.id
      ? 'http://localhost:9000/api/community/' + session?.user.id
      : null,
    fetcher
  );

  return (
    <Box minH="100vh" w="calc(100vw - 800px)">
      <Flex w="full" mb="2" justifyContent={'flex-end'}>
        <Button
          variant="solid"
          colorScheme="blue"
          onClick={() => {
            setSelectedCommunity(undefined);
            setIsOpen(true);
          }}
        >
          Ajouter une communiter
        </Button>
      </Flex>
      <TableContainer w="full">
        <Table bg={'white'}>
          <Thead>
            <Tr>
              <Th>Nom</Th>
              <Th>Propriétaire</Th>
              <Th>Mon role</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {communities?.map((community, index) => (
              <Tr key={index}>
                <Td>{community.name}</Td>
                <Td>{community.owner.name}</Td>
                <Td>
                  {community.ownerId === session?.user.id
                    ? 'Propriétaire'
                    : 'Membre'}
                </Td>
                <Td>
                  {session?.user.id === community.owner.id && (
                    <>
                      <Button
                        variant="unstyled"
                        onClick={() => {
                          setSelectedCommunity(community);
                          setIsOpen(true);
                        }}
                      >
                        <MdEdit />
                      </Button>
                      <Button
                        variant="unstyled"
                        onClick={async () => {
                          await axios.delete(
                            'http://localhost:9000/api/community/' +
                              community?.id
                          );
                          await mutate();
                        }}
                      >
                        <MdDelete color="red" />
                      </Button>
                    </>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <CommunityModal
        selectedCommunity={selectedCommunity}
        isOpen={isOpen}
        onClose={() => {
          setSelectedCommunity(undefined);
          setIsOpen(false);
        }}
      />
    </Box>
  );
};

export default Community;
