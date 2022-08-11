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
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ProductDTO } from "../../../infrastructure/api/dtos/ProductDTO";
import { CategoryDTO } from "../../../infrastructure/api/dtos/CategoryDTO";
import { fetchCategories } from "../../../infrastructure/api/category-api";
import { AxiosResponse } from "axios";
import { exportAllProductToCSV, importProductFromCSVFile } from "../../../infrastructure/api/product-api";

import "../../shared/components/css/Table.css";
import "./css/product.css";

interface ImportDialogProps {
    isOpen: boolean,
    closeDialog: () => void
}


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
const initialValueForCategories: CategoryDTO[] = [];

function ProductList() {
    const pageSize = 5;
    const [currPage, setCurrPage] = useState(1);
    const [products, setProducts] = useState(initialValueForProducts)
    const [categories, setCategories] = useState(initialValueForCategories);
    const [totalProducts, setTotalProducts] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
      const getProducts = async () => {
        const products = await fetchProducts(currPage - 1, pageSize);
        setProducts(products!.content);
        setTotalProducts(products!.totalElements);
      };
      const getCategories = async () => {
        const categoriesList = await fetchCategories();
        setCategories(categoriesList);
      };
      getProducts();
      getCategories();
    }, [currPage]);


    const exportProduct = () => {
        exportAllProductToCSV()
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            const fileName = getFileName(response)
            link.setAttribute('download', fileName); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    }

    const getFileName = (response: AxiosResponse) => {
        let filename = "product.csv";
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var disposition = response.headers['content-disposition'];
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) { 
          filename = matches[1].replace(/['"]/g, '');
        }

        return filename;
    }

    const openDialogImportProduct = () => {
        setOpenDialog(true);
    }

    const closeDialog = () => {
        setOpenDialog(false);
    }

    const travelToPage = (page: number) => {
        setCurrPage(page);
    };  

    const addProduct = () => {
      navigate('/add-product');
    }

    function searchCategoryById(id: number) : string {
        if (!id) {
          ;
        }
        const category = categories.find(data => data.id == id);
        if (typeof category !== 'undefined') {
          return category.name;
        }
        return "";
    }
   
    return (
        <div className="container">
            <Typography align="center" variant="h3">List Product</Typography>
            <div className="w-100 header-btn">
              <Button variant="outlined" onClick={exportProduct} color="success" className="export-btn">Export Product</Button>
              <Button variant="contained" onClick={openDialogImportProduct}>Import Product</Button>
              <ImportCSVDialog isOpen={openDialog} closeDialog={closeDialog}/>
            </div>
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
                    <StyledTableCell align="right">{searchCategoryById(product.categoryId)}</StyledTableCell>
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



const ImportCSVDialog = (props: ImportDialogProps) => {
    const {isOpen} = props;
    const [file, setFile] = useState<File | null>(null);

    const handleClose = () => {
        props.closeDialog();
    };

    const fileSelected: React.ChangeEventHandler<HTMLInputElement> = e => {
        const target = e.target;
        setFile(target && target.files ? target.files[0]: null);
    }

    const upload = () => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            importProductFromCSVFile(formData)
                .then(res => {
                    console.error(res);
                    alert("Import File successfully");
                    handleClose();
                })
        } else {
            alert("Please select csv file to import!!!");
        }
    }

    return (
    <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>
            Upload Product From CSV
        </DialogTitle>
        <DialogContent>
            <TextField type="file" id="file" name="file" onChange={fileSelected} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
           Close
          </Button>
          <Button onClick={upload} color="primary" autoFocus>
           Upload
          </Button>
        </DialogActions>
      </Dialog>
    );
}
export default ProductList;