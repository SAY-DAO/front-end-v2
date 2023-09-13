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
import { getVFamilyRoleString } from '../../../utils/helpers';

function createData(name, min, q1, q2, q3, max) {
  return { name, min, q1, q2, q3, max };
}

export default function DistanceRatioTable() {
  const { t } = useTranslation();

  const [rows, setRows] = useState([]);

  const ecosystemData = useSelector((state) => state.ecosystemData);
  const { ecoResult } = ecosystemData;

  const readySigningOneNeed = useSelector((state) => state.readySigningOneNeed);
  const { oneReadyNeed } = readySigningOneNeed;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (ecoResult) {
      setRows([
        createData(
          'Fathers',
          ecoResult.ecosystem.ecoCompletePayQuartile.IQRObject.min[
            getVFamilyRoleString(
              oneReadyNeed.members &&
                oneReadyNeed.members.find((m) => m.id_user === userInfo.user.id).flaskFamilyRole,
            ).toLowerCase()
          ],
          ecoResult.ecosystem.ecoCompletePayQuartile.IQRObject.Q1[
            getVFamilyRoleString(
              oneReadyNeed.members &&
                oneReadyNeed.members.find((m) => m.id_user === userInfo.user.id).flaskFamilyRole,
            ).toLowerCase()
          ],
          ecoResult.ecosystem.ecoCompletePayQuartile.IQRObject.Q2[
            getVFamilyRoleString(
              oneReadyNeed.members &&
                oneReadyNeed.members.find((m) => m.id_user === userInfo.user.id).flaskFamilyRole,
            ).toLowerCase()
          ],
          ecoResult.ecosystem.ecoCompletePayQuartile.IQRObject.Q3[
            getVFamilyRoleString(
              oneReadyNeed.members &&
                oneReadyNeed.members.find((m) => m.id_user === userInfo.user.id).flaskFamilyRole,
            ).toLowerCase()
          ],
          ecoResult.ecosystem.ecoCompletePayQuartile.IQRObject.max[
            getVFamilyRoleString(
              oneReadyNeed.members &&
                oneReadyNeed.members.find((m) => m.id_user === userInfo.user.id).flaskFamilyRole,
            ).toLowerCase()
          ],
        ),
      ]);
    }
  }, [ecoResult]);

  return (
    <TableContainer
      sx={{ bgcolor: '#e9e9e9', color: 'black', fontWeight: 400, mt: 2 }}
      component={Paper}
    >
      <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 800 }} align="center">
              Role
            </TableCell>
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
