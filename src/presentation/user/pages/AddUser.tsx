import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, MenuItem } from "@mui/material";

import "./css/AddUser.css";
import { UserCreationDto } from "../../../infrastructure/api/dtos/UserCreationDto";
import { createNewUser } from "../../../infrastructure/api/user-api";

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

export default function AddUser() {
  const [selectedRole, setSelectedRole] = React.useState(0);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(parseInt(event.target.value));
  };

  const valide = () => {
    return (
      firstName &&
      lastName &&
      email &&
      selectedRole &&
      password &&
      confirmPassword
    );
  };

  const handleSubmit = () => {
    if (!valide()) {
      alert("Please fill out all the required fields.");

      return;
    }

    const newUser: UserCreationDto = {
      id: 1,
      firstName: firstName,
      lastName: lastName,
      email: email,
      roleId: selectedRole,
      password: password,
      passwordConfirm: confirmPassword,
    };

    const createUser = async (user: UserCreationDto) => {
      await createNewUser(user);
    };

    createUser(newUser);
  };

  const handleChangeFirstName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="20%"
      justifySelf="center"
      alignSelf="center"
    >
      <div className="button-container">
        <h2>Add user</h2>
      </div>
      <div className="inputs-container">
        <TextField
          required
          id="outlined-required"
          label="First Name"
          className="inputs-inside"
          onChange={handleChangeFirstName}
        />
      </div>
      <div className="inputs-container">
        <TextField
          required
          id="outlined-required"
          label="Last Name"
          className="inputs-inside"
          onChange={handleChangeLastName}
        />
      </div>
      <div className="inputs-container">
        <TextField
          required
          id="outlined-required"
          label="Email"
          className="inputs-inside"
          onChange={handleChangeEmail}
        />
      </div>
      <div className="inputs-container">
        <TextField
          required
          id="outlined-required"
          label="Password"
          className="inputs-inside"
          onChange={handleChangePassword}
        />
      </div>
      <div className="inputs-container">
        <TextField
          required
          id="outlined-required"
          label="Confirm password"
          className="inputs-inside"
          onChange={handleChangeConfirmPassword}
        />
      </div>
      <div className="inputs-container">
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={selectedRole}
          onChange={handleChange}
          helperText="Please select user's role"
          className="inputs-inside"
        >
          {roles.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className="button-container">
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Box>
  );
}
