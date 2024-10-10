import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import logo from "../components/Images/logo.png"
function Homepage() {
  const history = useHistory();
  const location = useLocation(); // useLocation hook to get the query parameter
  const [tabIndex, setTabIndex] = useState(0); // state to control tab index

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");

    // Check for query parameter to determine which tab to show
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab");

    if (tab === "signup") {
      setTabIndex(1); // Set tab to Sign Up if 'signup' is passed
    } else {
      setTabIndex(0); // Default to Login
    }
  }, [history, location]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        _hover={{ bg: 'gray.200' }}
        cursor="pointer"
        onClick={() => history.push('/')}  // navigate to Homepage
      >
        <Box display="flex" alignItems="center">
          <Image
            borderRadius="full"
            boxSize={{ base: '40px', md: '50px' }}
            src={logo}
            alt="TextRandom Logo"
            mr={2}
          />
          <Text fontSize={{ base: 'lg', md: '4xl' }} fontFamily="Rubik">
            TextRandom
          </Text>
        </Box>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs
          isFitted variant="soft-rounded"
          index={tabIndex} // control the active tab based on the tabIndex state
          onChange={(index) => setTabIndex(index)} // update the tab index when tab is changed
        >
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
