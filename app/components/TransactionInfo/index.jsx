/**
 *
 * TransactionInfo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardText, Col, Collapse, Row, Table } from 'reactstrap';

import TransactionAmount from 'components/TransactionAmount';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import StatusConfirmation from 'components/StatusConfirmation';
import { makeSelectProperty } from 'components/Token/selectors';
import AssetLogo from 'components/AssetLogo';
import AssetLink from 'components/AssetLink';
import ExplorerLink from 'components/ExplorerLink';
import { EXTERNAL_EXPLORER_BLOCKCHAIR, EXTERNAL_EXPLORER_OTOCASH } from 'components/ExplorerLink/constants';

import { CONFIRMATIONS } from 'containers/Transactions/constants';
import { API_URL_BASE } from 'containers/App/constants';
import getTransactionHeading from 'utils/getTransactionHeading';

const StyledCard = styled(Card)`
  background-color: #2a72b5;
  border-color: #2a72b5;
`;
const StyledCardBody = styled(CardBody)`
  background-color: #348fe2;
  border-color: #348fe2;
`;
const DetailRow = styled(Row)`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const SubtitleDetail = styled.small`
  display: block;
  font-size: 10px;
  font-weight: 400;
  margin-top: 5px;
`;
const A = styled.a`
  color: #41addd;

  &:hover {
    color: #6cc0e5;
  }
`;

function TransactionInfo(props) {
  // let collapseOmniData = false;
  let collapseDecoded = false;
  // const toggleRawData = () => (collapseOmniData = !collapseOmniData);
  const toggleDecoded = () => (collapseDecoded = !collapseDecoded);

  const statusColor = props.valid
    ? 'btn btn-group btn-primary btn-block btn-blue font-weight-light'
    : props.confirmations === 0
      ? 'btn btn-group btn-primary btn-block btn-warning font-weight-light'
      : 'btn btn-group btn-primary btn-block btn-danger font-weight-light';

  const status = StatusConfirmation({
    ...props,
    confirmed: CONFIRMATIONS,
  });
  const invalidReason =
    props.confirmations === 0 ? '' : `Reason: ${props.invalidreason || 'invalid transaction'}`;
  const rawTransactionURL = `${API_URL_BASE}/transaction/tx/${props.txid}`;

  let warningMessage = null;
  let dtheader;
  if (props.confirmations === 0) {
    warningMessage = (
      <Row>
        <Col sm>
          <StyledCard inverse>
            <CardHeader>Unconfirmed Transaction Warning</CardHeader>
            <StyledCardBody>
              <CardText>
                This transaction is unconfirmed. It is impossible to know the
                validity of an Omni transaction before it is confirmed in the
                blockchain. This is because the Omni Layer relies on the order
                of transactions within the blockchain to determine validity.
                Once the transaction is confirmed, balances will be updated
                accordingly and you will be able to verify its validity.
              </CardText>
            </StyledCardBody>
          </StyledCard>
        </Col>
      </Row>
    );
    dtheader = 'Pending Since';
  } else {
    dtheader = 'Date/Time';
  }

  const amountDisplay = <TransactionAmount {...props} />;
  let tokenName;
  if (![4, -22, 25, 26, 65534].includes(props.type_int)) {
    tokenName = (
      <tr>
        <td className="field">Property</td>
        <td>
          <AssetLink asset={props.propertyid} state={props.state}>
            <strong>
              {props.propertyname} &#40;#{props.propertyid}&#41;
            </strong>
          </AssetLink>
        </td>
      </tr>
    );
  }
  if (props.type_int === 28) {
    tokenName = (
      <tr>
        <td className="field">Ecosystem</td>
        <td>
          <strong>{props.ecosystem}</strong>
        </td>
      </tr>
    );
  }

  if(props.type_int === 65534){
    tokenName = (
      <tr>
        <td className="field">Feature Activation</td>
        <td>
          <strong>{props.asset.name}</strong>
        </td>
      </tr>
    );
  }
  if (!props.valid && ([50, 51, 54].includes(props.type_int) || !props.type_int)) {
    tokenName = null;
  }

  let btcDesired;
  let specificAction;
  if (props.type_int === 20) {
    btcDesired = (
      <tr>
        <td className="field">Bitcoin Desired</td>
        <td>
          <strong>
            <span id="lamount">
              <SanitizedFormattedNumber value={props.bitcoindesired}/> BTC
            </span>
          </strong>
        </td>
      </tr>
    );
    specificAction = `- ${props.action}`;
  }

  const recipient = props.referenceaddress || (props.purchases || [{}])[0].referenceaddress;

  return (
    <div>
      {warningMessage}
      <DetailRow>
        <Col sm>
          <Table responsive className="table-horizontal">
            <thead>
            <tr>
              <th>
                <AssetLink asset={props.asset.propertyid} state={props.state}>
                  <AssetLogo
                    asset={props.asset}
                    prop={props.asset.propertyid}
                    className="img-thumbnail"
                    style={{
                      width: '4rem',
                      height: '4rem',
                    }}
                  />
                </AssetLink>
              </th>
              <th>
                <h4>
                  {getTransactionHeading(props)} {specificAction}
                  <SubtitleDetail>{props.txid}</SubtitleDetail>
                </h4>
              </th>
            </tr>
            </thead>
            <tbody>
            {amountDisplay}
            {tokenName}
            {btcDesired}
            <tr>
              <td className="field">Sender</td>
              <td>
                <Link
                  to={{
                    pathname: `/address/${props.sendingaddress}`,
                    state: { state: props.state },
                  }}
                >
                  {props.sendingaddress}
                </Link>
              </td>
            </tr>
            {recipient &&
            <tr>
              <td className="field">Recipient</td>
              <td>
                <Link
                  to={{
                    pathname: `/address/${recipient}`,
                    state: { state: props.state },
                  }}
                >
                  {recipient}
                </Link>
              </td>
            </tr>
            }
            <tr>
              <td className="field">{dtheader}</td>
              <td>
                  <span id="ldatetime">
                    <FormattedUnixDateTime datetime={props.blocktime}/>
                  </span>
              </td>
            </tr>
            {props.block &&
            <tr>
              <td className="field">In Block</td>
              <td>
                <Link
                  to={{
                    pathname: `/block/${props.block}`,
                    state: { state: props.state },
                  }}
                >
                  <span id="lblocknum">{props.block}</span>
                </Link>
              </td>
            </tr>
            }
            <tr>
              <td className="field" style={{ paddingTop: '12px' }}>
                Status
              </td>
              <td className="field">
                <div className={statusColor} style={{ width: '35%', cursor: 'default' }}>
                  {status}
                </div>
                <div className="text-left">{!props.valid && invalidReason}</div>
              </td>
            </tr>
            <tr>
              <td className="field">Bitcoin Fees</td>
              <td>
                <span id="lfees">{props.fee} BTC</span>
              </td>
            </tr>
            <tr>
              <td className="field">Omni Layer Fees</td>
              <td>
                <span id="lomnifees">0.00 OMNI</span>
              </td>
            </tr>
            <tr className="d-none">
              <td className="field">Payload</td>
              <td>
                <span id="lpayloadsize">16</span> bytes
              </td>
            </tr>
            <tr className="d-none">
              <td className="field">Size</td>
              <td>
                <span id="ltxsize">N/A</span>
              </td>
            </tr>
            <tr className="d-none">
              <td className="field">Class</td>
              <td>
                <span id="lclass">C (nulldata)</span>
              </td>
            </tr>
            <tr>
              <td className="field">Type/Version</td>
              <td>
                  <span id="ltypever">
                    Type {props.type_int}, Version {props.version}
                  </span>
              </td>
            </tr>
            <tr>
              <td className="field">Raw Data</td>
              <td>
                  <span id="lrawgettx">
                    <a href={rawTransactionURL} target="_blank">
                      Click here for raw transaction...
                    </a>
                  </span>
              </td>
            </tr>
            <tr>
              <td className="field">Other explorers</td>
              <td>
                  <ExplorerLink className="d-inline-block mr-3" explorerId={EXTERNAL_EXPLORER_BLOCKCHAIR} tx={props.txid} />
                {
                  (props.propertyid === 701) &&
                  <ExplorerLink className="d-inline-block mr-3" explorerId={EXTERNAL_EXPLORER_OTOCASH} tx={props.txid}/>
                }
              </td>
            </tr>
            <tr className="d-none">
              <td colSpan="2">
                <A
                  href="#collapseRawData"
                  color="primary"
                  onClick={toggleDecoded}
                  style={{ marginBottom: '1rem' }}
                >
                  Decoded Raw Payload
                </A>
                <Collapse isOpen={collapseDecoded}>
                    <span id="lrawgettx">
                      <a href="/rawpayload">
                        (Coming Soon) Click here for raw payload...
                      </a>
                    </span>
                </Collapse>
              </td>
            </tr>
            </tbody>
          </Table>
        </Col>
      </DetailRow>
      <Row/>
    </div>
  );
}

TransactionInfo.propTypes = {
  sendingaddress: PropTypes.string,
  referenceaddress: PropTypes.string,
  confirmations: PropTypes.number,
  type: PropTypes.string,
  txid: PropTypes.string,
  amount: PropTypes.string,
  changeRoute: PropTypes.func,
  propertyname: PropTypes.string,
  propertyid: PropTypes.number,
  invalidreason: PropTypes.any,
  valid: PropTypes.bool,
  properties: PropTypes.func.isRequired,
  asset: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeRoute: url => dispatch(routeActions.push(url)),
  };
}

const mapStateToProps = createStructuredSelector({
  properties: state => makeSelectProperty(state),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TransactionInfo);
