/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import styled from 'styled-components';

import { Container, Col, Row } from 'reactstrap';

import ServiceBlock from 'components/ServiceBlock';
import HeaderMessage from 'components/HeaderMessage';
import TransactionHistory from 'components/TransactionHistory';
import Blocks from 'containers/Blocks';
import FooterLinks from 'components/FooterLinks';
import Card from '@material-ui/core/Card';

const Layout = styled(Container)`
  background-color: #f5f5f5;
  padding: 0;
`;

class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const footer = <FooterLinks unconfirmed blocklist />;
    return (
      <Layout fluid>
        <Row noGutters>
          <Col sm>
            {/* <HeaderMessage /> */}
          </Col>
        </Row>
        <Row noGutters>
          <Col sm="12" lg="5" className="text-center-down-md" style={{backgroundColor: '#EDEDED'}}>
            <ServiceBlock />
          </Col>
          <Col sm="12" lg="7" className="" style={{backgroundColor: '#EDEDED'}}>
            <div className="transaction-card-cover-flex">
              <div className="transaction-card-cover-item">
                <Card elevation={2} className="card-cover">
                  <TransactionHistory />
                </Card>
              </div>
            </div>
          </Col>
        </Row>
        <Row noGutters>
          <Col sm style={{backgroundColor: '#EDEDED'}}>
            <Blocks footer={footer} />
          </Col>
        </Row>
      </Layout>
    );
  }
}

// export default HomePage;
HomePage.propTypes = {
  changeRoute: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(routeActions.push(url)),
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);
export default compose(withConnect)(HomePage);
