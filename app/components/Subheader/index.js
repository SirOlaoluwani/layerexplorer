import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {
    ECOSYSTEM_PROD_NAME,
    ECOSYSTEM_TEST_NAME,
} from 'containers/App/constants';
import { Link, useLocation } from 'react-router-dom';
import SubheaderBreadcrumbs from './components/breadcrumbs';


export default function Subheader(props) {

    const {  } = props;

    const menuBtnObj = {
        apiMenuBtn: null,
        propertyListMenuBtn: null,
        crowdsalesMenuBtn: null,
        miscMenuBtn: null,
    }

    const [anchorEl, setAnchorEl] = useState(menuBtnObj);

    const locationPathname = window.location.pathname;

    const handleClick = (event) => {
        setAnchorEl(prevState => ({
            ...prevState,
            [event.currentTarget.id]: event.currentTarget
        }));
        // alert(event.currentTarget.id)
    };
    
    const handleClose = (menuType = null) => {
        // setAnchorEl(null);

        // alert(menuType)

        if(menuType !== null) {

            setAnchorEl(prevState => ({
                ...prevState,
                [menuType]: null
            }));
        }
    };

    return (
        <div className="subheader-navbar-cover">
            <div className="subheader-navbar-cover-flex">
                <div className="subheader-navbar-cover-item">
                    <SubheaderBreadcrumbs locationPathname={locationPathname} />
                </div>
                <div className="subheader-navbar-cover-item">
                    <div className="menu-cover-flex">
                        <div className="menu-cover-item">
                            <Button 
                                className="menu-btn-cover"
                                id="apiMenuBtn"
                                color="default"
                                variant="text"
                                aria-controls="api-menu" 
                                aria-haspopup="true" 
                                onClick={handleClick}
                            >
                                API <KeyboardArrowDownIcon />
                            </Button>
                            <Menu
                                id="api-menu"
                                anchorEl={anchorEl.apiMenuBtn}
                                keepMounted
                                open={Boolean(anchorEl.apiMenuBtn)}
                                onClose={(menuType) => handleClose('apiMenuBtn')}
                                PaperProps={{
                                    style: {
                                        marginTop: '40px',
                                    }
                                }}
                            >
                                <MenuItem onClick={(menuType) => handleClose('apiMenuBtn')}>Documentation</MenuItem>
                                {/* <MenuItem onClick={(menuType) => handleClose('apiMenuBtn')}>My account</MenuItem>
                                <MenuItem onClick={(menuType) => handleClose('apiMenuBtn')}>Logout</MenuItem> */}
                            </Menu>
                        </div>
                        <div className="menu-cover-item">
                            <Button 
                                className="menu-btn-cover"
                                id="propertyListMenuBtn"
                                color="default"
                                variant="text"
                                aria-controls="property-list-menu" 
                                aria-haspopup="true" 
                                onClick={handleClick}
                            >
                                Property List <KeyboardArrowDownIcon />
                            </Button>
                            <Menu
                                id="property-list-menu"
                                anchorEl={anchorEl.propertyListMenuBtn}
                                keepMounted
                                open={Boolean(anchorEl.propertyListMenuBtn)}
                                onClose={(menuType) => handleClose('propertyListMenuBtn')}
                                PaperProps={{
                                    style: {
                                        marginTop: '40px',
                                    }
                                }}
                            >
                                <MenuItem onClick={(menuType) => handleClose('propertyListMenuBtn')} component={Link} to={`/properties/${ECOSYSTEM_PROD_NAME.toLowerCase()}`}>
                                    LTC Production
                                </MenuItem>
                                <MenuItem onClick={(menuType) => handleClose('propertyListMenuBtn')} component={Link} to={`/properties/${ECOSYSTEM_PROD_NAME.toLowerCase()}`}>
                                    LTC Test
                                </MenuItem>
                                <MenuItem onClick={(menuType) => handleClose('propertyListMenuBtn')}>BTC Production</MenuItem>
                                <MenuItem onClick={(menuType) => handleClose('propertyListMenuBtn')}>BTC Test</MenuItem>
                            </Menu>
                        </div>
                        <div className="menu-cover-item">
                            <Button 
                                className="menu-btn-cover"
                                id="crowdsalesMenuBtn"
                                color="default"
                                variant="text"
                                aria-controls="crowdsales-menu" 
                                aria-haspopup="true" 
                                onClick={handleClick}
                            >
                                Crowdsales <KeyboardArrowDownIcon />
                            </Button>
                            <Menu
                                id="crowdsales-menu"
                                anchorEl={anchorEl.crowdsalesMenuBtn}
                                keepMounted
                                open={Boolean(anchorEl.crowdsalesMenuBtn)}
                                onClose={(menuType) => handleClose('crowdsalesMenuBtn')}
                                PaperProps={{
                                    style: {
                                        marginTop: '40px',
                                    }
                                }}
                            >
                                <MenuItem onClick={(menuType) => handleClose('crowdsalesMenuBtn')}>Profile</MenuItem>
                                <MenuItem onClick={(menuType) => handleClose('crowdsalesMenuBtn')}>My account</MenuItem>
                                <MenuItem onClick={(menuType) => handleClose('crowdsalesMenuBtn')}>Logout</MenuItem>
                            </Menu>
                        </div>
                        <div className="menu-cover-item">
                            <Button 
                                className="menu-btn-cover"
                                id="miscMenuBtn"
                                color="default"
                                variant="text"
                                aria-controls="misc-menu"
                                aria-haspopup="true" 
                                onClick={handleClick}
                            >
                                Misc <KeyboardArrowDownIcon />
                            </Button>
                            <Menu
                                id="misc-menu"
                                anchorEl={anchorEl.miscMenuBtn}
                                keepMounted
                                open={Boolean(anchorEl.miscMenuBtn)}
                                onClose={(menuType) => handleClose('miscMenuBtn')}
                                PaperProps={{
                                    style: {
                                        marginTop: '40px',
                                    }
                                }}
                            >
                                <MenuItem onClick={(menuType) => handleClose('miscMenuBtn')}>Profile</MenuItem>
                                <MenuItem onClick={(menuType) => handleClose('miscMenuBtn')}>My account</MenuItem>
                                <MenuItem onClick={(menuType) => handleClose('miscMenuBtn')}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}