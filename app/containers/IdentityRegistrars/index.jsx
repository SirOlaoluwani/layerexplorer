/**
 *
 * Properties
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Col, Container, Row, Table } from 'reactstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import AssetLogo from 'components/AssetLogo';

import LoadingIndicator from 'components/LoadingIndicator';
import ContainerBase from 'components/ContainerBase';
import ListHeader from 'components/ListHeader';

import makeSelectIdRegistrars from './selectors';
import {
  ECOSYSTEM_PROD,
  ECOSYSTEM_TEST,
  ECOSYSTEM_TEST_NAME,
  ECOSYSTEM_PROD_NAME,
} from 'containers/App/constants';

import messages from './messages';
import idRegistrarsSaga from './saga';
import { loadIdRegistrars } from './actions';
import idRegistrarsReducer from './reducer';

const StyledContainer = styled(ContainerBase)`
  margin-top: 1rem;
`;
const StyledTH = styled.th`
  border: none !important;
`;
const StyledTHRight = styled.th`
  border: none !important;
  text-align: center !important;
`;

const StyledTD = styled.td.attrs({
  className: 'align-middle',
})``;

const StyledTDTextLeft = styled(StyledTD).attrs({
  className: 'text-left pt-3 text-truncate',
})``;
const StyledTDTextRight = styled(StyledTD).attrs({
  className: 'text-center pt-3 text-truncate',
})``;

export class IdentityRegistrars extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.query =
      props.match.params.query.toString() === ECOSYSTEM_PROD_NAME.toLowerCase()
        ? ECOSYSTEM_PROD
        : ECOSYSTEM_TEST;
    this.ecosystem =
      this.query === ECOSYSTEM_PROD ? ECOSYSTEM_PROD_NAME : ECOSYSTEM_TEST_NAME;
    this.props.loadProperties();
  }

  render() {
    console.log('properties: ', this.props.properties);
    if (this.props.properties.loading) {
      return (
        <Container>
          <LoadingIndicator />
        </Container>
      );
    }

    const assets = (
      <Table responsive>
        <thead>
          <tr>
            <StyledTH />
            <StyledTH>Address</StyledTH>
            <StyledTH>Name</StyledTH>
            <StyledTH>Website</StyledTH>
            <StyledTH>Block</StyledTH>
            <StyledTH>KYC ID</StyledTH>
          </tr>
        </thead>
        <tbody>
          {this.props.properties.properties.data.asset.map(property => (
            <tr>
              <StyledTD style={{ width: '56px' }}>
                <AssetLogo
                  asset={property}
                  prop={property.propertyid}
                  style={{
                    width: '4rem',
                    height: '4rem',
                  }}
                />
              </StyledTD>
              <StyledTDTextLeft>
                <p>#{property.propertyid}</p>
              </StyledTDTextLeft>
              <StyledTDTextLeft>
                <p>
                  {`${property.name.substring(0, 20)}${
                    property.name.length > 20 ? '...' : ''
                  }`}
                </p>
              </StyledTDTextLeft>
              <StyledTDTextRight>
                <p>{property.issuer}</p>
              </StyledTDTextRight>
            </tr>
          ))}
        </tbody>
      </Table>
    );

    return (
      <StyledContainer fluid>
        <Row>
          <Col sm>
            <ListHeader
              total={this.props.properties.length}
              totalLabel="Property"
              message={messages.header}
              values={{
                ecosystem: this.ecosystem,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm>{assets}</Col>
        </Row>
      </StyledContainer>
    );
  }
}

IdentityRegistrars.propTypes = {
  dispatch: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
  loadProperties: PropTypes.func,
  idRegistrars: PropTypes.any,
  match: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  idRegistrars: makeSelectIdRegistrars(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadIdRegistrars: () => dispatch(loadIdRegistrars()),
    changeRoute: url => dispatch(routeActions.push(url)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'idRegistrars',
  reducer: idRegistrarsReducer,
});

const withSaga = injectSaga({
  key: 'idRegistrars',
  saga: idRegistrarsSaga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(IdentityRegistrars);
