import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
// import { useSpring, animated } from 'react-spring'; // web.cjs is required for IE 11 support
import blocksLogo from '../../assets/images/blocks-logo.png';
import propertiesLogo from '../../assets/images/properties-logo.png';
import idListLogo from '../../assets/images/id-list-logo.png';


export default function SideNavigation(props) {

    const { } = props;

    // function TransitionComponent(props) {
    //   const style = useSpring({
    //     from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    //     to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
    //   });

    //   return (
    //     <animated.div style={style}>
    //       <Collapse {...props} />
    //     </animated.div>
    //   );
    // }

    // TransitionComponent.propTypes = {
    //   /**
    //    * Show the component; triggers the enter or exit states
    //    */
    //   in: PropTypes.bool,
    // };

    const StyledTreeItem = withStyles((theme) => ({
        iconContainer: {
          '& .close': {
            opacity: 0.3,
          },
        },
        group: {
          marginLeft: 7,
          paddingLeft: 18,
          borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
        },
    }))((props) => <TreeItem {...props} className="treeitem-cover"/>);
      
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

    return (
        <Paper className="paper-cover-flex">
            <div className="paper-cover-item">
                <div className="header-cover">
                    Navigation
                </div>
                <div className="treeview-main-cover">
                    <TreeView
                        className={'treeview-cover classes.root'}
                        defaultExpanded={['1']}
                        defaultCollapseIcon={''}
                        defaultExpandIcon={''}
                        defaultEndIcon={''}
                    >
                        <div className="treeview-main-cover">
                            <TreeView
                                className={'classes.root'}
                                defaultExpanded={['1']}
                                defaultCollapseIcon={<img src={blocksLogo} alt="blocks logo" style={{width: '65%'}}/>}
                                defaultExpandIcon={<img src={blocksLogo} alt="blocks logo" style={{width: '65%'}}/>}
                                defaultEndIcon={''}
                            >
                                <div className="treeitem-div-cover">
                                    <StyledTreeItem nodeId="1" label="Blocks">
                                        <div className="treeitem-inner-div-cover">
                                            <StyledTreeItem nodeId="2" label="Bitcoin Mainnet" />
                                            <StyledTreeItem nodeId="2" label="Bitcoin Testnet" />
                                            <StyledTreeItem nodeId="2" label="Litecoin Mainnet" />
                                            <StyledTreeItem nodeId="2" label="Litecoin Testnet" />
                                        </div>
                                    </StyledTreeItem>
                                </div>
                            </TreeView>
                        </div>
                        <div className="treeview-main-cover">
                            <TreeView
                                className={'classes.root'}
                                defaultExpanded={['1']}
                                defaultCollapseIcon={<img src={propertiesLogo} alt="blocks logo" style={{width: '65%'}}/>}
                                defaultExpandIcon={<img src={propertiesLogo} alt="blocks logo" style={{width: '65%'}}/>}
                                defaultEndIcon={''}
                            >
                                <div className="treeitem-div-cover">
                                    <StyledTreeItem nodeId="1" label="Properties">
                                        <div className="treeitem-inner-div-cover">
                                            <StyledTreeItem nodeId="2" label="All properties" />
                                            <StyledTreeItem nodeId="2" label="Bitcoin Mainnet" />
                                            <StyledTreeItem nodeId="2" label="Bitcoin Testnet" />
                                            <StyledTreeItem nodeId="2" label="Litecoin Mainnet" />
                                            <StyledTreeItem nodeId="2" label="Litecoin Testnet" />
                                        </div>
                                    </StyledTreeItem>
                                </div>
                            </TreeView>
                        </div>
                        <div className="treeview-main-cover">
                            <TreeView
                                className={'classes.root'}
                                defaultExpanded={['1']}
                                defaultCollapseIcon={<img src={idListLogo} alt="blocks logo" style={{width: '65%'}}/>}
                                defaultExpandIcon={<img src={idListLogo} alt="blocks logo" style={{width: '65%'}}/>}
                                defaultEndIcon={''}
                            >
                                <div className="treeitem-div-cover">
                                    <StyledTreeItem nodeId="1" label="Id Lists">
                                        <div className="treeitem-inner-div-cover">
                                            <StyledTreeItem nodeId="2" label="All lists" />
                                            <StyledTreeItem nodeId="2" label="Bitcoin Mainnet" />
                                            <StyledTreeItem nodeId="2" label="Bitcoin Testnet" />
                                            <StyledTreeItem nodeId="2" label="Litecoin Mainnet" />
                                            <StyledTreeItem nodeId="2" label="Litecoin Testnet" />
                                        </div>
                                    </StyledTreeItem>
                                </div>
                            </TreeView>
                        </div>
                    </TreeView>
                </div>
            </div>
        </Paper>
    )
}