
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login() {


   const [user,setUser] =useState({
        email: '',
        password: '',
      });
    
       const[errors,setErrors]=useState({
           emailError:null,
            passError:null    
       });

       const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      const handleChange=(e)=>{
        
        setUser({...user, [e.target.name]: e.target.value })

        if(e.target.name==='email'){
            setErrors({...errors, emailError:(emailPattern.test(e.target.value)==false)?"email is rwquired":"" })
        }else{
            setErrors({...errors, passError:(e.target.value.length<8)?"password should be at least 8 characters":"" })
        }
      }

  return (


    <>
    <div className='container-fluid mb-5 '>
    <div className='row d-flex justify-content-center  '>
    <Form className='col-6 b-black border border-danger'>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' value={user.email} required onChange={(e)=>{handleChange(e)}} />
      </Form.Group>
      <p className='text-danger' >{errors.emailError}</p>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={user.password} required onChange={(e)=>{handleChange(e)}}/>
      </Form.Group>
      <p className='text-danger' >{errors.passError}</p>


      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </div>
    
    </>

  )
}
