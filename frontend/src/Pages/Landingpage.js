import React from 'react';
import { Box, Button, Center, Flex, Heading, Text, Stack, useBreakpointValue, Image, Divider } from '@chakra-ui/react';
import { useHistory } from "react-router-dom";
import Lottie from "react-lottie";
import networkAnimation from "../animations/network.json";
import Navbar from '../components/Navbar';
import onlineVideo from "./../media/onlineUsers.mp4"
import searchByVideo from "./../media/searchbygender.mp4"
import chatfunctionVideo from "./../media/chatfunction.mp4"
import VideoSection from '../components/VideoSection';
import friends from "./../media/friends_transparen.png"
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';


const LandingPage = () => {
    const history = useHistory();  // useHistory hook to programmatically navigate
    const network_animation = {
        loop: true,
        autoplay: true,
        animationData: networkAnimation,
        renderer: 'svg',
    }
    const showAnimation = useBreakpointValue({ base: false, md: true });
    const showImages = useBreakpointValue({ base: true, md: false });
    return (
        <Box color="black" minH="100vh" w='100%' id="home">
            <Navbar />
            {/* Hero Section */}
            <Flex
                minH="90vh"
                mr={10}
                ml={10}
                justify="center"
                align="center"
                direction={{ base: 'column', md: 'row' }} // Stack vertically on small screens, row on medium and larger screens
                textAlign={{ base: 'center', md: 'left' }}

                className="fadeeffect"
            >
                <Box w={{ base: '100%', md: '45vw' }} mb={{ base: 8, md: 0 }}>
                    <Heading as="h1" size="xl" mb={6} textAlign={{ base: 'center', md: 'left' }}>
                        TextRandom - Chat with Random Strangers
                    </Heading>
                    <Text fontSize={{ base: 'lg', md: 'xl' }} maxW="600px" textAlign={{ base: 'center', md: 'left' }}>
                        Connect with friends, colleagues, and communities from around the world. Our anonymous chat platform is designed
                        for real-time conversations with privacy in mind. Free sign-up!
                    </Text>
                    <Button
                        mt={6}
                        size="lg"
                        variant="solid"
                        bg="#5d16eb"
                        color="white"
                        boxShadow="10px 10px 14px 1px rgba(0, 0, 0, 0.2)"
                        _hover={{ boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)' }}
                        onClick={() => history.push('/homepage')}
                        borderRadius="20px"

                    >
                        Start Chat Now
                    </Button>
                </Box>
                {showAnimation && (
                    <Lottie options={network_animation} height="auto" width="auto" />
                )}
                {showImages && (
                    <Image src={friends} height="auto" width="750px" />
                )}
            </Flex>

            <Center>
                <Divider
                    mt={20}
                    w="60%"
                    borderColor="gray.500"
                    borderWidth="1px"
                    opacity="0.8"
                    borderStyle="solid"
                />
            </Center>

            {/* Features Section */}
            <Box mt={16} px={2} mr={{ md: 10, base: 5 }} ml={{ md: 10, base: 5 }} mb={20} className="fadeeffect">
                <Heading as="h2" size="xl" textAlign="center" mb={8}>
                    Top Features of TextRandom
                </Heading>
                <VideoSection
                    title="Realtime Chat With Online People"
                    description="You can connect with online users instantly and text them on the go."
                    videoUrl={onlineVideo}
                />
                <VideoSection
                    videoUrl={searchByVideo}
                    title="Chat with Specific Gender"
                    description="Chat with people who you are interested in. Chat with girl, boys, or any other users online anonymously."
                    reverse
                />
                <VideoSection
                    videoUrl={chatfunctionVideo}
                    title="One to One Chat Functionality"
                    description="Engage in real-time, one-to-one online chat with instant notifications on our random talk site. Connect seamlessly with others for live conversations, making your chat experience faster and more interactive."
                />

            </Box>
            {/* Why Choose Us Section */}
            <Box mt={16} px={8}>
                <Heading as="h2" size="xl" textAlign="center" mb={8}>
                    Why Choose TextRandom over Chatib, Chatblink, Chatiw ?
                </Heading>
                <Stack spacing={8} textAlign="center" align="center">
                    <Box maxW="700px" mx="auto" bg="gray.100" p={8} borderRadius="lg" color="teal.700">
                        <Text fontSize="lg">
                            <strong>Security and Privacy</strong> - We take your privacy seriously. TextRandom uses encryption to
                            ensure your messages remain secure.
                        </Text>
                    </Box>
                    <Box maxW="700px" mx="auto" bg="gray.100" p={8} borderRadius="lg" color="teal.700">
                        <Text fontSize="lg">
                            <strong>User-Friendly Interface</strong> - Our chat interface is simple and easy to use, ensuring a smooth
                            user experience whether you're on desktop or mobile.
                        </Text>
                    </Box>
                    <Box maxW="700px" mx="auto" bg="gray.100" p={8} borderRadius="lg" color="teal.700">
                        <Text fontSize="lg">
                            <strong>Completely Free</strong> - TextRandom is completely free to use, with no hidden fees or in-app
                            purchases.
                        </Text>
                    </Box>
                    <Box maxW="700px" mx="auto" bg="gray.100" p={8} borderRadius="lg" color="teal.700">
                        <Text fontSize="lg">
                            <strong>Free One to One & Group Chat Rooms</strong> - Engage in multiple chatrooms and discussions with users worldwide which you can create by yourself.
                        </Text>
                    </Box>
                    <Box maxW="700px" mx="auto" bg="gray.100" p={8} borderRadius="lg" color="teal.700">
                        <Text fontSize="lg">
                            <strong>Global Community</strong> - Connect with men and women from the USA, UK, India, and other countries and free chat with them and make friends online.
                        </Text>
                    </Box>
                    <Box maxW="700px" mx="auto" bg="gray.100" p={8} borderRadius="lg" color="teal.700">
                        <Text fontSize="lg">
                            <strong>Mobile-Friendly</strong> - You can Chat seamlessly on your Android, iPhone, iPad, or desktop anytime, anywhere. online. Our website supports multiple devices and smooth user interface without any cost.
                        </Text>
                    </Box>
                    <Box maxW="700px" mx="auto" bg="gray.100" p={8} borderRadius="lg" color="teal.700">
                        <Text fontSize="lg">
                            <strong>Private Conversations</strong> - Easily start private chats with people nearby or across the globe.
                        </Text>
                    </Box>
                    <Box maxW="700px" mx="auto" bg="gray.100" p={8} borderRadius="lg" color="teal.700">
                        <Text fontSize="lg">
                            <strong>Meet New Friends</strong> - Discover and make friends in our lively Chat Page and Anonymous chat services.
                        </Text>
                    </Box>
                </Stack>
            </Box>

            {/* Call to Action */}
            <Box mt={8} textAlign="center">
                <Button
                    size="lg"
                    variant="solid"
                    bg="#5d16eb"
                    color="white"
                    boxShadow="10px 10px 14px 1px rgba(0, 0, 0, 0.2)"
                    _hover={{ boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)' }}
                    onClick={() => history.push("/homepage?tab=signup")}
                    borderRadius="20px"
                >
                    Sign Up & Chat
                </Button>
            </Box>

            <Center>
                <Divider
                    mt={20}
                    w="60%"
                    borderColor="gray.500"
                    borderWidth="1px"
                    opacity="0.8"
                    borderStyle="solid"
                />
            </Center>
            <Box mb={8} mt={10} id="contactus">
                <Heading as="h2" size="xl" textAlign="center" >
                    Contact Us
                </Heading>
                <ContactForm />
            </Box>

            <Footer />
        </Box>
    );
};

export default LandingPage;
