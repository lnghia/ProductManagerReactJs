import { CategoryDTO } from "../../../infrastructure/api/dtos/CategoryDTO";
import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TableFooter } from "@mui/material";
import { fetchCategories } from "../../../infrastructure/api/category-api";


const initialValueForCategories: CategoryDTO[] = [];

function CategoryList() {
  const [currPage, setCurrPage] = useState(1);
  const pageSize = 1;
  const [categories, setCategories] = useState(initialValueForCategories);
  const [totalCategories, setTotalCategories] = useState(0);

  useEffect(() => {
    const getCategories = async () => {
      let result = await fetchCategories();
      setCategories(result);
    };

    getCategories();
  }, [currPage]);

  const travelToPage = (page: number) => {
    setCurrPage(page);
  };

  //use Pagination here, pass the function travelToPage to onPageChange, pass some other parameters, see Pagination.tsx for more details

  return (
    <div>
      <Button variant="contained">Add category</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow
                key={category.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {category.id}
                </TableCell>
                <TableCell align="right">{category.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CategoryList;
