import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import { fetchCategories } from "../../../infrastructure/api/category-api";
import { useNavigate } from "react-router-dom";
import { CategoryDTO } from "../../../infrastructure/api/dtos/CategoryDTO";
import { styled } from '@mui/material/styles';


const initialValueForCategories: CategoryDTO[] = [];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function CategoryList() {
  const [categories, setCategories] = useState(initialValueForCategories);

  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      const result = await fetchCategories();
      setCategories(result);
    };

    getCategories();
  }, []);

  const addCategory = () => {
    navigate('/add-category');
  }


  return (
    <div className="container">
      <Typography align="center" variant="h3">List Category</Typography>
      <Button variant="contained" onClick={addCategory}>Add category</Button>
      <TableContainer component={Paper} sx={{ maxWidth: 250 }}>
        <Table sx={{ maxWidth: 250 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow
                key={category.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">{category.id}</StyledTableCell>
                <StyledTableCell align="left">{category.name}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CategoryList;
