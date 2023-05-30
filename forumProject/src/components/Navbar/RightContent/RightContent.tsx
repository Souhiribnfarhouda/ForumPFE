import CommunityModal from '@/components/CommunityModal/CommunityModal';
import NotificationCard from '@/components/NotificationCard';
import { Button } from '@/components/button/Button';
import { fetcher } from '@/lib/fetcher';
import {
  Avatar,
  Divider,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { TbBellRinging2 } from 'react-icons/tb';
import useSWR from 'swr';

type RightContentProps = {
  // user:any
};

const RightContent: React.FC<RightContentProps> = () => {
  const { data: session, status } = useSession();

  const [isCommunityOpen, setIsCommunityOpen] = useState(false);

  const { data: notifications } = useSWR<any[]>(
    'http://localhost:9000/api/notifications/' + (session?.user.id || ''),
    fetcher
  );

  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: '/signin',
    });
  };

  return (
    <>
      <Flex justify="center" align="center">
        {status === 'authenticated' ? (
          <HStack>
            <Button variant="outline">
              <Link href={'/addPost'}>Create Posts</Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsCommunityOpen(true);
              }}
            >
              Create Community
            </Button>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<TbBellRinging2 size={24} color="#3182ce" />}
                variant={'unstyled'}
              />

              <MenuList>
                <MenuItem>Notification</MenuItem>
                <Divider />

                {notifications?.map((notification, key) => (
                  <MenuItem key={key}>
                    {' '}
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                    />
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={
                  <Avatar
                    name="name"
                    src={session?.user?.image as string}
                    size={'sm'}
                  />
                }
                variant={'unstyled'}
              />

              <MenuList>
                <MenuItem py={6} onClick={() => router.push('/profile')}>
                  {session?.user.name}
                </MenuItem>
                <Divider />
                <MenuItem>Dashboard</MenuItem>
                <MenuItem>Create Post</MenuItem>
                <MenuItem onClick={() => router.push('/community')}>
                  Community
                </MenuItem>

                <MenuItem>Reading list</MenuItem>
                <MenuItem>Settings</MenuItem>
                <Divider />

                <MenuItem
                  onClick={async () => {
                    await signOut({ redirect: false });
                    router.push('/');
                  }}
                >
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        ) : (
          <>
            <Button variant="outline" onClick={handleClick}>
              Log In
            </Button>
          </>
        )}
      </Flex>

      <CommunityModal
        selectedCommunity={undefined}
        isOpen={isCommunityOpen}
        onClose={() => {
          setIsCommunityOpen(false);
        }}
      />
    </>
  );
};
export default RightContent;
