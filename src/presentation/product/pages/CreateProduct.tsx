import { fetchCategories } from "../../../infrastructure/api/category-api";
import { createNewProduct } from '../../../infrastructure/api/product-api';
import { CategoryDTO } from "@/infrastructure/api/dtos/CategoryDTO";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ImportDialogProps from "@/presentation/shared/ImportDialogProps";

const CreateProduct = (props: ImportDialogProps) => {
    const { isOpen } = props;

    const handleClose = () => {
        props.closeDialog(null);
    };

    const initialValueForCategories: CategoryDTO[] = [];
    const [categories, setCategories] = useState(initialValueForCategories);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [name, setName] = useState('')
    const [description, setDescrition] = useState('')
    const [nameError, setNameError] = useState(false)
    const [price, setPrice] = useState(0)

    useEffect(() => {
        const getCategories = async () => {
            const result = await fetchCategories();
            setCategories(result);
        };

        getCategories();
    }, []);



    const handleSubmit = (e: React.FormEvent<HTMLInputElement | HTMLFormElement>) => {
        e.preventDefault()

        setNameError(false)
        if (name == '') {
            setNameError(true)
        }
        if (name && description) {
            let product = { name: name, price: price, description: description, categoryId: selectedCategory };
            createNewProduct(product);
        }
        props.closeDialog(null);
    }

    const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCategory(parseInt(event.target.value));
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>
                Create New Product
            </DialogTitle>

            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        onChange={(e) => setName(e.target.value)}
                        label="Product Name"
                        variant='outlined'
                        color='secondary'
                        required
                        error={nameError}
                        style={{ width: 400 }}
                    />
                    <br />
                    <TextField
                        onChange={(e) => setDescrition(e.target.value)}
                        label="Description"
                        variant='outlined'
                        color='secondary'
                        fullWidth
                        multiline
                        rows={4}
                    />
                    <br />
                    <div>
                        <TextField
                            type="number"
                            name="price"
                            label="Price $"
                            variant="filled"
                            value={price}
                            style={{ width: 200 }}
                            onChange={e => setPrice(parseInt(e.target.value))}
                        />
                    </div>
                    <br />
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Select category"
                        value={selectedCategory}
                        onChange={handleChangeCategory}
                        helperText="Please select category"
                        className="inputs-inside"
                        style={{ width: 200 }}
                    >
                        {categories.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <br />

                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        variant='contained'
                    >Save</Button>
                    <Button
                        onClick={handleClose}
                        variant='outlined'
                    >Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}


export default CreateProduct;

function result(result: any) {
    throw new Error("Function not implemented.");
}
