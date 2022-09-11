import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper, CircularProgress } from '@mui/material';
import { useTranslation, Trans } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Back from '../components/Back';
import Message from '../components/Message';
import { CHILD_ONE_NEED_RECEIPT_RESET } from '../redux/constants/childConstants';
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

export default function Report() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { status } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [title, setTitle] = useState('');
  const [socialWorkerCode, setSocialWorkerCode] = useState('');
  const [socialWorkerGeneratedCode, setSocialWorkerGeneratedCode] =
    useState('');
  const [swId, setSwId] = useState(false);
  const [showDkc, setShowDkc] = useState(false);
  const [dkcNumber, setDkcNumber] = useState('');
  const [needName, setNeedName] = useState('');
  const [childSayName, setChildSayName] = useState();
  const [dkc, setDkc] = useState();
  const myChild = useSelector((state) => state.myChild);
  const { theChild } = myChild;

  const ChildOneNeed = useSelector((state) => state.ChildOneNeed);
  const {
    oneNeed,
    loading: loadingOneNeed,
    error: errorOneNeed,
    // success: successOneNeed,
  } = ChildOneNeed;

  // // loading button
  useEffect(() => {
    if (loadingOneNeed) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingOneNeed]);

  useEffect(() => {
    dispatch({ type: CHILD_ONE_NEED_RECEIPT_RESET });
  }, [dispatch]);

  // name of need and child
  useEffect(() => {
    if (oneNeed && theChild) {
      if (oneNeed.type && oneNeed.link) {
        setNeedName(oneNeed.clean_title);
        setDkc(oneNeed.dkc);
        setSocialWorkerGeneratedCode(theChild.socialWorkerGeneratedCode);
      } else {
        setNeedName(oneNeed.name);
      }
    }
    if (theChild) {
      setChildSayName(theChild.sayName);
    }
  }, [oneNeed, theChild]);

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
    if (oneNeed && theChild) {
      setSocialWorkerCode(
        <Trans i18nKey="report.swId">
          The social worker ID: {{ socialWorkerGeneratedCode }}
        </Trans>
      );
      setDkcNumber(<Trans i18nKey="report.dkc">DKC number: {{ dkc }}</Trans>);
      switch (parseInt(status)) {
        case 2: // done (p2s2)
          setImage(t('report.p2s2.img'));
          setTitle(
            <Trans i18nKey="report.p2s2.title">
              One of{{ childSayName }}’s needs is completely done
            </Trans>
          );
          setParagraph(
            <Trans i18nKey="report.p2s2.paragraph">
              With your collaborations, all expenses for {{ needName }} has been
              paid for on
              {{
                date: formatDate(oneNeed.doneAt, t('assets.language')),
              }}
              .{{ childSayName }}
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
                  Tomans for purchasing{{ childSayName }}’s {{ needName }}, has
                  been transferred into the NGO’s bank account, on
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
                  Purchase receipt for {{ childSayName }}’s needs
                </Trans>
              );
              setParagraph(
                <Trans i18nKey="report.p3.paragraph">
                  {{ needName }} is ordered for {{ childSayName }} on
                  {{
                    date: formatDate(
                      oneNeed.purchase_date,
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
          break;

        case 4: // delivery to ngo, delivery to child
          switch (oneNeed.type) {
            case 0: // service (s4)
              setImage(t('report.s4.img'));
              setTitle(
                <Trans i18nKey="report.s4.title">
                  {{ childSayName }}’s {{ needName }} has been paid for
                </Trans>
              );
              setParagraph(
                <Trans i18nKey="report.s4.paragraph">
                  The amount of {{ needCost: oneNeed.cost.toLocaleString() }}{' '}
                  Tomans for{{ childSayName }}’s {{ needName }}, has been paid
                  by the NGO on
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
              Product delivered to{{ childSayName }}
            </Trans>
          );
          setParagraph(
            <Trans i18nKey="report.p5.paragraph">
              {{ needName }} is delivered to{{ childSayName }} on
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
    }
  }, [
    oneNeed,
    theChild,
    childSayName,
    status,
    swId,
    dkc,
    showDkc,
    socialWorkerGeneratedCode,
    t,
    needName,
  ]);

  const classes = useStyles();
  return (
    <>
      {!isLoading && theChild && oneNeed && status ? (
        <>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ height: '80vh' }}
          >
            <Grid item xs={12} sx={{ padding: 5, marginTop: 6 }}>
              <Back isOrange to={`/child/${theChild.id}/needs/${oneNeed.id}`} />

              <Paper elevation={2} className={classes.root}>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ padding: 1 }}
                >
                  <Grid item xs={8}>
                    <img
                      onLoad={() => setIsLoading(false)}
                      src={image}
                      alt="status"
                      style={{ maxWidth: '60px', marginTop: '50px' }}
                    />
                  </Grid>
                  <Grid item xs={8} sx={{ margin: 1 }}>
                    <Typography variant="subtitle1">{title}</Typography>
                  </Grid>
                  <Grid item xs={8} sx={{ textAlign: 'center' }}>
                    <Typography variant="body1">{paragraph}</Typography>
                    {swId && (
                      <Typography variant="body2">
                        {socialWorkerCode}
                      </Typography>
                    )}
                    {showDkc && (
                      <Typography variant="body2">{dkcNumber}</Typography>
                    )}
                  </Grid>
                </Grid>
              </Paper>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <a href="http://say.company" target="_blank" rel="noreferrer">
                  <img
                    src="https://sayapp.company/public/resources/img/logo-white.png"
                    alt="logo"
                    style={{ maxWidth: '60px' }}
                  />
                </a>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10} sx={{ textAlign: 'center' }}>
            {errorOneNeed && (
              <Message
                backError={errorOneNeed}
                variant="standard"
                severity="error"
              />
            )}
          </Grid>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
