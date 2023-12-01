import {
  Badge,
  Box,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus } from "../api/todo";

const TodoList = () => {
  const [todos, setTodos] = React.useState([]);
  const { user } = useAuth();
  const toast = useToast();

  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }
    const q = query(
      collection(db, "todo"),
      where("user", "==", (user as any)?.uid)
    );
    onSnapshot(q, (querySnapchot) => {
      // @ts-ignore
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      // @ts-ignore
      setTodos(ar);
    });
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  const handleTodoDelete = async (id: any) => {
    if (confirm("Tem certeza que deseja apagar este todo?")) {
      deleteTodo(id);
      toast({ title: "Todo excluído com sucesso.", status: "success" });
    }
  };

  const handleToggle = async (id: any, status: string) => {
    const newStatus = status == "completed" ? "pending" : "completed";
    const newStatusLabel = status == "completed" ? "pendente" : "completo";
    await toggleTodoStatus({ docId: id, status: newStatus });
    toast({
      title: `Todo marcado como ${newStatusLabel}.`,
      status: newStatus == "completed" ? "success" : "warning",
    });
  };

  return (
    <Box mt={5}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {todos &&
          todos.map((todo) => (
            <Box
              key={(todo as any)?.id}
              p={3}
              boxShadow="2xl"
              shadow={"dark-lg"}
              transition="0.2s"
              _hover={{ boxShadow: "sm" }}
            >
              <Heading as="h3" fontSize={"xl"}>
                {(todo as any)?.title}{" "}
                <Badge
                  color="red.500"
                  bg="inherit"
                  transition={"0.2s"}
                  _hover={{
                    bg: "inherit",
                    transform: "scale(1.2)",
                  }}
                  float="right"
                  size="xs"
                  onClick={() => handleTodoDelete((todo as any)?.id)}
                >
                  <FaTrash />
                </Badge>
                <Badge
                  color={
                    (todo as any)?.status == "pending"
                      ? "gray.500"
                      : "green.500"
                  }
                  bg="inherit"
                  transition={"0.2s"}
                  _hover={{
                    bg: "inherit",
                    transform: "scale(1.2)",
                  }}
                  float="right"
                  size="xs"
                  onClick={() =>
                    handleToggle((todo as any)?.id, (todo as any)?.status)
                  }
                >
                  {(todo as any)?.status == "pending" ? (
                    <FaToggleOff />
                  ) : (
                    <FaToggleOn />
                  )}
                </Badge>
                <Badge
                  float="right"
                  opacity="0.8"
                  bg={
                    (todo as any)?.status == "pending"
                      ? "yellow.500"
                      : "green.500"
                  }
                >
                  {(todo as any)?.status == "completed"
                    ? "Completo"
                    : "Pendente"}
                </Badge>
              </Heading>
              <Text>{(todo as any)?.description}</Text>
              <Text>{(todo as any)?.date}</Text>
            </Box>
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default TodoList;
