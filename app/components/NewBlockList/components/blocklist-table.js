import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { tableData as TABLE_DATA } from '../table-data';
import Paper from '@material-ui/core/Paper';

export default function BlocklistTable(props) {

    const { blocklistProps } = props;
    const { blocks, type } = blocklistProps;

    const useStyles = makeStyles(({
        table: {
            minWidth: 700
        },
        tableCellColored: {
            backgroundColor: 'rgba(76, 159, 251, 0.4)',
        },
        tableRowHead: {
            backgroundColor: 'rgba(205, 205, 205, 0.7)',
        },
        tableRowBody: {
            backgroundColor: '#FFFFFF',
        }
    }));

    const TableCellColored = (props) => {

        const { children, ...others } = props;

        return (
            <TableCell {...others}>
                {children}
            </TableCell>
        )
    }

    const StyledTableRowHead = (props) => {

        const { children, ...others } = props;

        return (
            <TableRow {...others}>
                {children}
            </TableRow>
        )
    }

    const StyledTableRowBody = (props) => {

        const { children, ...others } = props;

        return (
            <TableRow {...others}>
                {children}
            </TableRow>
        )
    }

    const getItemKey = (item, idx) => item.timestamp.toString().concat(idx);
    const getTableSN = (idx) => (parseInt(idx) + 1);

    const classes = useStyles();
    
    return (
        <div className="blocklist-table-cover-flex">
            <div className="blocklist-table-cover-item">
                <TableContainer className="table-container-cover" component={Paper}>
                    <Table className={`table-cover ${classes.table}`}>
                        <TableHead className="table-head-cover">
                            <StyledTableRowHead className={`table-row-cover ${classes.tableRowHead}`}>
                                <TableCell component="th" className="table-cell-cover">#</TableCell>
                                <TableCell component="th" className="table-cell-cover">Name</TableCell>
                                <TableCell component="th" className="table-cell-cover">Type</TableCell>
                                <TableCell component="th" className="table-cell-cover">Price</TableCell>
                                <TableCell component="th" className="table-cell-cover">Market cap</TableCell>
                                <TableCell component="th" className="table-cell-cover">24H Volume</TableCell>
                                <TableCell component="th" className="table-cell-cover">Circulating supply</TableCell>
                                <TableCellColored component="th" className={`table-cell-cover ${classes.tableCellColored}`}>Cumulative LTC Volume</TableCellColored>
                                <TableCell component="th" className="table-cell-cover">Last 7 days</TableCell>
                            </StyledTableRowHead>
                        </TableHead>
                        
                        <TableBody className="table-body-cover">
                            {
                                TABLE_DATA[type].map((tableData, index) => {

                                    return (
                                        <StyledTableRowBody className={`table-row-cover ${classes.tableRowBody}`} key={index}>
                                            <TableCell component="td" className="table-cell-cover">{getTableSN(index)}</TableCell>
                                            <TableCell component="td" className="table-cell-cover">
                                                <div className="cell-div-cover-flex">
                                                    <div className="cell-div-cover-item">
                                                        <div className="name-logo-cover">
                                                            <img className="name-logo" src={tableData.name.logo} alt="name logo" />
                                                        </div>
                                                    </div>
                                                    <div className="cell-div-cover-item">
                                                        <div className="name-text-cover">
                                                            <h2 className="name-title-h">{tableData.name.title}</h2>
                                                            <p className="name-subtitle-p">{tableData.name.subtitle}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell component="td" className="table-cell-cover">{tableData.type}</TableCell>
                                            <TableCell component="td" className="table-cell-cover">{tableData.price}</TableCell>
                                            <TableCell component="td" className="table-cell-cover">{tableData.marketCap}</TableCell>
                                            <TableCell component="td" className="table-cell-cover">{tableData.hourVolume}</TableCell>
                                            <TableCell component="td" className="table-cell-cover">{tableData.circulatingSupply}</TableCell>
                                            <TableCellColored component="td" className={`table-cell-cover ${classes.tableCellColored}`}>{tableData.cumLtcVolume}</TableCellColored>
                                            <TableCell component="td" className="table-cell-cover">{tableData.last7Days}</TableCell>
                                        </StyledTableRowBody>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}