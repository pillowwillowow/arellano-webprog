import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';        
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Button from '@mui/material/Button';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ArticleIcon from '@mui/icons-material/Article';
import { useEffect } from 'react';

const drawerWidth = 240;
const dashboardNavItems = [
    {
        label: 'Dashboard',
        title: 'Dashboard',
        to: "/dashboard",
        icon: <DashboardIcon />
    },
    {
        label: 'Reports',
        title: 'Reports',
        to: "/dashboard/reports",
        icon: <AssessmentIcon />
    },
    {
        label: 'Users',
        title: 'Users',
        to: "/dashboard/users",
        icon: <PeopleIcon />
    },
    {
        label: "Articles",
        to: "/dashboard/dasharticles",
        icon: <ArticleIcon />
    },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  background: "linear-gradient(180deg, #6B8754, #13220d)",
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    background: "linear-gradient(180deg, #6B8754, #13220d)",
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',   
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    fontFamily: "'Lexend', sans-serif",
      "& *": {
    fontFamily: "'Lexend', sans-serif",
  }, 
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),

        background: "linear-gradient(180deg, #6B8754, #29471e)", 
        color: "#fff",
        
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], { 
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { 
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
        background: "linear-gradient(180deg, #6B8754, #13220d)",
        color: "#fff",
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
        background: "linear-gradient(180deg, #6B8754, #13220d)",
    }),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',      
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));
const StyledInputBase = styled('input')(({ theme }) => ({
    color: 'inherit',
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
        width: '20ch',    
    },
}));

const getPageTitle = (pathname) => {
    const navItem = dashboardNavItems.find(item => item.to === pathname);
    return navItem ? navItem.title : 'Dashboard';
}

const DashLayout = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleDrawerLogout = () => {
        navigate('/');
    };

    return (
        <>
             <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                {/*App Bar*/}
                {/* <AppBar position="fixed" open={open}> */}
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={open ? handleDrawerClose : handleDrawerOpen}
                            edge="start"
                            sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
                        >
                            {open ? <MenuOpenIcon /> : <MenuIcon />}
                        </IconButton>
                        <Typography 
                            variant="h6" 
                            noWrap 
                            component="div"
                            sx={{ flexGrow: 1, fontFamily: "'Lexend', sans-serif" }}
                            >
                            {loggedInUser ? `Hello, ${loggedInUser.userName || loggedInUser.firstName}` : "Dashboard"}
                            </Typography>
                        {/* Search */}
                        <Search>
                            <SearchIconWrapper>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Button color="inherit" sx={{fontFamily: "'lexend', sans-serif", fontSize: 16}}onClick={handleDrawerLogout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                {/* Drawer */}
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? (
                            <ChevronRightIcon /> 
                        ) : (
                            <ChevronLeftIcon />
                        )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    {/* Drawer List */}
                    <List>
                        {dashboardNavItems.map(({ label, to, icon }) => (
                            <ListItem key={label} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    component={Link}
                                    to={to}
                                    sx={{
                                        minHeight: 48,
                                        px: 2.5,
                                        display: "flex",
                                        justifyContent: open ? "flex-start" : "center",
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={label} 
                                        sx={{ opacity: open ? 1 : 0,  color: "#fff" }}
                                    /> 
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
             <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    fontFamily: "'Lexend', sans-serif",

                    "& *": {
                    fontFamily: "'Lexend', sans-serif",
                    },

                    background: "linear-gradient(135deg, #dfb2b9, #13220d)",
                    minHeight: "100vh",
                }}
                >
                    <DrawerHeader />
                    {/* Content */}
                    <Outlet />
                </Box>
            </Box>
            </>
        );
    };

    export default DashLayout;

                        
                        
