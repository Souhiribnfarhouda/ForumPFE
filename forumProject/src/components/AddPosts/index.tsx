import { useEffect, useRef, useState } from 'react';

import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  Select,
  Textarea,
  VStack,
  Text
} from '@chakra-ui/react';
import Parser from 'html-react-parser';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { useRouter } from 'next/router';
import axios from 'axios';
import {BiPencil} from 'react-icons/bi';
import { IoReturnUpBackOutline } from 'react-icons/io5';



const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const AddPosts = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { data: communities } = useSWR<any[]>(
    session?.user.id
      ? 'http://localhost:9000/api/community/' + session?.user.id
      : null,
    fetcher
  );

  const [switchPost, setSwitchPost] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [value, setValue] = useState('');
  const [image, setImage] = useState('');
  const [communityId, setCommunityId] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  function handleChange(newValue: any) {
    setContent(newValue);
  }


  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ header: 1 }, { header: 2 }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }, { align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'header',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'script',
    'indent',
    'direction',
    'align',
    'link',
    'image',
    'video',
  ];
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleButtonClick = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    inputRef.current.click();
  };

  const handleSubmit = async (e: any) => {


  try {
     const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);
    formData.append('userId', session?.user.id as string);
    formData.append('communityId', communityId||"");
      const response = await fetch('http://localhost:9000/api/post', {
        method: 'POST',
        body: formData,
      });
     

    if (!response.ok) {
      throw new Error('Failed to submit the post.');
    }

   setTitle('');
      setContent('');
      setValue('');
      setImage('');
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitDraft = async (e: any) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);
    formData.append('userId', session?.user.id as string);
    formData.append('communityId', "");

    try {
      const response = await fetch('http://localhost:9000/api/draftPost', {
        method: 'POST',
        body: formData,
      });
      setTitle('');
      setContent('');
      setValue('');
      setImage('');
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex>
       <Button
          size="sm"
          position="absolute"
          top={4}
          bg={"#1c9fe8"}
          left={4}
textColor={"white"}
          onClick={() =>router.back()}
        >
<IoReturnUpBackOutline size={22}/>
        </Button>
      <MyDraftPost
        setTitle={setTitle}
        setContent={setContent}
        setCommunityId={setCommunityId}
        setImage={setImage}
      />
      <Box
        width={'100%'}
        display={'flex'}
         py={16}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        bg={'#f5f5f5'}
      >
        <HStack
          p={6}
          alignItems={'end'}
          w={{ sm: '90%'}}
          justifyContent={'end'}
        >
          <Button
            border={'1px'}
            bg={'inherit'}
            w={'100px'}
            onClick={() => setSwitchPost(true)}
            borderColor={'transparent'}
          >
            Edit
          </Button>
          <Button
            border={'1px'}
            bg={'inherit'}
            w={'100px'}
            onClick={() => setSwitchPost(false)}
            borderColor={'transparent'}
          >
            Preview
          </Button>
        </HStack>
        {switchPost ? (
          <VStack
            shadow={'lg'}
            textColor={'black'}
            w={{ sm: '90%'}}
            bg={'white'}
            alignItems={'left'}
          >
            <Box overflow={'auto'} p={4}>
              <Input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                border={'1px'}
                bg={'white'}
                borderColor={'gray.200'}
                style={{ display: 'none' }}
                ref={inputRef}
              />
              <Button
                border={'1px'}
                bg={'#1c9fe8'}
                w={'200px'}
                borderColor={'gray.200'}
                textColor={'white'}
                onClick={handleButtonClick}
              >
                Add a cover Image
              </Button>
              {image && (
                <Box mt="4">
                  <Image
                    src={image}
                    alt="selected image"
                    h={'100px'}
                    w={'100px'}
                  />
                </Box>
              )}
            </Box>

            <Textarea
              h={'150px'}
              focusBorderColor="transparent"
              boxShadow="none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              border={'0px'}
              _focus={{ boxShadow: 'none' }}
              _placeholder={{
                color: 'black',
                fontSize: { base: '24px', sm: '32px', md: '40px', lg: '50px' },
                fontWeight: 'bold',
                opacity: '1',
              }}
              textColor={'black'}
              fontSize={'50px'}
              fontWeight={'bold'}
              placeholder="New Post title here ..."
            ></Textarea>

            <Box w={'100%'} h={'600px'} overflow={'auto'}>
              <ReactQuill
                className="parent"
                value={content}
                onChange={handleChange}
                placeholder="Write something..."
                modules={modules}
                formats={formats}
              />
            </Box>
            <HStack p={6} bg={'gray.100'}>
              <Select
                placeholder="Pas de community"
                w={200}
                value={communityId}
                onChange={(e) => setCommunityId(e.target.value)}
              >
                {communities?.map((community, index) => (
                  <option key={index} value={community.id}>
                    {community.name}
                  </option>
                ))}
              </Select>
              <Button
                border={'1px'}
                bg={'white'}
                w={'100px'}
                bgColor={'#1c9fe8'}
                textColor={'white'}
                borderColor={'gray.200'}
                onClick={(event: any) => handleSubmit(event.target.value)}
              >
                Publish
              </Button>
              <Button
                border={'1px'}
                bg={'inherit'}
                w={'100px'}
                borderColor={'transparent'}
                onClick={(event: any) => handleSubmitDraft(event.target.value)}
              >
                Save Draft
              </Button>
            </HStack>
          </VStack>
        ) : (
          <VStack
            overflow={'auto'}
            shadow={'lg'}
            textColor={'black'}
            height={'800px'}
            w={{ base: '100%', sm: '90%', md: '80%', lg: '60%' }}
            bg={'white'}
            alignItems={'left'}
          >
            <Box w={'100%'}>
              <p>Preview</p>
              {image && (
                <Box
                  mt="4"
                  display={'flex'}
                  flexDirection={'row'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Image
                    src={image}
                    alt="selected image"
                    h={'300px'}
                    w={'400px'}
                  />
                </Box>
              )}
              <Heading
                textAlign={'center'}
                fontSize={{ base: '24px', sm: '32px', md: '40px', lg: '50px' }}
                fontWeight={'bold'}
              >
                {title}
              </Heading>
              <Box>{Parser(value)}</Box>
            </Box>
          </VStack>
        )}
      </Box>
    </Flex>
  );
};

