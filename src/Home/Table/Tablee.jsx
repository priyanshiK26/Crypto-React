import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";

import { useEffect, useState } from "react";
import Modall from './Modall';

const fetchData = async () => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.coincap.io/v2/assets',
        headers: {}
    };
    let data = [];
    try {
        const response = await axios.request(config);
        data = JSON.stringify(response.data);
        return JSON.parse(data)?.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default function Tablee() {
    const [rows, setRows] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        fetchData().then((d) => {
            setRows(d);
        })
    }, [])

    useEffect(() => {
        // Updating Rows in every 5 Seconds;
        const interval = setInterval(() => {
            fetchData().then((d) => {
                setRows(d);
                console.log("rows Updated")
            })
        }, 5000);

        return () => clearInterval(interval);
    }, [rows])

    return (
        <>
            <Modall open={open} handleClose={handleClose} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Rank</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Symbol</TableCell>
                            <TableCell align="right">Price (USD)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                className='cursor-pointer'
                                onClick={handleOpen}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row"
                                >
                                    {row?.rank}
                                </TableCell>
                                <TableCell align="right">{row?.name}</TableCell>
                                <TableCell align="right">{row?.symbol}</TableCell>
                                <TableCell align="right">{row?.priceUsd}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
