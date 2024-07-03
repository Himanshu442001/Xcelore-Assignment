// src/components/Register.js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    role: Yup.string().oneOf(['admin', 'user'], 'Invalid role').required('Required'),
});

const Register = () => (
    <Container>
        <Typography variant="h4">Register</Typography>
        <Formik
            initialValues={{ name: '', email: '', password: '', role: 'user' }}
            validationSchema={RegisterSchema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
                axios.post(`${process.env.REACT_APP_API_URL}/users`, values)
                    .then(response => {
                        setSubmitting(false);
                        alert('User registered successfully');
                    })
                    .catch(error => {
                        setSubmitting(false);
                        setErrors({ api: error.response.data.msg });
                    });
            }}
        >
            {({ isSubmitting, errors }) => (
                <Form>
                    <Field name="name" type="text" as={TextField} label="Name" fullWidth margin="normal" />
                    <Field name="email" type="email" as={TextField} label="Email" fullWidth margin="normal" />
                    <Field name="password" type="password" as={TextField} label="Password" fullWidth margin="normal" />
                    <Field name="role" as="select" fullWidth margin="normal">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </Field>
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                        Register
                    </Button>
                    {errors.api && <Typography color="error">{errors.api}</Typography>}
                </Form>
            )}
        </Formik>
    </Container>
);

export default Register;
