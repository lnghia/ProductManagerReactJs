import { ClassNames } from '@emotion/react';
import { Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CategoryCreationDTO } from '../../../infrastructure/api/dtos/CategoryCreationDTO';
import { createNewCategory } from '../../../infrastructure/api/category-api';
import "../../shared/components/css/Table.css";

export default function CreateCategory(this: any) {

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(false)

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLInputElement | HTMLFormElement>) => {
        e.preventDefault()

        setNameError(false)
        if (name == '') {
            setNameError(true)
        }

        const newCategory: CategoryCreationDTO = {
          name: name,
        };
    
        const createCategory = async (category: CategoryCreationDTO) => {
          await createNewCategory(category);
        };
    
        createCategory(newCategory);
      };

    const handleCancel = () => {
        navigate('/categories');
    }

    return (
        <Container className="container">
            <Typography align="center" variant="h3">Create New Category</Typography>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <TextField
                    onChange={(e) => setName(e.target.value)}
                    label="Category name"
                    variant='outlined'
                    color='secondary'
                    fullWidth
                    required
                    error={nameError}
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