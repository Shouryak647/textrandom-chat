import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast } from '@chakra-ui/react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const toast = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        formData.append("access_key", "b3e9ddcf-e781-4dae-889b-d0eb5ed253b1");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        

        // Display success message
        toast({
            title: 'Message Sent.',
            description: 'Thank you for contacting us!',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });

        // Reset form fields after submission
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <Box maxWidth="500px" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg" boxShadow="0px 5px 12px rgb(0 0 0 / 20%)">
            <form onSubmit={handleSubmit} >
                <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                    />
                </FormControl>

                <FormControl id="email" mt={4} isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                </FormControl>

                <FormControl id="message" mt={4} isRequired>
                    <FormLabel>Message</FormLabel>
                    <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter your message"
                    />
                </FormControl>

                <Button type="submit" size="md"
                    variant="solid"
                    bg="navy"
                    color="white"
                    boxShadow="10px 10px 14px 1px rgba(0, 0, 0, 0.2)"
                    _hover={{ boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)' }}
                    mt={4}
                    borderRadius="20px"
                    textAlign="center"
                    ml="40%"
                    
                >
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default ContactForm;
