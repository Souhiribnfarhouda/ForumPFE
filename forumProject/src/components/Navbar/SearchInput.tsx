import useSearchPostStore from '@/store/useSearchPostStore';
import { Search2Icon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';

type SearchInputProps = {
  // user
};
const SearchInput: React.FC<SearchInputProps> = () => {
  const { query, setQuery } = useSearchPostStore();
  return (
    <Flex mr={2} align="center" w={'500px'}>
      <InputGroup alignContent={'center'}>
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.300" mb={'2px'} />}
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          fontSize="10pt"
          borderRadius="2xl"
          _placeholder={{ color: 'gray.500' }}
          _hover={{
            bg: 'white',
            border: '1px solid',
            borderColor: 'blue.500',
          }}
          _focus={{
            outline: 'none',
            border: '1px solid',
            borderColor: 'blue.500',
          }}
          height="34px"
          bg="gray.50"
        />
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;
