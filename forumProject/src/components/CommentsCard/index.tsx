import React, { FC, useState } from 'react'
import { Avatar, Box, Text } from '@chakra-ui/react';
import { format } from 'date-fns'


interface Props{
  item:any
}

const CommentsCard: FC<Props> = ({ item }) => {


  return (
  <Box display={"flex"} flexDirection={"row"} gap={8} flexFlow={"1"} p={6} >
            <Avatar name='Segun Adebayo' src={item?.userImg} />
          <Box flexFlow={"1"} bg={"#f5f5f5"} px={4} py={2} rounded={"md"} display={"flex"} flexDirection={"column"} gap={1}>
              <Text fontWeight={"bold"} display={"flex"} flexDirection={"column"}>{item?.userName}</Text> 
           <Text color={"gray.500"}>{ format(new Date(item?.createdAt), 'yyyy/MM/dd , HH:mm')}</Text> 
              
              {item.content}</Box>
</Box>
  )
}

export default CommentsCard