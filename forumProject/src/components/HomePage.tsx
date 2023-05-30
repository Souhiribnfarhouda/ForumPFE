import Layout from '@/layouts/Layout';
import { Box } from '@chakra-ui/react';
import useSWR from 'swr';
import CardPost from './CardPost';
import { fetcher } from '@/lib/fetcher';
import { useSession } from 'next-auth/react';
import useSearchPostStore from '@/store/useSearchPostStore';

const HomePage = () => {
  const { query } = useSearchPostStore();
  const { data: session } = useSession();
  const { data: posts } = useSWR(
    'http://localhost:9000/api/post?userId=' + (session?.user.id || ''),
    fetcher
  );
  return (
    <Box display={'flex'} flexDirection={'column'} w={'100%'} gap={6}>
      {posts
        ?.filter((e: any) => e.title.includes(query))
        ?.map((item: any, key: any) => (
          <CardPost key={key} item={item} />
        ))}
    </Box>
  );
};

export default HomePage;
HomePage.layout = Layout;
