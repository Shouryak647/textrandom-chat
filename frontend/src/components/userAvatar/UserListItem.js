import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { ChatState } from "../../Context/ChatProvider";

const UserListItem = ({ user, handleFunction, onlineUsers }) => {
  
  // Function to determine background color based on gender
  const getBackgroundColor = () => {
    if (user.gender === 'Male') {
      return '#d0e8ff';  // Light blue for male
    } else if (user.gender === 'Female') {
      return '#ffd0e8';  // Light pink for female
    } else {
      return '#e8e8e8';  // Gray for others or unspecified
    }
  };

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg={getBackgroundColor}
      _hover={{
        background: "#5e18e9",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
      position="relative" // To position the online indicator correctly
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Gender : </b>
          {user.gender}
        </Text>
        <Text fontSize="xs">
          <b>Age : </b>
          {user.age}
        </Text>
        
      </Box>
       {/* Online Indicator */}
       {onlineUsers[user._id] && (
        <Box
          ml={2}
          w={3}
          h={3}
          borderRadius="full"
          bg="green.500"
          position="absolute"
          left="80%"
          
        />
      )}
    </Box>
  );
};

export default UserListItem;
