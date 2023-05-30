import React, { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Menu,
} from '@chakra-ui/react';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { GrGroup } from 'react-icons/gr';
import { MdGroups, MdLockOutline, MdPeople, MdPersonOutline } from 'react-icons/md';
import {
  MdHomeFilled,
  MdOutlineCastForEducation,
} from 'react-icons/md';
import NavItem from './NavItem';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Sidebar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [navSize, changeNavSize] = useState('large');

  if (status === 'loading') {
    // Show a loading state or a skeleton component
    return <div>Loading...</div>;
  }

  if (!session) {
    // Return a different JSX element or render nothing
    return null;
  }

  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize == 'small' ? '15px' : '30px'}
      w={navSize == 'small' ? '75px' : '200px'}
      flexDir="column"
      bg={'#3182ce'}
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        as="nav"
      >
        <IconButton
          aria-label=""

          background="white"
          mt={5}

          icon={
            navSize == 'small' ? (
              <FcNext color='white' />
            ) : (
              <FcPrevious color='white'/>
            )
          }
          onClick={() => {
            if (navSize == 'small') changeNavSize('large');
            else changeNavSize('small');
          }}
        />
        <NavItem
          navSize={navSize}
          icon={MdHomeFilled}
          title="Home"
          active={router.pathname == '/admin' ? true : false}
          url="/admin"
        />
        <NavItem
          navSize={navSize}
          icon={MdPeople}
          title="Users"
          active={router.pathname == '/admin/user' ? true : false}
          url="/admin/user"
              />
               <NavItem
          navSize={navSize}
          icon={MdOutlineCastForEducation}
          title="Post"
          active={router.pathname == '/admin/posts' ? true : false}
          url="/admin/posts"
        />
          <NavItem
          navSize={navSize}
          icon={MdGroups}
          title="Community"
          active={router.pathname == '/admin/community' ? true : false}
          url="/admin/community"
        />
       
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        mb={4}
      >
        <Divider display={navSize == 'small' ? 'none' : 'flex'} />

        <Menu>
          <MenuButton px={4} py={2} transition="all 0.2s">
            <Flex mt={4} align="center">
              <Avatar size="sm" src="avatar-1.jpg" />
              <Flex
                flexDir="column"
                ml={4}
                display={navSize == 'small' ? 'none' : 'flex'}
              >
                <Heading as="h3" size="sm">
                  {session.user.name}
                </Heading>
                <Text color="gray">user</Text>
              </Flex>
            </Flex>
          </MenuButton>
          <MenuList>
    
            <MenuDivider />

            <MenuItem
              gap={2}
              onClick={() => {
                signOut({ redirect: false });
                router.push('/');
              }}
            >
              <MdLockOutline size={20} />
              Se deconnecter
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
