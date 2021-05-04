/**
 *
 * ErrorBoundary
 *
 */

import React, {useState} from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Jumbotron } from 'reactstrap';
import { routeActions } from 'redux-simple-router';
import { makeSelectStatus } from 'components/ServiceBlock/selectors';
import { Link } from 'react-router-dom';
import moment from 'moment/src/moment';
import { cleanError } from './actions';
import reducer from './reducer';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
} from 'reactstrap';
// import blocksLogo from '../../assets/images/blocks-logo.png';
// import propertiesLogo from '../../assets/images/properties-logo.png';
// import idListLogo from '../../assets/images/id-list-logo.png';
// import MatButton from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuList from '@material-ui/core/MenuList';
// import MenuItem from '@material-ui/core/MenuItem';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SideNavigation from '../SideNavigation';
import Subheader from '../Subheader';


const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
  // menuRoot: {
  //   display: 'flex',
  // },
  // menuPaper: {
  //   marginRight: theme.spacing(2),
  // },
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
  }

  componentWillUnmount() {
    this.setState({
      error: null,
      errorInfo: null,
    });
  }

  render() {
    // const classes = useStyles();
    
    const lastParsed = this.props.status.last_parsed;
    let content = this.props.children;

    if (this.props.st.error) {
      const { error } = this.props.st;

      content = (
        <div className="error-boundary-cover">
          <Row noGutters className="error-boundary-cover-flex">
            <div xs={12} sm={12} md={3} className="error-boundary-cover-item">
              <SideNavigation />
            </div>
            <div xs={12} sm={12} md={9} className="error-boundary-cover-item">
              <Modal isOpen={!this.props.st.modal} toggle={this.props.cleanError} backdrop>
                <ModalHeader toggle={this.props.cleanError}></ModalHeader>
                <ModalBody>
                  <Jumbotron className="text-center">
                    <h3>{error.message}</h3>
                    <br />
                    <h5>
                      Please <Link onClick={()=>window.location.reload()} to="" refresh="true"><span>retry</span></Link> again in few moments.
                    </h5>
                  </Jumbotron>
                </ModalBody>
              </Modal>
              <div className="error-boundary-inner-cover-flex">
                <div className="error-boundary-inner-cover-item">
                  <Subheader />
                </div>
              </div>
              {this.props.children}
            </div>
          </Row>
        </div>
      );
    } else if (this.state.error) {
      content = (
        <div>
          <Jumbotron>
            <h1>Something was wrong..</h1>
            <hr className="my-2" />
            <br />
            <h3>{this.state.error && this.state.error.toString()}</h3>
            <br />
            <h5>
              Please <Link onClick={()=>window.location.reload()} to="" refresh="true"><span>retry</span></Link> again in few seconds.
            </h5>
          </Jumbotron>
        </div>
      );
    } else if (lastParsed) {
      const lastParsedDiff = moment
      .utc()
      .diff(moment.utc(lastParsed), 'minutes');

      if (lastParsedDiff > 10) {
        content = (
          <div className="error-boundary-cover">
            <Row noGutters className="error-boundary-cover-flex">
              <div xs={12} sm={12} md={3} className="error-boundary-cover-item">
                <SideNavigation />
              </div>
              <div xs={12} sm={12} md={9} className="error-boundary-cover-item">
                <div className="error-boundary-inner-cover-flex">
                  <div className="error-boundary-inner-cover-item">
                    <Subheader />
                    {/* <Alert color="warning">
                      <span>
                        We are currently experiencing delayed updates from our backend.
                        Please try again later
                      </span>
                    </Alert> */}
                    {this.props.children}
                  </div>
                </div>
              </div>
            </Row>
          </div>
        );
      }
    }

    return content;
  }
}

ErrorBoundary.propTypes = {
  cleanError: PropTypes.func.isRequired,
  st: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
  st: state => state.get('errorBoundary').toJS(),
});

const withReducer = injectReducer({
  key: 'errorBoundary',
  reducer,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    cleanError: () => dispatch(cleanError()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withConnect,
)(ErrorBoundary);
