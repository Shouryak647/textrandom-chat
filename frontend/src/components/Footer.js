import React from 'react';
import {
  Box,
  Center,
  Container,
  Stack,
  Text,
  Link,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react';
import logo from "../media/logo.png";
const Footer = () => {
  return (
    <Box bg="gray.800" color="white" py={6}>
      <Container maxW="container.xl"  >
        <Center>
        <Stack  direction={{ base: 'column', md: 'row' }} spacing={{ base: '20px', md: '700px' }} align="center" >
          {/* Logo Section */}
          <Box display="flex" alignItems="center" >
            <Image src={logo} alt="TextRandom" boxSize="40px" mr={1}/>
            <Text fontSize={useBreakpointValue({ base: 'lg', md: 'xl' })} fontWeight="bold" ml={2}>
              TextRandom
            </Text>
          </Box>

          {/* Links Section */}
          <Stack direction={{ base: 'column', md: 'column' }} spacing={4} textAlign="center">
            <Link href="#contactus" color="white" _hover={{ textDecoration: 'underline' }}>
              Contact Us
            </Link>
            <Link href="/privacy" color="white" _hover={{ textDecoration: 'underline' }}>
              Privacy Policies
            </Link>
            <Link href="/terms" color="white" _hover={{ textDecoration: 'underline' }}>
              Terms of Service
            </Link>
          </Stack>
        </Stack>
        </Center>
        <Text textAlign="center" mt={4} fontSize="sm">
          © {new Date().getFullYear()} TextRandom. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
