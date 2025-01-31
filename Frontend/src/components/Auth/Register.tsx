import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Avatar,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface RegisterProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

export default function Register({
  isOpen,
  onClose,
  onOpenLogin,
}: RegisterProps) {
  const handleLoginAndClose = () => {
    onOpenLogin();
    onClose();
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone_number: "", // Updated to match backend
    address: "",
    avatar: {} as File,
  });

  const [photoURL, setPhotoURL] = useState("/profile.png");

  const registerUser = async () => {
    try {
      await axios.post(
        "http://localhost:3000/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      toast.success("User registered successfully");
    } catch (err) {
      console.log(err);
      toast.error("Error in registration");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;

    if (name === "avatar" && files && files[0]) {
      const imageFile = files[0];

      setFormData((prevFormData) => ({
        ...prevFormData,
        avatar: imageFile,
      }));

      const imageUrl = URL.createObjectURL(imageFile);
      setPhotoURL(imageUrl);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay
        bg="none"
        backdropFilter="auto"
        backdropInvert="15%"
        backdropBlur="2px"
      />
      <ModalContent bg={"rgb(39 39 42)"} borderRadius={10}>
        <ModalHeader className=" bg-opacity-100 shadow-lg text-white">
          Register
        </ModalHeader>
        <ModalCloseButton className="text-white" />
        <ModalBody className="space-y-2  bg-opacity-100  text-gray-900">
          <FormControl>
            <FormLabel color="white">Username:</FormLabel>
            <Input
              name="username"
              onChange={handleChange}
              placeholder="Enter your username"
              bg="gray.300"
            />
          </FormControl>
          <FormControl>
            <FormLabel color="white">Email:</FormLabel>
            <Input
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              bg="gray.300"
            />
          </FormControl>
          <FormControl>
            <FormLabel color="white">Password:</FormLabel>
            <Input
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              bg="gray.300"
            />
          </FormControl>
          <FormControl>
            <FormLabel color="white">Phone Number:</FormLabel>
            <Input
              name="phone_number" // Updated to match backend
              onChange={handleChange}
              type="number"
              placeholder="Enter your phone number"
              bg="gray.300"
            />
          </FormControl>
          <FormControl>
            <FormLabel color="white">Address:</FormLabel>
            <Input
              name="address"
              onChange={handleChange}
              type="text"
              placeholder="Enter your address"
              bg="gray.300"
            />
          </FormControl>
          <FormControl className="flex items-center h-full">
            <FormLabel color="white">Avatar:</FormLabel>
            <Input
              name="avatar"
              onChange={handleChange}
              type="file"
              accept=".jpg, .jpeg, .png"
              width={200}
              size="lg"
              border={0}
              color={"white"}
            />
            <Avatar className="" src={photoURL} width={20} height={20} />
          </FormControl>

          <Text color="white" cursor="pointer">
            Already have an account?{" "}
            <span className="text-blue-400" onClick={handleLoginAndClose}>
              Login now
            </span>
          </Text>
        </ModalBody>
        <ModalFooter className=" bg-opacity-100 shadow-lg text-white">
          <Button colorScheme="teal" m={3} onClick={registerUser}>
            Register
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
