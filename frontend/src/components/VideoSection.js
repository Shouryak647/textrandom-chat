import { Box, Heading, Flex, Text } from '@chakra-ui/react';

const VideoSection = ({ title, description, videoUrl, reverse }) => {
    // Disable right-click function
    const handleContextMenu = (e) => {
        e.preventDefault();  // Prevent right-click menu
    };

    return (
        <Box textAlign="center" py={8} px={4}>
            <Flex
                direction={{ base: "column", md: reverse ? "row-reverse" : "row" }}
                alignItems="center" // Center items vertically
                justifyContent="space-between" // Space items on the main axis
            >
                <Box flex="1" textAlign="center" mb={{ base: 4, md: 0 }}>
                    <Heading as="h3" fontSize={{ base: "2xl", md: "3xl" }} mb={2}>
                        {title}
                    </Heading>
                    <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" >
                        {description}
                    </Text>
                </Box>
                <Box
                    flex="1"
                    maxW={{ base: "100%", md: "700px" }}
                    as="video"
                    src={videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    width="100%"
                    borderRadius="10px"
                    boxShadow="5px 5px 12px rgb(0 0 0 / 20%)"
                    onContextMenu={handleContextMenu}  // Disable right-click
                    controls={false}                   // Disable video controls
                    ml={{ md: reverse ? 0 : 10, base: 0 }}
                    mr={{md: reverse ? 10 : 0, base: 0}}
                />

            </Flex>
        </Box>
    );
};

export default VideoSection;
