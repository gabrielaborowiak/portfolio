import React from "react";
import { Box, Button, Text, useColorMode } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaDoorOpen, FaGoogle, FaMoon, FaSun, FaUser } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";

const Auth = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { isLoggedIn, user } = useAuth();

  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <Box position={"fixed"} top="5%" right="5%">
      <Button onClick={() => toggleColorMode()}>
        {colorMode === "dark" ? <FaSun /> : <FaMoon />}
      </Button>{" "}
      {isLoggedIn && (
        <>
          <Button color="green.500" leftIcon={<FaUser />}>
            {(user as any)?.email}
          </Button>{" "}
          <Button
            color="red.500"
            leftIcon={<FaDoorOpen />}
            onClick={() => auth.signOut()}
          >
            Sair
          </Button>
        </>
      )}
      {!isLoggedIn && (
        <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
          Login com o Google
        </Button>
      )}
    </Box>
  );
};

export default Auth;
