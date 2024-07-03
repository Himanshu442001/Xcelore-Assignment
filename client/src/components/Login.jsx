// src/components/Login.js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

const Login = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Typography variant="h4">Login</Typography>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, values)
                        .then(response => {
                            localStorage.setItem('token', response.data.token);
                            setSubmitting(false);
                            history.push('/admin/users');
                        })
                        .catch(error => {
                            setSubmitting(false);
                            setErrors({ api: error.response.data.msg });
                        });
                }}
            >
                {({ isSubmitting, errors }) => (
                    <Form>
                        <Field name="email" type="email" as={TextField} label="Email" fullWidth margin="normal" />
                        <Field name="password" type="password" as={TextField} label="Password" fullWidth margin="normal" />
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            Login
                        </Button>
                        {errors.api && <Typography color="error">{errors.api}</Typography>}
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default Login;
