import { Button } from "@chakra-ui/button";
import { motion } from 'framer-motion';
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import { useEffect } from "react";
import io from "socket.io-client";
import { Image } from '@chakra-ui/react'
import logo from "../Images/logo.png"

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const MotionBox = motion(Box);


const useOnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState({});

  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on('updateOnlineUsers', (users) => {
      // console.log("Received online users:", users);
      setOnlineUsers(users); // Update the state with online users
    });

    // Clean up on component unmount
    return () => {
      socket.off('updateOnlineUsers');
    };
  }, []);

  return onlineUsers;
};




function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [getallUsers, setGetallUsers] = useState([]);

  const {
    setSelectedChat,
    user,
    setUser,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  const onlineUsers = useOnlineUsers(); // Get online users
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();


  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user?getallUsers`, config); // Adjust the endpoint as necessary
      setGetallUsers(response.data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to load users.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers(); // Fetch all users when the component mounts
  }, []);


  const logoutHandler = () => {
    // Remove user info from local storage
    localStorage.removeItem("userInfo");

    // Reset chat state
    setSelectedChat(null); // Clear the selected chat
    setChats([]);          // Clear the chat list
    setNotification([]);   // Clear notifications (if applicable)


    setUser(null); // Uncomment if you have a setUser function

    toast({
      title: "Logged Out",
      description: "You have successfully logged out!",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom",
    });

    // Redirect to the home or login page
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      setSearchResult(getallUsers); // If no search term, show all users
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`${process.env.REACT_APP_ENDPOINT}/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="outline" colorScheme="black" onClick={onOpen}>
            <i class="fas fa-user-friends" ></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Add Friends
            </Text>
          </Button>
        </Tooltip>
        <Box
          display="flex"
          alignItems="center"
          as={motion.div}
          initial={{ opacity: 0, x: 0 }} // Initial position (no translation)
          animate={{
            opacity: 1,
            x: [0, -5, 5, -5, 5, 0], // Shaking animation along the x-axis
          }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'loop' }}
        >
          <Image
            borderRadius="full"
            boxSize={{ base: '30px', md: '40px' }}
            src={logo}
            alt="TextRandom Logo"
            mr={2}
          />
          <Text fontSize={{ base: 'lg', md: '2xl' }} fontFamily="Rubik">
            TextRandom
          </Text>
        </Box>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user} >
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Add New Friends</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                fontSize="sm"
                placeholder="Search by name or gender"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult.length > 0 ? (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    onlineUsers={onlineUsers}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              ) : (
                getallUsers.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    onlineUsers={onlineUsers}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              ))}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
