import React from "react";
import { Box, Button, Text, VStack, Container } from "@chakra-ui/react";
import ReactDom from 'react-dom'
import {} from 'react-router-dom'
const LaunchPage: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgGradient="linear(to-br, purple.500, blue.500)"
      color="white"
      textAlign="center"
    >
      <Container maxW="sm">
        <VStack>
          <Text fontSize="4xl" fontWeight="bold">
            Welcome to ThoughtBank
          </Text>
          <Text fontSize="lg">
            Organize your thoughts, ideas, and inspirations in one place.
          </Text>
          <Button
            size="lg"
            bg="white"
            color="blue.500"
            _hover={{ bg: "gray.100" }}
            onClick={() => alert("Get Started Clicked!")}
          >
            Get Started
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default LaunchPage;
