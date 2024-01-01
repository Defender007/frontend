import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Context } from "../App";

function LoginForm(props) {
  // const [username, setUserName] = useContext(Context);
  const [userProfile, setUserProfile] = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  //...fires after everytime username and/or error changes
  useEffect(() => {
    if (userProfile) {
      setRedirect(true);
    }
    if (!userProfile) {
      setRedirect(false);
    }
    console.log("Effect Error:", error);
  }, [userProfile, error]);

  const submit = async (e) => {
    e.preventDefault();

    const LOGIN_URL = "http://localhost:8000/api/login";
    const payLoad = {
      email,
      password,
    };

    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payLoad),
    });
    const content = await response.json();
    if (content?.jwt?.length > 0) {
      await getUser();
    } else if (content?.password_error) {
      setError(content?.password_error);
    } else if (content?.invalid_user_error) {
      setError(content?.invalid_user_error);
    }
  };

  const getUser = async () => {
    const PROFILE_URL = "http://localhost:8000/api/user";
    const response = await fetch(PROFILE_URL, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const content = await response.json();
    console.log("***Profile Data:", content);
    if (content.username) {
      localStorage.setItem('profile', JSON.stringify(content))
      setUserProfile(content);
    }
  };

  if (redirect) {
    return <Redirect to="/profile" />;
  }
  return (
    <Form onSubmit={submit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        style={{
          width: "100%",
        }}
      >
        Submit
      </Button>
      <div>
        <p>{error ? error : null}</p>
      </div>
    </Form>
  );
}
export default LoginForm;
