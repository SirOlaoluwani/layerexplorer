/**
 *
 * ServiceBlock
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import featureLogoPNG from 'images/token1.png';
import tradelayerLogoPNG from '../../assets/images/tradelayer-logo.png'
import { makeSelectStatus } from './selectors';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

const IMG = styled.img`
  margin-right: 6px;
  width: 60px;
  height: 60px;
`;

const Container = styled.div`
  background-color: transparent;
  padding: 0px;
 
`;

const ContainerLogo = styled.div`
  background-color: transparent;
`;

const NameLogo = () => (
  <ContainerLogo className="name-logo-cover">
    <div className="d-inline-block name-logo-div-cover">
      <IMG src={tradelayerLogoPNG} alt="feature logo" className="card-img-top" />
    </div>
    <div className="d-inline-block bg-inverse text-black text-nowrap name-logo-text-cover">
      <h5 className="name-logo-title">Tradelayer</h5>
      <span className="name-logo-span">Featured Property</span>
    </div>
  </ContainerLogo>
);

const BlockInfo = (props) => (
  <div className="blockinfo-cover">
    <div className="text-black">
      <span>Last Updated</span>
    </div>
    <div className="text-black">
      <span>
        { `As of Block ${props.last_block}` }
      </span>
    </div>
    <div className="text-black">
      <span>
        <small>
          { `${props.block_time} UTC` }
        </small>
      </span>
    </div>
  </div>
);

const StyledContainerSummary = styled.div`
  padding: 6px;
  margin: 0 6px;
  font-size: 0.9rem
`;

const StyledContainerSummary1 = styled(StyledContainerSummary)`
  background-color: #348FE2;
`;
const StyledContainerSummary2 = styled(StyledContainerSummary)`
  background-color: #159E9C;
`;
const StyledContainerSummary3 = styled(StyledContainerSummary)`
  background-color: #727CB6;
`;

const StyledContainerSummary4 = styled(StyledContainerSummary)`
  background-color: #159E9C;
`;

const SummaryItem = (props) => {
  const StyledContainer = props.container;

  return (
    <StyledContainer className="text-white">
      <span className="d-block lead" style={{ fontSize: '0.9rem' }}>{props.options.title}</span>
      <span className="lead">{props.options.value}</span>
    </StyledContainer>
  );
};

class ServiceBlock extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    // wait status props loading
    if (isEmpty(this.props) || isEmpty(this.props.status)) {
      return null;
    }

    const propertiesCountValue = (props) => (
      <span className="text-white">
        { props.properties_count }
        <small>
          { ` (+${props.test_properties_count} test)` }
        </small>
      </span>
    );

    const omniPriceValue = (props) => (
      <span>
        { Math.round((props.omni_btc + 0.0000001) * 1000000) / 1000000 } BTC /
        ${ (Math.round((props.omni_usd + 0.00001) * 100) / 100).toFixed(2) }
      </span>
    );

    const getVestingInfo = (props, type) => {

      if(type === 'percentage') {

        return props.vestingInfo['vested percentage']
      }
    }

    return (
      <Container className="d-md-flex service-block-container">
        <div className="d-inline-block w-50 service-inline-block">
          <div className="card-div-cover">
            <Card elevation={2} className="card-cover">
              <div className="card-cover-flex">
                <div className="card-cover-item">
                  <NameLogo />
                  <div className="divider-cover">
                    <Divider />
                  </div>
                  <BlockInfo {...this.props.status} />
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="d-md-inline-block d-sm-block w-50 service-inline-block">
          <div className="summary-cover-flex">
            <div className="summary-cover-item">
              <div className="summary-inner-cover-flex">
                <Card elevation={2} className="summary-inner-cover-item latest-price">
                  <div className="text-cover">
                    <p className="title-p">LATEST TRADELAYER PRICE</p>
                    <h2 className="title-h">{omniPriceValue(this.props.status)}</h2>
                  </div>
                </Card>
              </div>
              <div className="summary-inner-cover-flex">
                <Card elevation={2} className="summary-inner-cover-item total-transaction">
                  <div className="text-cover">
                    <p className="title-p">TOTAL TRANSACTIONS (24 hrs)</p>
                    <h2 className="title-h">{this.props.status.txcount_24hr }</h2>
                  </div>
                </Card>
              </div>
              <div className="summary-inner-cover-flex">
                <Card elevation={2} className="summary-inner-cover-item tradelayer-property">
                  <div className="text-cover">
                    <p className="title-p">TRADELAYER PROPERTIES</p>
                    <h2 className="title-h">{propertiesCountValue(this.props.status)}</h2>
                  </div>
                </Card>
              </div>
              {/* <SummaryItem
                container={StyledContainerSummary1}
                options={{ title: 'LATEST TRADELAYER PRICE', value: omniPriceValue(this.props.status) }}
              />
              <SummaryItem
                container={StyledContainerSummary2}
                options={{ title: 'TOTAL TRANSACTIONS (24 hrs)', value: this.props.status.txcount_24hr }}
              />
              <SummaryItem
                container={StyledContainerSummary1}
                options={{ title: 'TOTAL LTC VOLUME (24 hrs)', value: this.props.status.txcount_24hr }}
              />
              <SummaryItem
                container={StyledContainerSummary3}
                options={{ title: 'TOTAL TOKEN VOLUME (24 hrs)', value: this.props.status.txcount_24hr }}
              />
              <SummaryItem
                container={StyledContainerSummary2}
                options={{ title: 'TRADELAYER PROPERTIES', value: propertiesCountValue(this.props.status) }}
              />
              <SummaryItem
                container={StyledContainerSummary1}
                options={{ title: 'PERCENTAGE VESTING INFO', value: getVestingInfo(this.props.status, 'percentage') }}
              /> */}
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

ServiceBlock.propTypes = {
  getStatus: PropTypes.func,
  status: PropTypes.object,
  last_block: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
});

const withConnect = connect(mapStateToProps, {});

export default compose(
  withConnect,
)(ServiceBlock);
