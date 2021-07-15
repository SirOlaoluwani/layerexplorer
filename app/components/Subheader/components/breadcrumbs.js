import React, { useState, useEffect } from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';



const BreadcrumbComponent = (props) => {

    const { pathname } = props;

    const urlPathnameArr = pathname.split('/');
    console.log('pathname Arr', urlPathnameArr);
    const urlPathname = urlPathnameArr[1];
    const urlQuery = urlPathnameArr[2];

    // if(pathname !== '') {

    // }

    if((urlPathname === 'properties') && (urlQuery === 'production')) {

        return (
            <div className="subheader-breadcrumbs-cover-flex">
                <div className="subheader-breadcrumbs-cover-item">
                    <Link to={'/'}>
                        <HomeIcon />
                    </Link>
                </div>
                <div className="subheader-breadcrumbs-cover-item">
                    <ChevronRightIcon />
                </div>
                <div className="subheader-breadcrumbs-cover-item">
                    Property list
                </div>
                <div className="subheader-breadcrumbs-cover-item">
                    <ChevronRightIcon />
                </div>
                <div className="subheader-breadcrumbs-cover-item">
                    Production
                </div>
            </div>
        )

    }else if((urlPathname === 'asset') && (typeof(parseInt(urlQuery)) === 'number')) {

        // alert(typeof(urlQuery))

        return (
            <div className="subheader-breadcrumbs-cover-flex">
                <div className="subheader-breadcrumbs-cover-item">
                    <Link to={'/'}>
                        <HomeIcon />
                    </Link>
                </div>
                <div className="subheader-breadcrumbs-cover-item">
                    <ChevronRightIcon />
                </div>
                <div className="subheader-breadcrumbs-cover-item">
                    Property list
                </div>
                <div className="subheader-breadcrumbs-cover-item">
                    <ChevronRightIcon />
                </div>
                <div className="subheader-breadcrumbs-cover-item">
                    Tradelayer Token
                </div>
            </div>
        );

    }else if((urlPathname === 'address') && (typeof(urlQuery) === 'string')) {

        return (
            <div className="subheader-breadcrumbs-cover-flex">
                <div className="subheader-breadcrumbs-cover-item">
                    <Link to={'/'}>
                        <HomeIcon />
                    </Link>
                </div>
                <div className="subheader-breadcrumbs-cover-item">
                    <ChevronRightIcon />
                </div>
                <div className="subheader-breadcrumbs-cover-item">
                    Property list
                </div>
                <div className="subheader-breadcrumbs-cover-item">
                    <ChevronRightIcon />
                </div>
                <div className="subheader-breadcrumbs-cover-item">
                    Issuer
                </div>
            </div>
        );

    }else if(urlPathname === '') {

        return (
            <div className="subheader-navbar-title-cover">
                <h2 className="subheader-navbar-title">Welcome <br /><span className="subheader-navbar-subtitle">to Layer Explorer</span></h2>
            </div>
        );

    }else {

        return (
            <div className="subheader-navbar-title-cover">
                <h2 className="subheader-navbar-title">Welcome <br /><span className="subheader-navbar-subtitle">to Layer Explorer</span></h2>
            </div>
        );
    }
}

export default function SubheaderBreadcrumbs(props) {

    console.log('props', props);

    const { locationPathname } = props;
    
    return ( 
        <React.Fragment>
            <div className="subheader-breadcrumbs-cover">
                <BreadcrumbComponent pathname={locationPathname} />
            </div>
        </React.Fragment>
    )
}