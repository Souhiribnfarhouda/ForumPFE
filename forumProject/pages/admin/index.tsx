
import LayoutAdmin from '@/layoutsAdmin'
import { fetcher } from '@/lib/fetcher'
import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { FcBriefcase, FcCollaboration, FcFlowChart, FcTemplate } from 'react-icons/fc'
import { MdGroups } from 'react-icons/md'
import useSWR from 'swr'

interface StatsCardProps {
    title: string
    stat: string
    icon: ReactNode
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props
  
  
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}
            bg={'white'}
        >
            <Flex justifyContent={'space-between'}>
                <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontWeight={'medium'} isTruncated>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                        {stat}
                    </StatNumber>
                </Box>
                <Box
                    my={'auto'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    alignContent={'center'}
                >
                    {icon}
                </Box>
            </Flex>
        </Stat>
    )
}

export default function Dashboard() {
      const { data:posts } = useSWR('http://localhost:9000/api/post', fetcher)

  const { data: users } = useSWR<any[]>(
    'http://localhost:9000/api/user',
    fetcher
  );
      const { data: community } = useSWR(
    'http://localhost:9000/api/getcommunity',
    fetcher
  );
    return (
        <Box pt={5} px={{ base: 2, sm: 12, md: 17 }}>
            <chakra.h1
                textAlign={'center'}
                fontSize={'4xl'}
                py={10}
                fontWeight={'bold'}
            >
                Our company is expanding, you could be too.
            </chakra.h1>
            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 5, lg: 8 }}
            >
                <StatsCard
                    title={'Users'}
                    stat={users?.length  as any|| 0}
                    icon={<FcCollaboration size={'3em'} />}
                />
                <StatsCard
                    title={'Posts'}
                    stat={posts?.length || 0}
                    icon={<FcTemplate size={'3em'} />}
                />
                 <StatsCard
                    title={'Community'}
                    stat={community?.length || 0}
                    icon={<FcFlowChart size={'3em'} />}
                />
            </SimpleGrid>
        </Box>
    )
}
Dashboard.Layout = LayoutAdmin
