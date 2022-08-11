import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { exportAllProductToCSV, importProductFromCSVFile } from "../../../infrastructure/api/product-api";
import "./css/product.css";

interface ImportDialogProps {
    isOpen: boolean,
    closeDialog: () => void
}

export default function ProductList() {

    const [openDialog, setOpenDialog] = useState(false);

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
        console.log('dialog')
        setOpenDialog(false);
    }

    return (
        <div className="w-100 header-btn">
            <Button variant="outlined" onClick={exportProduct} color="success" className="export-btn">Export Product</Button>
            <Button variant="contained" onClick={openDialogImportProduct}>Import Product</Button>
            <ImportCSVDialog isOpen={openDialog} closeDialog={closeDialog}/>
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
