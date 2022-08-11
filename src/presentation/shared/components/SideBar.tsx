import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import CategoryIcon from '@mui/icons-material/Category';
import Toolbar from "@mui/material/Toolbar";

import "./css/SideBar.css";
import { useSelector } from "react-redux";
import { isAdmin } from "../../../application/redux/slices/UserSlice";
import { Link } from "react-router-dom";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function SideBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isAdminRole = useSelector(isAdmin);
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {isAdminRole && <Link to={"/users"} style={{}}>
          <ListItem key="users" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
        </Link>
        }

        {!isAdminRole && <Link to={"/products"}>
            <ListItem key="products" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PrecisionManufacturingIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItemButton>
            </ListItem>
          </Link>
        }
        {!isAdminRole && <Link to={"/categories"}>
            <ListItem key="categories" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItemButton>
            </ListItem>
          </Link>
        }

      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}