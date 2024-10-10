import React from 'react';
import {
    Box, Button, Flex, Image, Heading, IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import logo from "../media/logo.png";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Navbar() {

    const history = useHistory();

    return (
        <Box
            as="nav"
            p={2}
            bg="#7839f6"
            position="sticky"
            top={0}
            zIndex="sticky"
            display="flex"
            justifyContent="space-between"
            boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"

            alignItems="center"
        >
            <Flex
                alignItems="center"
                direction="row"
                color="white"
            >
                <Image
                    src={logo}
                    alt="Website Logo"
                    boxSize={{ base: "30px", md: "40px" }}
                    objectFit="contain"
                    mr={3}

                />
                <Heading
                    as="h1"
                    fontSize={{ base: "xl", md: "2xl" }}
                    textAlign="left"
                >
                    TextRandom
                </Heading>
            </Flex>

            {/* Hamburger Menu with Dropdown */}
            <Box display={{ base: "block", md: "none" }}>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Open Menu"
                        icon={<HamburgerIcon />}
                        variant="outline"
                        color="white"
                        _active={{ bg: "#5d16eb" }}
                        _hover={{ bg: "#5d16eb" }}
                    />
                    <MenuList bg="#7839f6">
                        <MenuItem color="white">
                            <Button as="a" href="#home" variant="solid" color="black" width="100%" _hover={{ bg: "gray.300" }}
                                _active={{ bg: "#5d16eb" }}  >
                                Home
                            </Button>
                        </MenuItem>
                        <MenuItem color="white">

                            <Button as="a" href="#contactus" variant="solid" color="black" width="100%" >
                                Contact
                            </Button>

                        </MenuItem>
                        <MenuItem color="white">
                            <Button variant="solid" color="black" width="100%">
                                Blogs
                            </Button>
                        </MenuItem>
                        <MenuItem color="white">
                            <Button variant="solid" color="black" width="100%" onClick={() => history.push('/homepage')}>
                                Sign In
                            </Button>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>


            <Box display={{ base: "none", md: "block" }}>
                <Button
                    as="a"
                    href="#home"
                    variant="solid"
                    color="black"
                    mr={5}
                    boxShadow="10px 1px 14px 1px rgba(0, 0, 0, 0.2)"
                    _hover={{ boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)' }}
                    borderRadius="20px"
                >
                    Home
                </Button>



                <Button
                    as="a"
                    href="#contactus"
                    variant="solid"
                    color="black"
                    mr={5}
                    boxShadow="10px 1px 14px 1px rgba(0, 0, 0, 0.2)"
                    _hover={{ boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)' }}
                    borderRadius="20px"
                >
                    Contact
                </Button>

                <Button
                    variant="solid"
                    color="black"
                    mr={5}
                    boxShadow="10px 1px 14px 1px rgba(0, 0, 0, 0.2)"
                    _hover={{ boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)' }}
                    borderRadius="20px"
                >
                    Blogs
                </Button>
                <Button
                    variant="solid"
                    color="black"
                    boxShadow="10px 1px 14px 1px rgba(0, 0, 0, 0.2)"
                    _hover={{ boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)' }}
                    borderRadius="20px"
                    onClick={() => history.push('/homepage')}
                >
                    Sign In
                </Button>
            </Box>
        </Box>
    );
}

export default Navbar;
