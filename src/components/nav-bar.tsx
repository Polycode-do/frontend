import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Grid, Tooltip } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { User } from "../models/user";
import { logout } from "../services/auth";
import { ContextData, UserContext } from "../App";

function displayAuthMenu(
  handleCloseUserMenu: () => void,
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void,
  anchorElUser: HTMLElement | null,
  userInfo?: User,
  API_URL?: string
) {
  return (
    <div>
      <Grid container>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="User Settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar src="" alt="User" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem key="1">
              <Typography>Welcome</Typography>
            </MenuItem>
            <MenuItem key="2" onClick={handleCloseUserMenu}>
              <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
                <Button color="inherit" variant="text">
                  Profile
                </Button>
              </Link>
            </MenuItem>
            <MenuItem key="3" onClick={handleCloseUserMenu}>
              <Link
                to="/landingpage"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button onClick={logout} color="inherit" variant="text">
                  Disconnect
                </Button>
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      </Grid>
    </div>
  );
}

export default function NavBar() {
  let leftLinks: { name: string; link: string }[] = [];

  const { user } = useContext<ContextData>(UserContext);

  if (user) {
    leftLinks.push(
      {
        name: "Polycode",
        link: "/",
      },
      {
        name: "Practice",
        link: "#",
      },
      {
        name: "Certification",
        link: "#",
      },
      {
        name: "Challenges",
        link: "/challenge",
      }
    );
  } else {
    leftLinks.push({
      name: "Polycode",
      link: "/",
    });
  }

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: { md: "flex", lg: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { md: "flex", lg: "none" },
              }}
            >
              {leftLinks.map((link, index) => (
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={link.link}
                  key={index}
                >
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{link.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "none", lg: "block" },
            }}
          >
            {leftLinks.map((link, index) => {
              return (
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={link.link}
                  key={index}
                >
                  <Button color="inherit" variant="text">
                    {link.name}
                  </Button>
                </Link>
              );
            })}
          </Typography>
          {Boolean(user) &&
            displayAuthMenu(
              handleCloseUserMenu,
              handleOpenUserMenu,
              anchorElUser,
              user
            )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
