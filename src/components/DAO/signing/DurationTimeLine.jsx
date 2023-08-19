import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { Box, Tooltip, Typography } from '@mui/material';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { PropTypes } from 'prop-types';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { useState, useEffect } from 'react';
import { NeedTypeEnum } from '../../../utils/types';
import { dateConvertor } from '../../../utils/persianToEnglish';

export default function DurationTimeLine({ need }) {
  const { t } = useTranslation();

  const [initialSignature, setInitialSignature] = useState();
  useEffect(() => {
    const signature = need.signatures.find((s) => s.flaskUserId === need.socialWorker.flaskUserId);
    setInitialSignature(signature);
  }, []);

  return (
    <Timeline position="alternate" sx={{ pt: 4, pl: 0, pr: 0 }}>
      {initialSignature && (
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary" fontSize={12}>
            {parseInt(
              moment(initialSignature.createdAt).diff(moment(need.childDeliveryDate), 'days'),
              10,
            ) > 1
              ? `${moment(initialSignature.createdAt).diff(
                  moment(need.childDeliveryDate),
                  'days',
                )} ${t('dao.signaturesTab.timeLine.days')}`
              : `${moment(initialSignature.createdAt).diff(
                  moment(need.childDeliveryDate),
                  'hours',
                )} ${t('dao.signaturesTab.timeLine.hours')}`}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <Tooltip
              title={<Typography sx={{ fontSize: 12 }}>{dateConvertor(initialSignature.createdAt)}</Typography>}
            >
              <TimelineDot variant="outlined" sx={{ borderColor: 'transparent', p: 0, m: 1 }}>
                <Box
                  sx={{
                    height: '15px',
                    width: '15px',
                    border: (theme) => `2px solid ${theme.palette.primary.main}`,
                  }}
                />
              </TimelineDot>
            </Tooltip>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent fontSize={12}>
            {t('dao.signaturesTab.timeLine.initialSignature')}
          </TimelineContent>
        </TimelineItem>
      )}
      {need.type === NeedTypeEnum.PRODUCT && need.childDeliveryDate && (
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary" fontSize={12}>
            {parseInt(
              moment(need.childDeliveryDate).diff(moment(need.ngoDeliveryDate), 'days'),
              10,
            ) > 1
              ? `${moment(need.childDeliveryDate).diff(moment(need.ngoDeliveryDate), 'days')} ${t(
                  'dao.signaturesTab.timeLine.days',
                )}`
              : `${moment(need.childDeliveryDate).diff(moment(need.ngoDeliveryDate), 'hours')} ${t(
                  'dao.signaturesTab.timeLine.hours',
                )}`}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <Tooltip
              title={
                <Typography sx={{ fontSize: 12 }}>
                  {dateConvertor(need.childDeliveryDate)}
                </Typography>
              }
            >
              <TimelineDot
                variant="outlined"
                color="primary"
                sx={{ border: 'none', p: 0, mb: 1, mt: 1 }}
              >
                <ChildCareIcon color="primary" sx={{ width: 25, height: 25 }} />
              </TimelineDot>
            </Tooltip>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent fontSize={12}>
            {t('dao.signaturesTab.timeLine.childDelivery')}
          </TimelineContent>
        </TimelineItem>
      )}
      {need.type === NeedTypeEnum.PRODUCT &&
        (need.ngoDeliveryDate || need.expectedDeliveryDate) && (
          <TimelineItem>
            <TimelineOppositeContent
              color="text.secondary"
              fontSize={12}
              sx={{
                color: (theme) => !need.ngoDeliveryDate && theme.palette.warning.main,
              }}
            >
              {parseInt(
                moment(need.ngoDeliveryDate || need.expectedDeliveryDate).diff(
                  moment(need.purchaseDate),
                  'days',
                ),
                10,
              ) > 1
                ? `${moment(need.ngoDeliveryDate || need.expectedDeliveryDate).diff(
                    moment(need.purchaseDate),
                    'days',
                  )} ${t('dao.signaturesTab.timeLine.days')}`
                : `${moment(need.ngoDeliveryDate || need.expectedDeliveryDate).diff(
                    moment(need.purchaseDate),
                    'hours',
                  )} ${t('dao.signaturesTab.timeLine.hours')}`}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <Tooltip
                title={
                  <Typography
                    sx={{
                      fontSize: 12,
                    }}
                  >
                    {dateConvertor(need.ngoDeliveryDate || need.expectedDeliveryDate)}
                  </Typography>
                }
              >
                <TimelineDot variant="outlined" color="primary" sx={{ bgcolor: '#fbb563' }} />
              </Tooltip>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              fontSize={12}
              sx={{
                color: (theme) => !need.ngoDeliveryDate && theme.palette.warning.main,
              }}
            >
              {need.ngoDeliveryDate
                ? t('dao.signaturesTab.timeLine.ngoDelivery')
                : t('dao.signaturesTab.timeLine.expNgoDelivery')}
            </TimelineContent>
          </TimelineItem>
        )}
      {need.type === NeedTypeEnum.SERVICE && need.childDeliveryDate && (
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary" fontSize={12}>
            {parseInt(
              moment(need.childDeliveryDate).diff(moment(need.ngoDeliveryDate), 'days'),

              10,
            ) > 1
              ? `${moment(need.childDeliveryDate).diff(moment(need.ngoDeliveryDate), 'days')} ${t(
                  'dao.signaturesTab.timeLine.days',
                )}`
              : `${moment(need.childDeliveryDate).diff(moment(need.ngoDeliveryDate), 'hours')} ${t(
                  'dao.signaturesTab.timeLine.hours',
                )}`}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <Tooltip
              title={
                <Typography sx={{ fontSize: 12 }}>
                  {dateConvertor(need.childDeliveryDate)}
                </Typography>
              }
            >
              <TimelineDot variant="outlined" color="secondary" />
            </Tooltip>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent fontSize={12}>
            {t('dao.signaturesTab.timeLine.childDelivery')}
          </TimelineContent>
        </TimelineItem>
      )}
      {need.type === NeedTypeEnum.PRODUCT && need.purchaseDate && (
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary" fontSize={12}>
            {parseInt(moment(need.purchaseDate).diff(moment(need.doneAt), 'days'), 10) > 1
              ? `${moment(need.purchaseDate).diff(moment(need.doneAt), 'days')} ${t(
                  'dao.signaturesTab.timeLine.days',
                )}`
              : `${moment(need.purchaseDate).diff(moment(need.doneAt), 'hours')} ${t(
                  'dao.signaturesTab.timeLine.hours',
                )}`}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <Tooltip
              title={
                <Typography sx={{ fontSize: 12 }}>{dateConvertor(need.purchaseDate)}</Typography>
              }
            >
              <TimelineDot variant="outlined" color="primary" sx={{ bgcolor: '#fbb563' }} />
            </Tooltip>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent fontSize={12}>
            {t('dao.signaturesTab.timeLine.purchased')}
          </TimelineContent>
        </TimelineItem>
      )}
      {need.type === NeedTypeEnum.SERVICE && need.ngoDeliveryDate && (
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary" fontSize={12}>
            {parseInt(moment(need.ngoDeliveryDate).diff(moment(need.doneAt), 'days'), 10) > 1
              ? `${moment(need.ngoDeliveryDate).diff(moment(need.doneAt), 'days')} ${t(
                  'dao.signaturesTab.timeLine.days',
                )}`
              : `${moment(need.ngoDeliveryDate).diff(moment(need.doneAt), 'hours')} ${t(
                  'dao.signaturesTab.timeLine.hours',
                )}`}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <Tooltip
              title={
                <Typography sx={{ fontSize: 12 }}>{dateConvertor(need.ngoDeliveryDate)}</Typography>
              }
            >
              <TimelineDot variant="outlined" color="primary" sx={{ bgcolor: '#fbb563' }} />
            </Tooltip>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent fontSize={12}>
            {t('dao.signaturesTab.timeLine.moneyToNgo')}
          </TimelineContent>
        </TimelineItem>
      )}
      {need.doneAt && (
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary" fontSize={12}>
            {parseInt(moment(need.doneAt).diff(moment(need.confirmDate), 'days'), 10) > 1
              ? `${moment(need.doneAt).diff(moment(need.confirmDate), 'days')} ${t(
                  'dao.signaturesTab.timeLine.days',
                )}`
              : `${moment(need.doneAt).diff(moment(need.confirmDate), 'hours')} ${t(
                  'dao.signaturesTab.timeLine.hours',
                )}`}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <Tooltip
              title={<Typography sx={{ fontSize: 12 }}>{dateConvertor(need.doneAt)}</Typography>}
            >
              <TimelineDot variant="outlined" color="primary" sx={{ bgcolor: '#fbb563' }} />
            </Tooltip>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent fontSize={12}>{t('dao.signaturesTab.timeLine.paid')}</TimelineContent>
        </TimelineItem>
      )}
      {need.confirmDate && (
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary" fontSize={12}>
            {parseInt(moment(need.confirmDate).diff(moment(need.created), 'days'), 10) > 1
              ? `${moment(need.confirmDate).diff(moment(need.created), 'days')} ${t(
                  'dao.signaturesTab.timeLine.days',
                )}`
              : `${moment(need.confirmDate).diff(moment(need.created), 'hours')} ${t(
                  'dao.signaturesTab.timeLine.hours',
                )}`}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <Tooltip
              title={
                <Typography sx={{ fontSize: 12 }}>{dateConvertor(need.confirmDate)}</Typography>
              }
            >
              <TimelineDot variant="outlined" color="primary" sx={{ bgcolor: '#fbb563' }} />
            </Tooltip>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent fontSize={12}>
            {need.confirmDate && t('dao.signaturesTab.timeLine.confirmed')}
          </TimelineContent>
        </TimelineItem>
      )}
      {need.created && (
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary" fontSize={12}>
            <Typography sx={{ fontSize: 12 }}>{dateConvertor(need.created)}</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <Tooltip
              title={
                <>
                  <Typography sx={{ fontSize: 14, textAlign: 'center', fontWeight: 800 }}>
                    {need.child && need.child.ngo && need.child.ngo.name}
                  </Typography>
                </>
              }
            >
              <TimelineDot
                variant="outlined"
                color="primary"
                sx={{ border: 'none', p: 0, mb: 1, mt: 1 }}
              >
                <HomeOutlinedIcon sx={{ width: 25, height: 25 }} />
              </TimelineDot>
            </Tooltip>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent fontSize={12}>
            {need.created && t('dao.signaturesTab.timeLine.created')}
          </TimelineContent>
        </TimelineItem>
      )}
    </Timeline>
  );
}

DurationTimeLine.propTypes = {
  need: PropTypes.object,
};
