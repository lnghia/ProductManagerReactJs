import { ClassNames } from '@emotion/react';
import { Button, Container, TextField, Typography } from '@mui/material';
import React, { Component, useState } from 'react';
import { createProduct } from '../../../application/services/ProductService';
import { useNavigate } from "react-router-dom";

export default function CreateProductComponent() {

    const [name, setName] = useState('')
    const [description, setDescrition] = useState('')
    const [nameError, setNameError] = useState(false)

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()

        setNameError(false)
        if (name == '') {
            setNameError(true)
        }

        if (name && description) {
            let product = {name: name, price: 13, description: description, categoryId: 3};
            console.log(product);
            let result = createProduct(product);
            console.log(result);
        }
    }

    const handleCancel = () => {
        navigate('/products');
    }

    return (
        <Container>
            <Typography align="center" variant="h3">
                Create New Product
            </Typography>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <TextField
                    onChange={(e) => setName(e.target.value)}
                    label="Product Name"
                    variant='outlined'
                    color='secondary'
                    fullWidth
                    required
                    error={nameError}
                />
                <TextField
                    onChange={(e) => setDescrition(e.target.value)}
                    label="Description"
                    variant='outlined'
                    color='secondary'
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button
                    type="submit"
                    variant='contained'
                >Save</Button>
                <Button
                    onClick={handleCancel}
                    variant='outlined'
                >Cancel</Button>
            </form>
            

        </Container>
    );
}