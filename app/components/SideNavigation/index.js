import React from 'react';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import { fade, makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
// import { useSpring, animated } from 'react-spring'; // web.cjs is required for IE 11 support
import blocksLogo from '../../assets/images/blocks-logo.png';
import propertiesLogo from '../../assets/images/properties-logo.png';
import idListLogo from '../../assets/images/id-list-logo.png';
import IconButton from '@material-ui/core/IconButton';
import DoubleArrowSharpIcon from '@material-ui/icons/DoubleArrowSharp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';


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

const drawerWidth = 240;
  
const useStyles = makeStyles((theme) => ({
    root: {
      height: 264,
      flexGrow: 1,
      maxWidth: 400,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        paddingTop: '75px',
    },
    // menuRoot: {
    //   display: 'flex',
    // },
    // menuPaper: {
    //   marginRight: theme.spacing(2),
    // },
}));


export default function SideNavigation(props) {

    const { } = props;

    const [open, setOpen] = React.useState(true);

    // const theme = useTheme();

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


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            }), 'drawer-cover'}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <Paper className="paper-cover-flex">
                <div className="paper-cover-item">
                    <div className={classes.toolbar}>
                        {
                            !open ? 
                            <div onClick={handleDrawerOpen}>
                                <React.Fragment>
                                    <DoubleArrowSharpIcon />
                                </React.Fragment>
                            </div>:
                            <div onClick={handleDrawerClose}>
                                <React.Fragment>
                                    Close
                                    <CloseIcon />
                                </React.Fragment>
                            </div>
                        }
                    </div>
                    {
                        open ? 
                        <React.Fragment>
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
                        </React.Fragment>:
                        ''
                    }
                    
                </div>
            </Paper>
        </Drawer>
    )
}