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

import makeSelectProperty from './selectors';
import {
  ECOSYSTEM_PROD,
  ECOSYSTEM_TEST,
  ECOSYSTEM_TEST_NAME,
  ECOSYSTEM_PROD_NAME,
} from 'containers/App/constants';

import messages from './messages';
import propertiesSaga from './saga';
import { loadProperties } from './actions';
import propertiesReducer from './reducer';

const StyledContainer = styled(ContainerBase)`
  margin-top: 1rem;
`;
const StyledTH = styled.th`
  border: none !important;
`;

const StyledTD = styled.td.attrs({
  className: 'align-middle',
})``;

const StyledTDTextLeft = styled(StyledTD).attrs({
  className: 'text-left pt-3 text-truncate',
})``;

export class Properties extends React.PureComponent {
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
    console.log(this.props.properties.properties.asset);
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
            <StyledTH>Property ID</StyledTH>
            <StyledTH>Name</StyledTH>
            {/* <StyledTH>Issuer</StyledTH> */}
          </tr>
        </thead>
        <tbody>
          {this.props.properties.properties.asset.map(property => (
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

Properties.propTypes = {
  dispatch: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
  loadProperties: PropTypes.func,
  properties: PropTypes.any,
  match: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  properties: makeSelectProperty(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadProperties: () => dispatch(loadProperties()),
    changeRoute: url => dispatch(routeActions.push(url)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'properties',
  reducer: propertiesReducer,
});

const withSaga = injectSaga({
  key: 'properties',
  saga: propertiesSaga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Properties);
