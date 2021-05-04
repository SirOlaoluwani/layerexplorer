import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

export default function Subheader(props) {

    const {  } = props;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="subheader-navbar-cover">
            <div className="subheader-navbar-cover-flex">
                <div className="subheader-navbar-cover-item">
                    <div className="subheader-navbar-title-cover">
                        <h2 className="subheader-navbar-title">Welcome <br /><span className="subheader-navbar-subtitle">to Layer Explorer</span></h2>
                    </div>
                </div>
                <div className="subheader-navbar-cover-item">
                    <div className="menu-cover-flex">
                        <div className="menu-cover-item">
                            <Button 
                                className="menu-btn-cover"
                                color="default"
                                variant="text"
                                aria-controls="api-menu" 
                                aria-haspopup="true" 
                                onClick={handleClick}
                            >
                                API <KeyboardArrowDownIcon />
                            </Button>
                            <Menu
                                className="menu-cover"
                                id="api-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        </div>
                        <div className="menu-cover-item">
                            <Button 
                                className="menu-btn-cover"
                                color="default"
                                variant="text"
                                aria-controls="property-list-menu" 
                                aria-haspopup="true" 
                                onClick={handleClick}
                            >
                                Property list <KeyboardArrowDownIcon />
                            </Button>
                            <Menu
                                className="menu-cover"
                                id="property-list-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        </div>
                        <div className="menu-cover-item">
                            <Button 
                                className="menu-btn-cover"
                                color="default"
                                variant="text"
                                aria-controls="crowdsales-menu" 
                                aria-haspopup="true" 
                                onClick={handleClick}
                            >
                                Crowdsales <KeyboardArrowDownIcon />
                            </Button>
                            <Menu
                                className="menu-cover"
                                id="crowdsales-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        </div>
                        <div className="menu-cover-item">
                            <Button 
                                className="menu-btn-cover"
                                color="default"
                                variant="text"
                                aria-controls="misc-menu"
                                aria-haspopup="true" 
                                onClick={handleClick}
                            >
                                Misc <KeyboardArrowDownIcon />
                            </Button>
                            <Menu
                                className="menu-cover"
                                id="misc-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}