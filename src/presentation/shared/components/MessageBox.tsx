import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type messageType = "error" | "warning" | "info" | "success";

interface Props {
  message: string;
  open?: boolean;
  type?: messageType;
  onClose: () => void;
}

export default function MessageBox({
  open = true,
  type = "info",
  message,
  onClose,
}: Props) {
  const [isOpen, setIsOpen] = React.useState(open);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={1000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
