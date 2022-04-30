import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../utils/boxOfStates";

export default function SignUp() {
  const { dataUser, setDataUser } = useContext(AppContext);
  return (
    <div className="sign-up">
      <LogInForm dataUser={dataUser} setDataUser={setDataUser} />
      <h1>Or</h1>
      <Register dataUser={dataUser} setDataUser={setDataUser} />
    </div>
  );
}

function Register({ setDataUser }) {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, loginR, passwordR, radioUser, radioAdmin } = event.target;
    const typeUser = radioUser.checked ? radioUser.value : radioAdmin.value;
    fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify({
        email: email.value,
        login: loginR.value,
        password: passwordR.value,
        typeUser,
      }),
    })
      .then((response) => {
        switch (response.status) {
          case 201:
            return response.json();
          case 500:
            throw new Error("all fields are required");
          default:
            console.log("fetch in SignUp");
        }
      })
      .then((response) => {
        setDataUser({ logged: true, data: response });
        navigate("/account");
      })
      .catch(function (error) {
        alert(error);
        console.log(error.message);
      });
  };
  return (
    <div>
      <h1>Create your account</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="loginR">
          <Form.Label>Login</Form.Label>
          <Form.Control type="text" placeholder="Enter login" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordR">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <div key="radioRegister" className="mb-3">
          <h5>Choose your type account</h5>
          <Form.Check
            inline
            label="User"
            name="group1"
            type="radio"
            value="user"
            id="radioUser"
          />
          <Form.Check
            inline
            label="Admin"
            name="group1"
            type="radio"
            value="admin"
            id="radioAdmin"
          />
        </div>
        <Button className="button darkBtn" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

function LogInForm({ dataUser, setDataUser, createNotification }) {
  const navigate = useNavigate("./");

  const handleSubmit = (event) => {
    event.preventDefault();
    const { loginS, passwordS } = event.target;
    fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: loginS.value,
        password: passwordS.value,
      }),
    })
      .then(function (response) {
        if (response.status === 404) {
          alert("We do not have this user in database");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data === undefined) {
          throw new Error("wrong data");
        }
        setDataUser({ logged: true, data });
        navigate("/account");
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="loginS">
          <Form.Label>Login</Form.Label>
          <Form.Control type="text" placeholder="Enter login" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordS">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button className="button darkBtn" variant="primary" type="submit">
          Log in
        </Button>
      </Form>
    </div>
  );
}
