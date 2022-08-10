import { TablePagination } from "@mui/material";
import React, { useState } from "react";

interface Props {
  onPageChange: (page: number) => void;
  totalElements: number;
  pageSize: number;
}

function Pagination(props: Props) {
  const [currPage, setCurrPage] = useState(1);

  const handleOnPageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setCurrPage(newPage);
    props.onPageChange(newPage);
  };

  return (
    <TablePagination
      count={props.totalElements}
      page={currPage - 1}
      rowsPerPage={props.pageSize}
      onPageChange={handleOnPageChange}
    />
  );
}

export default Pagination;
