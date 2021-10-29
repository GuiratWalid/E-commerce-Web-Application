import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import getCategories from '../../Data/Categorie/ActionCategorie';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

import { styled, alpha, createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';


// SearchBox Style
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.08),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const btnTheme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#000000',
        },
        dark: {
            main: '#555555'
        },
        light: {
            main: '#eeeedd'
        }

    },
});

const mapStateToProps = state => {
    return {
        categories: state.categorie.categories,
        error: state.categorie.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCategorie: () => dispatch(getCategories())
    }
};

const NavBar = ({ categories, error, getCategorie }) => {

    useEffect(() => {
        getCategorie();
    }, [getCategorie]);

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id='primary-search-account-menu-mobile'
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>Accueil</MenuItem>
            <MenuItem>Nouveaux Produits</MenuItem>
            <MenuItem>Categories</MenuItem>
            <MenuItem>Contact</MenuItem>
        </Menu>
    );

    return (
        <ThemeProvider theme={btnTheme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 1, color: "black" }}
                        >
                            <Badge badgeContent={1} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography
                            variant="5"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            <p className="title">
                                Omi Douja -  امي دوجة
                            </p>
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Search>
                            <SearchIconWrapper >
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Recherche ..."
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Box sx={{ flexGrow: 1 }} />
                        <Stack
                            spacing={1}
                            direction="row"
                            sx={{ display: { md: 'flex', xs: 'none' } }}
                        >
                            <Button variant="text" color="inherit"><h4 className="menu">Accueil</h4></Button>
                            <Button variant="text" color="inherit"><h4 className="menu">Nouveaux<br />Produits</h4></Button>
                            <Button variant="text" color="inherit"><h4 className="menu">Categories</h4></Button>
                            <Button variant="text" color="inherit"><h4 className="menu">Contact</h4></Button>
                        </Stack>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="Afficher plus"
                                aria-controls="primary-search-account-menu-mobile"
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
            </Box >
        </ThemeProvider>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);