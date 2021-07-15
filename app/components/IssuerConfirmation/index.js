import React from 'react';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import { Link } from 'react-router-dom';
import { API_URL_BASE } from 'containers/App/constants';

export default function IssuerConfirmation(props) {

    const { componentType, tokenConfirmProps } = props;

    const { components, asset } = tokenConfirmProps;
    const { AssetLogo, SubtitleDetail } = components;

    const rawAssetURL = `${API_URL_BASE}/getproperty/${asset.propertyid}`;

    let asseturl;
    if (asset.url.includes('.')) {
        asseturl = (
            <a href={asset.url} target="_blank">
                {asset.url}
            </a>
        );
    } else {
        asseturl = <span>{asset.url}</span>;
    }

    let registeredMessage;
    if (asset.flags.registered) {
        registeredMessage = (
        <span dangerouslySetInnerHTML={{ __html: asset.rdata }} />
        );
    } else {
        registeredMessage = (
        <span>
            This property is not registered with LayerExplorer.info. Please see{' '}
            <a href="/promote">Promote Your Property</a> for further details.
        </span>
        );
    }
    
    return (
        <div className="token-confirm-container">
            <div className="token-confirm-container-flex">
                <div className="token-confirm-container-item">
                    <div className="token-confirm-cover-flex">
                        <div className="token-confirm-cover-item">
                            <div className="card-cover-flex">
                                <div className="card-cover-item">
                                    <Card className="card-cover">
                                        <div className="card-inner-cover">
                                            <div className="card-img-cover-flex">
                                                <div className="card-img-cover-item">
                                                    <AssetLogo />
                                                </div>
                                                <div className="card-img-cover-item">
                                                    <div className="card-img-text-cover">
                                                        <h2 className="asset-name-text"><strong>{asset.name || asset.propertyname || asset.type}</strong></h2>
                                                    </div>
                                                    <div className="subtitle-detail-cover">
                                                        {/* <SubtitleDetail /> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body-cover-flex">
                                                <div className="card-body-cover-item">
                                                    <p className="card-text">Total <br /><SanitizedFormattedNumber value={asset.totaltokens} /> Tokens</p>
                                                </div>
                                                <div className="card-body-cover-item">
                                                    <p className="card-text">Property ID <br /><span className="card-bold-text">#{asset.propertyid}</span></p>
                                                </div>
                                                <div className="card-body-cover-item">
                                                    <p className="card-text">Created <br /><FormattedUnixDateTime datetime={asset.blocktime} useSeconds={false} /></p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                        <div className="token-confirm-cover-item">
                            <div className="card-cover-flex">
                                <div className="card-cover-item">
                                    <Card className="card-cover">
                                        <div className="card-inner-cover">
                                            <div className="card-data-cover-flex">
                                                <div className="card-data-cover-item">
                                                    Data
                                                </div>
                                                <div className="card-data-cover-item">{asset.data}</div>
                                            </div>
                                            <Divider />
                                            <div className="card-data-cover-flex">
                                                <div className="card-data-cover-item">
                                                    Issuer
                                                </div>
                                                <div className="card-data-cover-item">
                                                    <Link
                                                        to={{
                                                        pathname: `/address/${asset.issuer}`,
                                                        state: { state: asset.state },
                                                        }}
                                                    >
                                                        {asset.issuer}
                                                    </Link>
                                                </div>
                                            </div>
                                            <Divider />
                                            <div className="card-data-cover-flex">
                                                <div className="card-data-cover-item">
                                                    Category
                                                </div>
                                                <div className="card-data-cover-item">{asset.category}</div>
                                            </div>
                                            <Divider />
                                            <div className="card-data-cover-flex">
                                                <div className="card-data-cover-item">
                                                    Divisible
                                                </div>
                                                <div className="card-data-cover-item">{asset.divisible ? 'True' : 'False'}</div>
                                            </div>
                                            <Divider />
                                            <div className="card-data-cover-flex">
                                                <div className="card-data-cover-item">
                                                    URL
                                                </div>
                                                <div className="card-data-cover-item">{asseturl}</div>
                                            </div>
                                            <Divider />
                                            <div className="card-data-cover-flex">
                                                <div className="card-data-cover-item">
                                                    RAW Data
                                                </div>
                                                <div className="card-data-cover-item">
                                                    <a href={rawAssetURL}>Click here for raw info</a>
                                                </div>
                                            </div>
                                            <Divider />
                                            <div className="card-data-cover-flex">
                                                <div className="card-data-cover-item">
                                                    Registration
                                                </div>
                                                <div className="card-data-cover-item">{registeredMessage}</div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}