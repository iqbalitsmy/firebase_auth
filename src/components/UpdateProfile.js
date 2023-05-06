import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordlRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
      e.preventDefault();
      if(passwordlRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Password do not match");
      }
        setError('');
        setLoading(true);
        const promises = []
        if(emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordlRef.current.value) {
            promises.push(updatePassword(passwordlRef.current.value))
        }
        Promise.all(promises).then(() => {
            navigate('/');
        }).catch(() => {
            setError("Failed to update account")
        }).finally(() => {
            setLoading(false);
        })
    }
  return (
    <>
      <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Update Profile</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} required defaultValue={currentUser.email} />-
                </Form.Group>
                <Form.Group id='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={passwordlRef}  
                    placeholder='Leave blank to keep the same'/>
                </Form.Group>
                <Form.Group id='password-confirm'>
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type='password' ref={passwordConfirmRef} />
                </Form.Group>
                <Button type='submit' disabled={loading} className='w-100 mt-2'>Update</Button>
            </Form>
            <div className='w-100 text-center mt-2'>
                <Link to="/">Cancel</Link>
            </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Create Account <Link to="/signup">Signup</Link>
      </div>
    </>
  )
}
