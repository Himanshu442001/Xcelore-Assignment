// src/components/UserCRUD.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Container, TextField, TablePagination, Snackbar, Alert } from '@mui/material';



const dispatch = useDispatch();
const users = useSelector(state => state.user.users);
const loading = useSelector(state => state.user.loading);
const error = useSelector(state => state.user.error);

const fetchUsers = () => async (dispatch) => {
    dispatch({ type: 'FETCH_USERS_REQUEST' });
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
        });
        dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data.users });
    } catch (err) {
        dispatch({ type: 'FETCH_USERS_FAILURE', payload: 'Failed to fetch users' });
    }
};

const handleDelete = async (id) => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
        });
        dispatch(fetchUsers()); // Refetch users after deletion
    } catch (err) {
        console.error('Failed to delete user:', err);
        // Handle error, possibly dispatch an error action
    }
};

const UserCRUD = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, [page, rowsPerPage, search]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                },
                params: {
                    page: page + 1,
                    limit: rowsPerPage,
                    search: search,
                },
            });
            setUsers(response.data.users);
            setTotal(response.data.total);
        } catch (err) {
            setError('Failed to fetch users');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`, {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                },
            });
            setSuccess('User deleted successfully');
            fetchUsers();
        } catch (err) {
            setError('Failed to delete user');
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(null);
        setSuccess(null);
    };

    return (
        <Container>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                margin="normal"
                value={search}
                onChange={handleSearchChange}
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {error && (
                <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            )}
            {success && (
                <Snackbar open={!!success} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        {success}
                    </Alert>
                </Snackbar>
            )}
        </Container>
    );
};

export default UserCRUD;
