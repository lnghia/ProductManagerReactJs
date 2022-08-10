import { UserDto } from "../../../infrastructure/api/dtos/user";
import { fetchUsers } from "../../../infrastructure/api/user-api";
import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TableFooter } from "@mui/material";
import Pagination from "../../shared/components/Pagination";

const initialValueForUsers: UserDto[] = [];

function UserList() {
  const [currPage, setCurrPage] = useState(1);
  const pageSize = 1;
  const [users, setUsers] = useState(initialValueForUsers);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const getUsers = async () => {
      let result = await fetchUsers(currPage - 1, pageSize);
      setUsers(result!.content);
      setTotalUsers(result!.totalElements);
    };

    getUsers();
  }, [currPage]);

  const travelToPage = (page: number) => {
    setCurrPage(page);
  };

  //use Pagination here, pass the function travelToPage to onPageChange, pass some other parameters, see Pagination.tsx for more details

  return (
    <div>
      <Button variant="contained">Add user</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">email</TableCell>
              <TableCell align="right">firstName</TableCell>
              <TableCell align="right">lastName</TableCell>
              <TableCell align="right">role</TableCell>
              <TableCell align="right">active</TableCell>
              <TableCell align="right">createdDate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.firstName}</TableCell>
                <TableCell align="right">{user.lastName}</TableCell>
                <TableCell align="right">{user.role}</TableCell>
                <TableCell align="right">{user.active!.toString()}</TableCell>
                <TableCell align="right">{user.createdDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <Pagination
                onPageChange={travelToPage}
                pageSize={pageSize}
                totalElements={totalUsers}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserList;
