import Layout from '@/layouts/Layout';

import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import { theme } from '../src/lib/theme';
import '../style/globals.css';
import { CustomAppProps } from '../types/api';
import LayoutAdmin from '@/layoutsAdmin';

interface Props {
  children: React.ReactNode;
}

const Noop: FC<Props> = ({ children }) => <>{children}</>;

const MyApp: FC<CustomAppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
const storedArray = typeof window !== 'undefined' ? JSON.parse(localStorage?.getItem("Tag") as string) : []

// If the array doesn't exist, create an empty array and store it in local storage
if (!storedArray) {
  const storedArray: never[] = [];
  localStorage.setItem("Tag", JSON.stringify(storedArray));
}

  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        {router.pathname.includes('admin') ? (
          <LayoutAdmin pageProps={pageProps}>
            <Component {...pageProps} />
          </LayoutAdmin>
        ) : (
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        )}
      </SessionProvider>
    </ChakraProvider>
  );
};

export default MyApp;

const Auth: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    if (status !== 'loading' && !isUser) router.push('/signin');
    if (status === 'loading' || !isUser) return;
  }, [isUser, status]);

  if (isUser) {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      Loading...
    </div>
  );
};
