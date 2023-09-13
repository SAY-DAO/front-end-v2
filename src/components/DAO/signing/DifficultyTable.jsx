import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function createData(name, min, q1, q2, q3, max) {
  return { name, min, q1, q2, q3, max };
}

export default function DifficultyTable() {
  const [rows, setRows] = useState([]);
  const needVariables = useSelector((state) => state.needVariables);
  const { coeffsResult } = needVariables;

  useEffect(() => {
    if (coeffsResult) {
      setRows([
        createData(
          'Confirm',
          coeffsResult.needConfirmDuration.min_confirm_duration,
          coeffsResult.needConfirmDuration.Q1_confirm_duration,
          coeffsResult.needConfirmDuration.Q2_confirm_duration,
          coeffsResult.needConfirmDuration.Q3_confirm_duration,
          coeffsResult.needConfirmDuration.max_confirm_duration,
        ),
        createData(
          'Pay',
          coeffsResult.needPaymentDuration.min_payment_duration,
          coeffsResult.needPaymentDuration.Q1_payment_duration,
          coeffsResult.needPaymentDuration.Q2_payment_duration,
          coeffsResult.needPaymentDuration.Q3_payment_duration,
          coeffsResult.needPaymentDuration.max_payment_duration,
        ),
        createData(
          'Logistic',
          coeffsResult.needLogisticDuration.min_logistic_duration,
          coeffsResult.needLogisticDuration.Q1_logistic_duration,
          coeffsResult.needLogisticDuration.Q2_logistic_duration,
          coeffsResult.needLogisticDuration.Q3_logistic_duration,
          coeffsResult.needLogisticDuration.max_logistic_duration,
        ),
        createData(
          'Amount',
          coeffsResult.needPaymentAmount.min_payment_amount.toLocaleString(),
          coeffsResult.needPaymentAmount.Q1_payment_amount.toLocaleString(),
          coeffsResult.needPaymentAmount.Q2_payment_amount.toLocaleString(),
          coeffsResult.needPaymentAmount.Q3_payment_amount.toLocaleString(),
          coeffsResult.needPaymentAmount.max_payment_amount.toLocaleString(),
        ),
      ]);
    }
  }, [coeffsResult]);

  return (
    <TableContainer
      sx={{ bgcolor: '#e9e9e9', color: 'black', fontWeight: 400, mt: 2 }}
      component={Paper}
    >
      <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 800 }} align="center">
              Title
            </TableCell>
            <TableCell sx={{ fontWeight: 800 }} align="center">
              Min
            </TableCell>
            <TableCell sx={{ fontWeight: 800 }} align="center">
              Q1
            </TableCell>
            <TableCell sx={{ fontWeight: 800 }} align="center">
              Q2
            </TableCell>
            <TableCell sx={{ fontWeight: 800 }} align="center">
              Q3
            </TableCell>
            <TableCell sx={{ fontWeight: 800 }} align="center">
              Max
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 &&
            rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ fontWeight: 800, textAlign: 'center' }} component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.min}</TableCell>
                <TableCell align="center">{row.q1}</TableCell>
                <TableCell align="center">{row.q2}</TableCell>
                <TableCell align="center">{row.q3}</TableCell>
                <TableCell align="center">{row.max}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
