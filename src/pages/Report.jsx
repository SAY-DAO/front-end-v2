import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper, Divider } from '@mui/material';
import { useTranslation, Trans } from 'react-i18next';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Back from '../components/Back';
import Message from '../components/Message';
import NeedPageTop from '../components/need/NeedPageTop';
import NeedStepper from '../components/need/NeedStepper';
import { CHILD_ONE_NEED_RECEIPT_RESET } from '../constants/childConstants';
import NeedParticipants from '../components/need/NeedParticipants';
import { enDate, faDate } from '../date.js';

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    minHeight: '300px',
  },

  needName: {
    color: 'white',
  },

  needDesc: {
    color: '#8c8c8c',
  },
});

export default function Report({ childId }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [title, setTitle] = useState('');
  const [socialWorkerCode, setSocialWorkerCode] = useState('');
  const [swId, setSwId] = useState('');
  const [showDkc, setShowDkc] = useState('');
  const [dkcNumber, setDkcNumber] = useState('');
  const [needName, setNeedName] = useState('');

  const myChild = useSelector((state) => state.myChild);
  const { theChild } = myChild;

  const ChildOneNeed = useSelector((state) => state.ChildOneNeed);
  const {
    oneNeed,
    loading: loadingOneNeed,
    error: errorOneNeed,
    success: successOneNeed,
  } = ChildOneNeed;

  // useEffect(() => {
  //   dispatch({ type: CHILD_ONE_NEED_RECEIPT_RESET });
  // }, [dispatch]);

  // loading button
  useEffect(() => {
    if (loadingOneNeed) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingOneNeed]);

  // disable button
  useEffect(() => {
    if (successOneNeed) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [successOneNeed]);

  // name of need
  useEffect(() => {
    if (oneNeed) {
      if (oneNeed.type && oneNeed.link) {
        setNeedName(oneNeed.cleanTitle);
      } else {
        setNeedName(oneNeed.name);
      }
    }
  }, [oneNeed]);

  // date
  const formatDate = (date, lang) => {
    if (lang === 'en') {
      return enDate(date);
    }
    if (lang === 'fa') {
      return faDate(date);
    }
  };

  useEffect(() => {
    setSocialWorkerCode(
      <Trans i18nKey="report.swId">
        The social worker ID: {theChild.socialWorkerGeneratedCode}
      </Trans>
    );
    setDkcNumber(<Trans i18nKey="report.dkc">DKC number: {oneNeed.dkc}</Trans>);
    switch (oneNeed.status) {
      case 2: // done (p2s2)
        setImage(t('report.p2s2.img'));
        setTitle(
          <Trans i18nKey="report.p2s2.title">
            One of {theChild.childSayName}’s needs is completely done
          </Trans>
        );
        setParagraph(
          <Trans i18nKey="report.p2s2.paragraph">
            With your collaborations, all expenses for {{ needName }} has been
            paid for on
            {{
              date: formatDate(oneNeed.doneAt, t('assets.language')),
            }}
            .{theChild.childSayName}
          </Trans>
        );
        break;

      case 3: // purchased, money
        switch (oneNeed.type) {
          case 0: // service (s3)
            setSwId(true);
            setImage(t('report.s3.img'));
            setTitle(t('report.s3.title'));
            setParagraph(
              <Trans i18nKey="report.s3.paragraph">
                The amount of {{ needCost: oneNeed.cost.toLocaleString() }}{' '}
                Tomans for purchasing {theChild.childSayName}’s {{ needName }},
                has been transferred into the NGO’s bank account, on
                {{
                  date: formatDate(
                    oneNeed.ngo_delivery_date,
                    t('assets.language')
                  ),
                }}
                .
              </Trans>
            );
            break;

          case 1: // product (p3)
            setShowDkc(Boolean(oneNeed.dkc || false));
            setImage(t('report.p3.img'));
            setTitle(
              <Trans i18nKey="report.p3.title">
                Purchase receipt for {theChild.childSayName}’s needs
              </Trans>
            );
            setParagraph(
              <Trans i18nKey="report.p3.paragraph">
                {{ needName }} is ordered for {theChild.childSayName} on
                {{
                  date: formatDate(oneNeed.purchase_date, t('assets.language')),
                }}
                .
              </Trans>
            );
            break;

          default:
            break;
        }
        break;

      case 4: // delivery to ngo, delivery to child
        switch (oneNeed.type) {
          case 0: // service (s4)
            setImage(t('report.s4.img'));
            setTitle(
              <Trans i18nKey="report.s4.title">
                {theChild.childSayName}’s {{ needName }} has been paid for
              </Trans>
            );
            setParagraph(
              <Trans i18nKey="report.s4.paragraph">
                The amount of {{ needCost: oneNeed.cost.toLocaleString() }}{' '}
                Tomans for {theChild.childSayName}’s {{ needName }}, has been
                paid by the NGO on
                {{
                  date: formatDate(
                    oneNeed.child_delivery_date,
                    t('assets.language')
                  ),
                }}
                .
              </Trans>
            );
            break;

          case 1: // product (p4)
            setSwId(true);
            setImage(t('report.p4.img'));
            setTitle(t('report.p4.title'));
            setParagraph(
              <Trans i18nKey="report.p4.paragraph">
                On{' '}
                {{
                  date: formatDate(
                    oneNeed.ngo_delivery_date,
                    t('assets.language')
                  ),
                }}{' '}
                {{ needName }} is delivered to the NGO.
              </Trans>
            );
            break;

          default:
            break;
        }
        break;

      case 5: // delivery to child (p5)
        setImage(t('report.p5.img'));
        setTitle(
          <Trans i18nKey="report.p5.title">
            Product delivered to {theChild.childSayName}
          </Trans>
        );
        setParagraph(
          <Trans i18nKey="report.p5.paragraph">
            {{ needName }} is delivered to {theChild.childSayName} on
            {{
              date: formatDate(
                oneNeed.child_delivery_date,
                t('assets.language')
              ),
            }}
            .
          </Trans>
        );
        break;
      default:
        break;
    }
  }, [oneNeed]);

  // const renderButton = () => {
  //   if (this.state.status === 4 && this.state.type === 1) {
  //     return this.state.receipts.map((receipt) => (
  //       <div className="buttonWrapper" key={receipt.id}>
  //         <a
  //           href={receipt.attachment}
  //           target="_blank"
  //           className="defaultButton"
  //           rel="noreferrer"
  //         >
  //           {t('report.download')}
  //         </a>
  //       </div>
  //     ));
  //   }
  // };
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100vh' }}
      >
        {oneNeed && theChild && (
          <Grid item xs={12} sx={{ padding: 5 }}>
            <Back isOrange to={`/child/${childId}/needs/${oneNeed.id}`} />

            <Paper elevation={2} className={classes.root}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <img src={image} alt="status" style={{ maxWidth: '60px' }} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">{title}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">{paragraph}</Typography>
                  {swId && <Typography>{socialWorkerCode}</Typography>}
                  {showDkc && <Typography>{dkcNumber}</Typography>}
                </Grid>
              </Grid>

              <div className="report-logo-wrapper">
                <a href="http://say.company" target="_blank" rel="noreferrer">
                  <img
                    src="https://sayapp.company/public/resources/img/logo-white.png"
                    alt="logo"
                    style={{ maxWidth: '60px' }}
                  />
                </a>
              </div>
              {/* {renderButton()} */}
            </Paper>
          </Grid>
        )}
      </Grid>
      <Grid item xs={10} sx={{ textAlign: 'center' }}>
        {errorOneNeed && (
          <Message backError={errorOneNeed} variant="filled" severity="error" />
        )}
      </Grid>
    </>
  );
}

Report.propTypes = {
  childId: PropTypes.string,
};
