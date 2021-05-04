import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BlocklistTable from './blocklist-table';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className="box-cover" p={3} style={{padding: 0, paddingTop: '20px', backgroundColor: '#EDEDED'}}>
          <div className="box-div-cover-flex">
              <div className="box-div-cover-item">
                {children}
              </div>
          </div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function BlocklistTabs(props) {

  const { blocks } = props;
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Currencies" {...a11yProps(0)} />
          <Tab label="Contracts" {...a11yProps(1)} />
          <Tab label="Securities" {...a11yProps(2)} />
          <Tab label="NFTs" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <BlocklistTable blocklistProps={{
          blocks,
          type: 'currencies'
        }} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BlocklistTable blocklistProps={{
          blocks,
          type: 'contracts'
        }} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BlocklistTable blocklistProps={{
          blocks,
          type: 'securities'
        }} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <BlocklistTable blocklistProps={{
          blocks,
          type: 'ntfs'
        }} />
      </TabPanel>
    </div>
  );
}