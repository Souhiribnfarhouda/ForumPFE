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
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Parser from 'html-react-parser';
interface Props {
  isOpen: boolean;
  selectPost: any;
  onClose: any;
}

const PostView: FC<Props> = ({ isOpen, selectPost, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Card>
            <CardBody>
              <Box
                w={'100%'}
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'center'}
              >
                <Img
                  src={selectPost?.imageUrl}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                  height={'500px'}
                />
              </Box>
              <Stack mt="6" spacing="3">
                <Flex>
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar name="Segun Adebayo" src={selectPost?.userImg} />

                    <Box>
                      <Heading size="sm">{selectPost?.userName}</Heading>
                      Creator, Chakra UI
                    </Box>
                  </Flex>
                  <IconButton
                    variant="ghost"
                    colorScheme="gray"
                    aria-label="See menu"
                    icon={<BsThreeDotsVertical />}
                  />
                </Flex>
                <Heading size="md">{selectPost?.title}</Heading>

                {typeof selectPost?.content === 'string'
                  ? Parser(selectPost?.content)
                  : null}
              </Stack>
            </CardBody>
          </Card>
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
