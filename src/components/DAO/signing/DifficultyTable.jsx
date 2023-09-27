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
import { useTranslation } from 'react-i18next';

function createData(name, min, q1, q2, q3, max) {
  return { name, min, q1, q2, q3, max };
}

export default function DifficultyTable() {
  const { t } = useTranslation();

  const [rows, setRows] = useState([]);
  const needVariables = useSelector((state) => state.needVariables);
  const { collectiveResult } = needVariables;

  useEffect(() => {
    if (collectiveResult) {
      setRows([
        createData(
          t('dao.variables.difficulty.confirmDuration'),
          collectiveResult.needConfirmDuration.min_confirm_duration,
          collectiveResult.needConfirmDuration.Q1_confirm_duration,
          collectiveResult.needConfirmDuration.Q2_confirm_duration,
          collectiveResult.needConfirmDuration.Q3_confirm_duration,
          collectiveResult.needConfirmDuration.max_confirm_duration,
        ),
        createData(
          t('dao.variables.difficulty.paymentDuration'),
          collectiveResult.needPaymentDuration.min_payment_duration,
          collectiveResult.needPaymentDuration.Q1_payment_duration,
          collectiveResult.needPaymentDuration.Q2_payment_duration,
          collectiveResult.needPaymentDuration.Q3_payment_duration,
          collectiveResult.needPaymentDuration.max_payment_duration,
        ),
        createData(
          t('dao.variables.difficulty.logisticDuration'),
          collectiveResult.needLogisticDuration.min_logistic_duration,
          collectiveResult.needLogisticDuration.Q1_logistic_duration,
          collectiveResult.needLogisticDuration.Q2_logistic_duration,
          collectiveResult.needLogisticDuration.Q3_logistic_duration,
          collectiveResult.needLogisticDuration.max_logistic_duration,
        ),
        createData(
          t('dao.variables.difficulty.relativeAmount'),
          collectiveResult.needPaymentAmount.min_payment_amount.toLocaleString(),
          collectiveResult.needPaymentAmount.Q1_payment_amount.toLocaleString(),
          collectiveResult.needPaymentAmount.Q2_payment_amount.toLocaleString(),
          collectiveResult.needPaymentAmount.Q3_payment_amount.toLocaleString(),
          collectiveResult.needPaymentAmount.max_payment_amount.toLocaleString(),
        ),
      ]);
    }
  }, [collectiveResult]);

  return (
    <TableContainer
      sx={{ bgcolor: '#e9e9e9', color: 'black', fontWeight: 400, mt: 2 }}
      component={Paper}
    >
      <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 800 }} align="center" />
            <TableCell sx={{ fontWeight: 800 }} align="center">
              {t('dao.variables.min')}
            </TableCell>
            <TableCell sx={{ fontWeight: 800 }} align="center">
              {t('dao.variables.Q1')}
            </TableCell>
            <TableCell sx={{ fontWeight: 800 }} align="center">
              {t('dao.variables.Q2')}
            </TableCell>
            <TableCell sx={{ fontWeight: 800 }} align="center">
              {t('dao.variables.Q3')}
            </TableCell>
            <TableCell sx={{ fontWeight: 800 }} align="center">
              {t('dao.variables.max')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 &&
            rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  sx={{ fontWeight: 800, textAlign: 'center', minWidth: 100 }}
                  component="th"
                  scope="row"
                >
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
