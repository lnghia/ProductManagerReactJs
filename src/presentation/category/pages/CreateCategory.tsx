import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import { CategoryCreationDTO } from '../../../infrastructure/api/dtos/CategoryCreationDTO';
import { createNewCategory } from '../../../infrastructure/api/category-api';
import "../../shared/components/css/Table.css";
import ImportDialogProps from '@/presentation/shared/ImportDialogProps';

const CreateCategory = (props: ImportDialogProps) => {
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(false)

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
        props.closeDialog(null);
      };

      const { isOpen } = props;

      const handleClose = () => {
          props.closeDialog(null);
      };
  

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>
            Create New Category
            </DialogTitle>

            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <DialogContent>
                <TextField
                    onChange={(e) => setName(e.target.value)}
                    label="Category name"
                    variant='outlined'
                    color='secondary'
                    fullWidth
                    required
                    error={nameError}
                />

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


export default CreateCategory;