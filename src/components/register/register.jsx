import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../Auth/auth.css';

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm();

  const password = watch('password');

  const onSubmit = (data) => {
    console.log(data);
    // Add your registration logic here
    // On success:
    // navigate('/login');
  };

  return (
    <div className="auth-container">
      <Form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="auth-title">Sign Up</h2>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters'
              }
            })}
          />
          {errors.name && (
            <div className="error-message">{errors.name.message}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Choose a username"
            {...register('username', {
              required: 'Username is required',
              validate: value => !/\s/.test(value) || 'Username cannot contain spaces'
            })}
          />
          {errors.username && (
            <div className="error-message">{errors.username.message}</div>
          )}
        </Form.Group>

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

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <div className="password-input-wrapper">
            <Form.Control
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <div className="error-message">{errors.confirmPassword.message}</div>
          )}
        </Form.Group>

        <button className="auth-button" type="submit">
          Sign Up
        </button>

        <Link to="/login" className="auth-link">
          Already have an account? Sign in
        </Link>
      </Form>
    </div>
  );
}
