/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import styled from 'styled-components';
import SearchBox from 'components/SearchBox';
import {
  ECOSYSTEM_PROD_NAME,
  ECOSYSTEM_TEST_NAME,
} from 'containers/App/constants';
import {
  ALL_PROPERTIES,
  NATIVE_PROPERTIES,
  ORACLE_PROPERTIES,
} from 'containers/Properties/constants';

import {
  Alert,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from 'reactstrap';
import { CONFIG } from '../../config';

const IMG = styled.img`
  padding-bottom: 3px;
  padding-right: 9px;
`;

const StyledNavItem = styled(NavItem)`
  font-size: 16px;
`;

const StyledCollapse = styled(Collapse)`
  font-size: 16px;
`;

class Header extends React.PureComponent {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle(e) {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div>
        <Navbar color="faded" light expand="sm" className="d-block">
          <div className="d-flex">
            <NavbarBrand href="/">
              <IMG src="/favicon.png" alt={CONFIG.NAME} />
              {CONFIG.NAME}
            </NavbarBrand>
            <div className="ml-auto w-50 d-flex">
              <div className="w-100 ml-auto d-none-only-sm-down">
                <SearchBox />
              </div>
              <NavbarToggler onClick={this.toggle} />
            </div>
          </div>
          <div className="d-flex">
            <StyledCollapse isOpen={this.state.isOpen} navbar>
              <Nav navbar className="ml-auto">
                <StyledNavItem>
                  <NavLink href="/">Home</NavLink>
                </StyledNavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Property List
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavLink href={`/properties/${ALL_PROPERTIES}`}>
                        Properties
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href={`/properties/${ORACLE_PROPERTIES}`}>
                        Oracle Contracts
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href={`/properties/${NATIVE_PROPERTIES}`}>
                        Native Contracts
                      </NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </StyledCollapse>
          </div>
        </Navbar>
        <div className="w-100 ml-auto d-block-only-sm-down">
          <SearchBox />
        </div>
        <div className="w-100 ml-auto d-block-only-sm-down d-none">
          <Alert color="warning">
            <span>
              <strong>Planned Maintenance: </strong>
              Starting at 18:30UTC On Feb 18th {CONFIG.NAME} will have a short
              maintenance window to upgrade back-end components. We expect this
              Maintenance to last up to an hour and during the maintenance Omni
              Explorer services will be unavailable. Once complete this message
              will be removed
            </span>
          </Alert>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

NavbarToggler.propTypes = {
  type: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: url => dispatch(routeActions.push(url)),
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(Header);