export default AddPosts;

const MyDraftPost = ({
  setTitle,
  setContent,
  setCommunityId,
  setImage,
}: any) => {
  const { data: session } = useSession();

  const { data: drafts } = useSWR<any[]>(
    session?.user.id
      ? 'http://localhost:9000/api/draftPost/' + session?.user.id
      : null,
    fetcher
  );



  return (
    <>{drafts?.length ?<Flex flexDirection="column" gap="2" pt={24} px={16} bg={"#f5f5f5"}>
      <Heading size="md" fontWeight="bold"> Draft List</Heading>
      {drafts?.map((draft, index) => (
        <Box
          key={index}
          p={6}
          bg={"white"}
          shadow={"lg"}
          cursor="pointer"
          w={"300px"}
          rounded={"lg"}
          
          onClick={async () => {
            const imgContent = await axios
              .get(draft.imageUrl, { responseType: 'blob' })
              .then(function (response) {
                const reader = new FileReader();

                reader.readAsDataURL(response.data);

                reader.onloadend = () => {
                  setImage(reader.result as string);
                };
              });
            setTitle(draft.title);
            setContent(draft.content);
            setCommunityId(draft.communityId);
            setImage(imgContent);
          }}
        >
          <Heading>{draft.title}</Heading>
          <Text py={4}>{Parser(draft.content)}</Text>
          <Box display={"flex"} flexDirection={"row"} w={"100%"} justifyContent={"end"}><Button py={4} gap={2}><BiPencil/>Edit</Button></Box> 
          
        </Box>
      ))}
    </Flex>:"" }
      </>
    
  );
};
