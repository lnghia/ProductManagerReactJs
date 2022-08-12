import { Button, Container, TextField, Typography, MenuItem } from '@mui/material';
import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { createNewProduct } from '../../../infrastructure/api/product-api';
import "../../shared/components/css/Table.css";
import { CategoryDTO } from "../../../infrastructure/api/dtos/CategoryDTO";
import { fetchCategories } from "../../../infrastructure/api/category-api";
import "../../shared/components/css/Table.css";

interface Role {
  name: string;
  id: number;
}

const roles: Role[] = [
  {
    name: "admin",
    id: 1,
  },
  {
    name: "user",
    id: 2,
  },
];

const initialValueForCategories: CategoryDTO[] = [];

export default function CreateProduct() {

    const [categories, setCategories] = useState(initialValueForCategories);
    const [selectedCategory, setSelectedCategory] = useState(0); 
    const [name, setName] = useState('')
    const [description, setDescrition] = useState('')
    const [nameError, setNameError] = useState(false)
    const [price, setPrice] = useState(0)

    const navigate = useNavigate();

    useEffect(() => {
      const getCategories = async () => {
        const result = await fetchCategories();
        setCategories(result);
      };
  
      getCategories();
    }, []);



    const handleSubmit = (e: React.FormEvent<HTMLInputElement| HTMLFormElement>) => {
        e.preventDefault()

        setNameError(false)
        if (name == '') {
            setNameError(true)
        }
      
        if (name && description) {
            let product = {name: name, price: price, description: description, categoryId: selectedCategory};
            // console.log(product)
            let result = createNewProduct(product);
            console.log(result);
        }
    }

    const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedCategory(parseInt(event.target.value));
    };

    const handleCancel = () => {
        navigate('/products');
    }

    return (
        <Container className="container">
            <Typography align="center" variant="h3">
                Create New Product
            </Typography>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <TextField
                    onChange={(e) => setName(e.target.value)}
                    label="Product Name"
                    variant='outlined'
                    color='secondary'
                    required
                    error={nameError}
                    style={{width: 400}}
                />
                <br/>
                <TextField
                    onChange={(e) => setDescrition(e.target.value)}
                    label="Description"
                    variant='outlined'
                    color='secondary'
                    fullWidth
                    multiline
                    rows={4}
                />
                <br/>
                <div>
                  <TextField
                      type="number"
                        name="price"
                        label="Price $"
                        variant="filled"
                        value={price}
                        style={{width: 200}}
                        onChange={e => setPrice(parseInt(e.target.value))}
                    />
                </div>
                <br/>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select category"
                  value={selectedCategory}
                  onChange={handleChangeCategory}
                  helperText="Please select category"
                  className="inputs-inside"
                  style={{width: 200}}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <br/>
                <div>
                  <Button
                      type="submit"
                      variant='contained'
                  >Save</Button>
                  <Button
                      onClick={handleCancel}
                      variant='outlined'
                  >Cancel</Button>
                </div>
                
            </form>
            

        </Container>
    );
}