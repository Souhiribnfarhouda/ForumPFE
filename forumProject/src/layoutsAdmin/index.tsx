import { Box} from '@chakra-ui/react'
import React, { FC } from 'react'
import { Flex } from '@chakra-ui/react'
import Sidebar from './Sidebar'
import { useSession } from 'next-auth/react'



interface Props {
    children: React.ReactNode
}
const LayoutAdmin: FC<Props> = ({ children }) => {
  const {data:session,status}=useSession()
    return (
        <Flex w="100%" bg={"gray.100"} h={"100vh"}>
      <Sidebar />
        {status=="authenticated"?<Box w={"100%"} px={"200px"} h={"100vh"} overflow={"auto"}>
        {children}
      </Box>:<Box w={"100%"}h={"100vh"} overflow={"auto"}>
        {children}
      </Box> }
    </Flex>
    )
}

export default LayoutAdmin
