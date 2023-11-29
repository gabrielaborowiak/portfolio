import React from "react";
import {
  Box,
  Text,
  Input,
  Button,
  Textarea,
  Stack,
  Select,
  useToast,
  Center,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import useAuth from "../hooks/useAuth";
import { addTodo } from "../api/todo";

const AddTodo = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState("");
  const [status, setStatus] = React.useState("pending");
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();
  const { isLoggedIn, user } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const handleTodoCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Você precisa estar logado para criar um todo.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    const todo = {
      title,
      description,
      date,
      status,
      userId: (user as { uid: string } | null)?.uid,
    };
    await addTodo(todo);
    setIsLoading(false);
    setTitle("");
    setDescription("");
    setStatus("pending");
    toast({ title: "Todo criado com sucesso!", status: "success" });
  };

  return (
    <Box w="40%" margin={"0 auto"} display="block" mt={5}>
      <VStack direction="column">
        <Center h="80px" color="white">
          <Text as="b" fontSize="3xl">
            Task Scribe
          </Text>
        </Center>
        <Button colorScheme='teal' onClick={onOpen}>
          Clique aqui
        </Button>
        <Drawer
        isOpen={isOpen}
        placement='left'
        size='md'
        onClose={onClose}
        
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Criar todo</DrawerHeader>

          <DrawerBody>
            <VStack spacing={4}>
            <Input
          placeholder="O que precisa ser feito?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Como devo fazer isso?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="Que dia?"
          size="md"
          type="datetime-local"
          onChange={(e) => setDate(e.target.value)}
        />
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option
            value={"pending"}
            style={{ color: "yellow", fontWeight: "bold" }}
          >
            Pendente
          </option>
          <option
            value={"completed"}
            style={{ color: "green", fontWeight: "bold" }}
          >
            Completo
          </option>
        </Select>

            </VStack>
            
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
          onClick={() => handleTodoCreate()}
          disabled={title.length < 1 || description.length < 1 || isLoading}
          variant="solid"
        >
          Criar
        </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </VStack>
    </Box>
  );
};

export default AddTodo;
