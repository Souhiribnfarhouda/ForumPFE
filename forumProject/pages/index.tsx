// import { Heading } from '@chakra-ui/react';
import HomePage from '@/components/HomePage';
import Layout from '@/layouts/Layout';

export default function Home() {
  return (
    <div>
      <HomePage />
    </div>
  );
}
Home.layout = Layout;
