import Layout from '@/layouts/Layout';
import { Box } from '@chakra-ui/react';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';

const ReadingPostCard = dynamic(() => import('@/components/CardPost/ReadingPostCard'), {
  ssr: false, // Ensure the component is rendered only on the client side
});
const HomePage = () => {
  const { data: session } = useSession();
    const storedArray = typeof window !== 'undefined' ? JSON.parse(localStorage?.getItem("Tag") as string) : []
  console.log(storedArray)
    
  return (
    <Box display={'flex'} flexDirection={'column'} w={'100%'} gap={6}>
      {storedArray?.map((postId: any, key: any) => (
              <ReadingPostCard key={key} id={postId} />
            ))}
    </Box>
  );
};

export default HomePage;
HomePage.layout = Layout;
