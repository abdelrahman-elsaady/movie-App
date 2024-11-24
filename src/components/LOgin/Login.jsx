import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../Auth/auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Add your login logic here
    // On success:
    // navigate('/home');
  };

  return (
    <div className="auth-container">
      <Form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="auth-title">Sign In</h2>
        
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email'
              }
            })}
          />
          {errors.email && (
            <div className="error-message">{errors.email.message}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <div className="password-input-wrapper">
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              })}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <div className="error-message">{errors.password.message}</div>
          )}
        </Form.Group>

        <button className="auth-button" type="submit">
          Sign In
        </button>

        <Link to="/register" className="auth-link">
          New to Movies? Sign up now
        </Link>
      </Form>
    </div>
  );
}
