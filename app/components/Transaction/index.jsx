/**
 *
 * Transaction
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { routeActions } from 'redux-simple-router';
import { Col, Row, Tooltip, UncontrolledTooltip } from 'reactstrap';
import styled from 'styled-components';

import CopyToClipboard from 'react-copy-to-clipboard';
import CopyIcon from 'react-icons/lib/io/ios-copy';
import ArrowIconRight from 'react-icons/lib/io/arrow-right-c';
import ArrowIconDown from 'react-icons/lib/io/arrow-down-c';

import { CONFIRMATIONS } from 'containers/Transactions/constants';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import ColoredHash from 'components/ColoredHash';
import StatusConfirmation from 'components/StatusConfirmation';
import AssetLink from 'components/AssetLink';
import AssetLogo from 'components/AssetLogo';
import getTransactionHeading from 'utils/getTransactionHeading';
import Card from '@material-ui/core/Card';
import './transaction.scss';

const AddressWrapper = styled.div.attrs({
  className: 'w-100-down-md address-wrapper',
})`
  display: inline;
`;

const StyledLink = styled(Link).attrs({
  className: 'mr-1 text-truncate',
})`
  color: #333;
`;

const StyledCopyIcon = styled(CopyIcon).attrs({
  className: 'btn-outline-info rounded',
})``;

const WrapperLink = styled.div.attrs({
  className: 'wrapper-link btn btn-add text-truncate rounded',
})`
  user-select: text !important;
  font-size: 1.25rem !important;
  width: 44%;
  color: #333;
  background: #eff5fb;
  border-color: #e2e7eb;
`;

const WrapperTx = styled.div.attrs({
  className: 'location d-block-down-md text-truncate-down-md',
})`
  font-size: 1.25rem !important;
  padding: 0 1rem;
`;

const WrapperTxDatetime = styled.div.attrs({
  className: 'wrapper-tx-timestamp w-75 mb-3',
})`
  font-size: 1.25rem !important;
  color: #333;
`;

const WarningTooltip = styled(UncontrolledTooltip).attrs({
  innerClassName: 'bg-danger',
})`
  &.bs-tooltip-top .arrow::before {
        border-top-color: #dc3545 !important;
    }
    `;

class Transaction extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.toggleTxTooltip = this.toggleTxTooltip.bind(this);
    this.toggleSenderTooltip = this.toggleSenderTooltip.bind(this);
    this.toggleRefererTooltip = this.toggleRefererTooltip.bind(this);

    this.state = {
      tooltipTxOpen: false,
      tooltipSenderOpen: false,
      tooltipRefererOpen: false,
    };
  }

  toggleTxTooltip() {
    this.setState({ tooltipTxOpen: true });
    setTimeout(() => this.setState({ tooltipTxOpen: false }), 1000);
  }

  toggleSenderTooltip() {
    this.setState({ tooltipSenderOpen: true });
    setTimeout(() => this.setState({ tooltipSenderOpen: false }), 1000);
  }

  toggleRefererTooltip() {
    this.setState({ tooltipRefererOpen: true });
    setTimeout(() => this.setState({ tooltipRefererOpen: false }), 1000);
  }

  getHighlightIfOwner(address) {
    return this.isOwner(address) ? 'text-success' : '';
  }

  isOwner(address) {
    return this.props.addr ? this.props.addr === address : false;
  }

  render() {
    let statusCSSClass =
      'wrapper-btn-block btn btn-primary btn-block font-weight-light w-50';

    const invalidClass = confirmations =>
      confirmations === 0
        ? `${statusCSSClass} tx-invalid btn-warning`
        : `${statusCSSClass} tx-invalid btn-danger`;

    statusCSSClass = this.props.valid
      ? `${statusCSSClass} btn-blue`
      : invalidClass(this.props.confirmations);

    const status = StatusConfirmation({
      ...this.props,
      confirmed: CONFIRMATIONS,
    });

    let arrowcname;
    let arrowcnameright;
    let addresscname;
    let showreferencecname;

    if (this.props.referenceaddress) {
      arrowcname = 'transaction-arrow-icon';
      arrowcnameright = 'd-md-inline-flex';
      addresscname = this.getHighlightIfOwner(this.props.referenceaddress);
    } else {
      showreferencecname = 'd-none';
      arrowcname = 'd-none';
      addresscname = 'd-none';
    }

    const transactionAmount = this.props.amount || '';

    const txcopyid = `txid_${this.props.txid.slice(0, 12)}`;
    const sendercopyid = `s-${txcopyid}`;
    const referercopyid = `r-${txcopyid}`;
    const invalidid = `invalid-${txcopyid}`;

    return (
      <Card className="transation-result mx-auto text-center-down-md" elevation={5}>
        <Row className="align-items-end pb-0">
          <Col sm="12" md="1">
            <AssetLink asset={this.props.propertyid} state={this.props.state}>
              <AssetLogo
                asset={{...this.props, name: this.props.propertyname }}
                prop={this.props.propertyid}
                style={{width: '4rem', height: '4rem', marginRight: '7px'}}
              />
            </AssetLink>
          </Col>
          <Col sm="12" md="5">
            <Row className="d-flex flex-xs-column flex-center-down-md mb-2">
              <div className="p-md-2 pt-xs-2 pr-xs-2">
                <span className="title d-block-down-md">
                  {getTransactionHeading(this.props)}
                </span>
              </div>
              <div className="p-md-2 pt-xs-2 pl-xs-2">
                <span className="title d-block-down-md">
                  <SanitizedFormattedNumber value={transactionAmount} />
                </span>
              </div>
              <div className="p-md-2 pb-sm-2">
                <span className="title text-muted">
                  {this.props.propertyname} (#{this.props.propertyid})
                </span>
              </div>
            </Row>
            <Row className="d-flex flex-center-down-md mb-1 mt-1">
              <WrapperTx>
                <Link
                  to={{
                    pathname: `/tx/${this.props.txid}`,
                    state: { state: this.props.state },
                  }}
                >
                  <ColoredHash hash={this.props.txid} />
                </Link>
              </WrapperTx>
              <CopyToClipboard
                text={this.props.txid}
                onCopy={this.toggleTxTooltip}
              >
                <StyledCopyIcon
                  className="d-inline-flex d-md-none"
                  size={24}
                  id={txcopyid}
                />
              </CopyToClipboard>
              <Tooltip
                hideArrow
                isOpen={this.state.tooltipTxOpen}
                target={txcopyid}
              >
                Transaction Id Copied
              </Tooltip>
            </Row>
          </Col>
          <Col sm="12" md="5">
            <div className="d-flex flex-column text-center align-items-center">
              <WrapperTxDatetime>
                <FormattedUnixDateTime datetime={this.props.blocktime} />
              </WrapperTxDatetime>
              <Link
                className={statusCSSClass}
                style={{ cursor: 'default' }}
                to={{
                  pathname: `/tx/${this.props.txid}`,
                  state: { state: this.props.state },
                }}
                id={invalidid}
              >
                {status}
              </Link>
              {this.props.invalidreason &&
                <WarningTooltip
                  placement="top"
                  target={invalidid}
                >
                  { this.props.invalidreason }
                </WarningTooltip>
              }
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm>
            <div className="desc">
              <AddressWrapper>
                <WrapperLink>
                  <StyledLink
                    className={` ${this.getHighlightIfOwner(
                      this.props.sendingaddress,
                    )}`}
                    to={{
                      pathname: `/address/${this.props.sendingaddress}`,
                      state: { state: this.props.state },
                    }}
                  >
                    {this.props.sendingaddress}
                  </StyledLink>
                </WrapperLink>
                <CopyToClipboard
                  text={this.props.sendingaddress}
                  onCopy={this.toggleSenderTooltip}
                >
                  <StyledCopyIcon
                    className="d-inline-flex"
                    size={24}
                    id={sendercopyid}
                  />
                </CopyToClipboard>
                <Tooltip
                  hideArrow
                  isOpen={this.state.tooltipSenderOpen}
                  target={sendercopyid}
                >
                  Sender Address Copied
                </Tooltip>
              </AddressWrapper>
              <ArrowIconRight
                size={20}
                color="gray"
                className={`d-none ${arrowcnameright} ${arrowcname}`}
              />
              <ArrowIconDown
                size={20}
                color="gray"
                className={`d-md-none ${arrowcname}`}
              />
              <AddressWrapper className={showreferencecname}>
                <WrapperLink>
                  <StyledLink
                    className={addresscname}
                    to={{
                      pathname: `/address/${this.props.referenceaddress}`,
                      state: { state: this.props.state },
                    }}
                  >
                    {this.props.referenceaddress}
                  </StyledLink>
                </WrapperLink>
                <CopyToClipboard
                  text={this.props.referenceaddress}
                  onCopy={this.toggleRefererTooltip}
                >
                  <StyledCopyIcon
                    className="d-inline-flex"
                    size={24}
                    id={referercopyid}
                  />
                </CopyToClipboard>
                <Tooltip
                  hideArrow
                  isOpen={this.state.tooltipRefererOpen}
                  target={referercopyid}
                >
                  Reference Address Copied
                </Tooltip>
              </AddressWrapper>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

Transaction.propTypes = {
  sendingaddress: PropTypes.string,
  referenceaddress: PropTypes.string,
  confirmations: PropTypes.number,
  type: PropTypes.string,
  txid: PropTypes.string,
  amount: PropTypes.string,
  changeRoute: PropTypes.func,
  valid: PropTypes.bool,
  blocktime: PropTypes.number,
  propertyname: PropTypes.string,
  propertyid: PropTypes.number,
  addr: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: url => dispatch(routeActions.push(url)),
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Transaction);
