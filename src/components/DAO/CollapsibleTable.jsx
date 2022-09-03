/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Grid,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import PageContainer from '../container/PageContainer';
import DaoStepper from './DaoStepper';

const CollapsibleTable = ({ updated }) => {
  const { t } = useTranslation();

  // urgent ==> index 0
  // growth ==> index 1
  // joy ==> index 2
  // health ==> index 3
  // surroundings ==> index 4
  // all ==> index 5

  return (
    <PageContainer
      title="Impact Table"
      description="this is impact Table"
      sx={{ windth: '100%' }}
    >
      <Card>
        <CardContent>
          <Box
            sx={{
              overflow: {
                xs: 'auto',
                sm: 'unset',
              },
            }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography
                      sx={{ textAlign: 'center' }}
                      variant="subtitle1"
                    >
                      {t('dao.table.headrow.0')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{ textAlign: 'center' }}
                      variant="subtitle1"
                    >
                      {t('dao.table.headrow.1')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{ textAlign: 'center' }}
                      variant="subtitle1"
                    >
                      {t('dao.table.headrow.2')}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {updated.doneNeeds[5].map((need, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Box sx={{ m: 0 }}>
                          <Typography
                            sx={{
                              maxWidth: '80px',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              width: '160px',
                              height: '1.2em',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {need.title}
                          </Typography>

                          <Typography
                            color="textSecondary"
                            variant="body1"
                            fontWeight="400"
                          >
                            {index === 0
                              ? t('childData.needCategory.urgent')
                              : index === 1
                              ? t('childData.needCategory.growth')
                              : index === 2
                              ? t('childData.needCategory.joy')
                              : index === 3
                              ? t('childData.needCategory.health')
                              : t('childData.needCategory.surroundings')}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: 'center', width: '100%', p: 0 }}
                    >
                      <Typography variant="body2">${need.need_id}k</Typography>
                      <DaoStepper />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <LoadingButton
                        variant="outlined"
                        sx={{
                          fontWeight: 400,
                          fontSize: '12px',
                          lineHeight: '14px',
                          minWidth: '60px',
                          // backgroundColor:
                          //   need.status === 'Active'
                          //     ? (theme) => theme.palette.success.light
                          //     : need.status === 'Pending'
                          //     ? (theme) => theme.palette.warning.light
                          //     : need.status === 'Completed'
                          //     ? (theme) => theme.palette.primary.light
                          //     : need.status === 'Cancel'
                          //     ? (theme) => theme.palette.error.light
                          //     : (theme) => theme.palette.secondary.light,
                          // color:
                          //   need.status === 'Active'
                          //     ? (theme) => theme.palette.success.main
                          //     : need.status === 'Pending'
                          //     ? (theme) => theme.palette.warning.main
                          //     : need.status === 'Completed'
                          //     ? (theme) => theme.palette.primary.main
                          //     : need.status === 'Cancel'
                          //     ? (theme) => theme.palette.error.main
                          //     : (theme) => theme.palette.secondary.main,
                          borderRadius: '6px',
                          pl: 0,
                          pr: 0,
                        }}
                      >
                        Sign
                      </LoadingButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>
    </PageContainer>
  );
};
export default CollapsibleTable;

CollapsibleTable.propTypes = {
  updated: PropTypes.object.isRequired,
};
