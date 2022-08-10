import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableFooter, Typography } from '@mui/material';
import Pagination from "../../shared/components/Pagination";


import { fetchProducts } from '../../../infrastructure/api/product-api';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserDto } from "@/infrastructure/api/dtos/user";
import { ProductDTO } from "@/infrastructure/api/dtos/ProductDTO";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const initialValueForProducts: ProductDTO[] = [];

function ProductList() {
    const pageSize = 5;
    const [currPage, setCurrPage] = useState(1);
    const [products, setProducts] = useState(initialValueForProducts)
    const [totalProducts, setTotalProducts] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
      const getProducts = async () => {
        let result = await fetchProducts(currPage - 1, pageSize);
        setProducts(result!.content);
        setTotalProducts(result!.totalElements);
      };
  
      getProducts();
    }, [currPage]);

    const travelToPage = (page: number) => {
        setCurrPage(page);
    };  

    const addProduct = () => {
      navigate('/add-product');
    }
   

    return (
        <div>
            <Typography align="center" variant="h3">List Product</Typography>
            <Button variant="contained" onClick={addProduct}>Add Product</Button>

            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell align="right">Name</StyledTableCell>
                    <StyledTableCell align="right">Price</StyledTableCell>
                    <StyledTableCell align="right">Description</StyledTableCell>
                    <StyledTableCell align="right">Created Day</StyledTableCell>
                    <StyledTableCell align="right">Category</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {products.map((product) => (
                    <StyledTableRow key={product.id}>
                    <StyledTableCell align="right">{product.name}</StyledTableCell>
                    <StyledTableCell align="right">{product.price}$</StyledTableCell>
                    <StyledTableCell align="right">{product.description}</StyledTableCell>
                    <StyledTableCell align="right">{product.createdDate}</StyledTableCell>
                    <StyledTableCell align="right">{product.categoryId}</StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <Pagination
                            onPageChange={travelToPage}
                            pageSize={pageSize}
                            totalElements={totalProducts}
                        />
                        </TableRow>
                </TableFooter>
            </Table>
            </TableContainer>
        </div>
    );

}
export default ProductList;

