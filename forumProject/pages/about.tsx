import { Box, Container, Heading, Text } from "@chakra-ui/react";

const AboutPage = () => {
  return (
    <Box bg="white" w={"80%"} rounded={"lg"} py={10}>
      <Container maxW="container.lg">
        <Heading as="h1" size="xl" mb={6}>
          About Us
        </Heading>
        <Text fontSize="xl">
          At our website, we aim to create a vibrant and inclusive community for developers and tech enthusiasts. Our platform provides a space for sharing knowledge, engaging in discussions, and connecting with like-minded individuals.
        </Text>
        <Text fontSize="xl" mt={4}>
          Our mission is to empower developers of all levels, from beginners to experts, by providing a platform that fosters learning, collaboration, and growth. We believe that everyone has something valuable to contribute, and we encourage our community members to share their experiences, insights, and expertise.
        </Text>
        <Text fontSize="xl" mt={4}>
          Through our carefully curated content, we strive to cover a wide range of topics, including programming languages, frameworks, tools, best practices, career advice, and more. We encourage diversity and welcome contributions from individuals with diverse backgrounds and perspectives.
        </Text>
        <Text fontSize="xl" mt={4}>
          Join us in our mission to create a supportive and inspiring community that fuels innovation and knowledge sharing in the tech industry. Whether you are here to learn, share, or connect, we are excited to have you as part of our community!
        </Text>
      </Container>
    </Box>
  );
};

export default AboutPage;
