import { InfoIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
  useToast,
} from "@chakra-ui/react";
import axios from "axios"; // To make API calls
import { useHistory } from "react-router-dom"; // To redirect the user after logout

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const history = useHistory(); // To handle redirection after logout
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));
   // Function to handle account deletion
  const handleDeleteAccount = async () => {
    try {

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, // Include the token in the request header
        },
      };

      // Make delete request
      await axios.delete(
        `${process.env.REACT_APP_ENDPOINT}/api/user/delete/${user._id}`,
        config
      );

      toast({
        title: "Account Deleted",
        description: "Your account has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      localStorage.removeItem("userInfo"); // Assuming you store user info in localStorage
      history.push("/");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete account.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<InfoIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="460px">
          <ModalHeader
            fontSize="30px"
            fontFamily="Rubik"
            d="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="200px"
              src={user.pic}
              alt={user.name}
            />
            <Text
              fontSize={{ base: "24px", md: "30px" }}
              fontFamily="Rubik"
            >
              Gender: {user.gender}
            </Text>
            <Text
              fontSize={{ base: "24px", md: "30px" }}
              fontFamily="Rubik"
            >
              Age: {user.age}
            </Text>
          </ModalBody>
          <ModalFooter d="flex" justifyContent="space-between">
          {/* Conditionally render the delete button only if the logged-in user is viewing their own profile */}
          {loggedInUser._id === user._id && (
              <Button colorScheme="red" onClick={handleDeleteAccount}>
                Delete My Account
              </Button>
            )}
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
