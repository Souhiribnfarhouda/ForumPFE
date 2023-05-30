import React, { FC } from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList,
    Button,
    HStack
} from '@chakra-ui/react'

import { useRouter } from 'next/router'


interface Props{
    title: string
    icon: any
    active: any
    navSize: any
url:string

    
}

const NavItem: FC<Props> = ({ icon, title, active, navSize,url }) => {
const router=useRouter()
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <Button
                    backgroundColor={active && "white"}
                    p={3}
                    borderRadius={8}
onClick={()=>router.push(`${url}`)}
                    w={navSize==="large" ? "100%":""}
                    
                    variant={"unstyled"}
display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"start"}
                >

                        <HStack>
                            <Icon as={icon} fontSize="xl" color={active ? "black" : "white"} />
                            <Text ml={5} display={navSize == "small" ? "none" : "flex"} textColor={active ? "black" : "white"}>{title}</Text>
                        </HStack>

                </Button>
            
            </Menu>
        </Flex>
    )
}
export default NavItem