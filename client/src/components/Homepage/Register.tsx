import { useState } from "react";
import { Button, Form, FormGroup, FormControl } from "react-bootstrap";

const Register = ({ onToggle }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className='login template d-flex justify-content-center 100-w vh-60'>
      <div className="50-w p-5 rounded">
        <Form onSubmit={handleSubmit}>
          <h3 className="text-center">Register</h3>
          <FormGroup className="mb-2">
            <FormControl
              type="text"
              placeholder="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormControl
              type="password"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormGroup>
          <Button className="mb-3" variant="primary" type="submit">
            Sign Up
          </Button>
          <p className="text-center">
            Already a member? <a href="#" onClick={onToggle}>Sign In</a>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Register;
