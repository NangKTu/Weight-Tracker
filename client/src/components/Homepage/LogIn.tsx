import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';

type Props = {
  onToggle: () => void;
};
function SignInForm({ onToggle }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData.entries());
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = await res.json();
      sessionStorage.setItem('token', token);
      navigate('/memPage');
      console.log('Signed In', user, '; received token.');
    } catch (err) {
      alert(`Error signing in: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login template d-flex justify-content-center 100-w vh-60">
      <div className="50-w p-5 rounded">
        <Form onSubmit={handleSubmit}>
          <h3 className="text-center">Sign In</h3>
          <FormGroup className="mb-2">
            <label>
              Username
              <FormControl required name="username" type="text" />
            </label>
          </FormGroup>
          <FormGroup className="mb-3">
            <label>
              Password
              <FormControl required name="password" type="password" />
            </label>
          </FormGroup>
          <Button type="submit" disabled={isLoading}>
            Sign In
          </Button>
          <p className="text-center">
            Not a member?{' '}
            <a href="#" onClick={onToggle}>
              Sign Up
            </a>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default SignInForm;
