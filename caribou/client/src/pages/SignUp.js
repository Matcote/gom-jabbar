import React, { useState, useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext";
import { useHistory } from "react-router-dom";

import { Button, Input, Title } from "../components/index";

const SignUp = () => {
  const history = useHistory();
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirm = (event) => {
    setConfirm(event.target.value);
  };
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleSignUp = () => {
    if (name === "" || email === "" || password === "") {
      setErrorMessage("One or more fields are blank");
    } else if (password !== confirm) {
      setErrorMessage("Passwords do not match");
    } else if (email.substr(email.indexOf("@") - 5, 5) !== "carib") {
      setErrorMessage("Email name must end in 'carib'");
    } else {
      fetch("/adduser", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          _id: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 201) {
            setCurrentUser(data.data);
            history.push("/map");
          } else {
            setErrorMessage("Email Already exists");
          }
        });
    }
  };
  return (
    <Wrapper>
      <Title>Sign Up</Title>
      <Box>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleName}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
        />
        <Input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={handleConfirm}
        />
        <Button onClick={handleSignUp}>Sign up</Button>
      </Box>
      {errorMessage !== null && <Error>{errorMessage}</Error>}
    </Wrapper>
  );
};

const Error = styled.div`
  margin-top: 15px;
  padding: 10px;
  background-color: white;
  border-radius: 20px;
  border: 3px solid red;
`;
const Wrapper = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Box = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 12px;
  background-color: #fffffe;
  border: 4px solid #020826;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export default SignUp;
