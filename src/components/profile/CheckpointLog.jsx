/* eslint-disable no-bitwise */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { fetchCheckpoints } from '../../redux/actions/userAction';
import { dateConvertor } from '../../utils/persianToEnglish';

const TYPE_CHIP_STYLES = {
  // Engineering / Releases
  feature: { bg: '#0366d6', color: '#ffffff' },
  'bug-fix': { bg: '#d73a49', color: '#ffffff' },
  hotfix: { bg: '#b31d28', color: '#ffffff' },
  deploy: { bg: '#6f42c1', color: '#ffffff' },
  rollback: { bg: '#e36209', color: '#ffffff' },
  'db-migration': { bg: '#005cc5', color: '#ffffff' },
  'code-review': { bg: '#6a737d', color: '#ffffff' },
  performance: { bg: '#2188ff', color: '#ffffff' },

  // Product / Research
  roadmap: { bg: '#0a5e2a', color: '#ffffff' },
  'product-spec': { bg: '#2cbe4e', color: '#ffffff' },
  'user-research': { bg: '#00a3bf', color: '#ffffff' },
  testing: { bg: '#f1e05a', color: '#000000' },

  // Design / Creative
  design: { bg: '#ff7b72', color: '#ffffff' },
  ux: { bg: '#e99695', color: '#ffffff' },
  branding: { bg: '#d876e3', color: '#ffffff' },
  'asset-production': { bg: '#fbca04', color: '#000000' },

  // Content / Marketing
  'content-creation': { bg: '#6f42c1', color: '#ffffff' },
  copywriting: { bg: '#0366d6', color: '#ffffff' },
  seo: { bg: '#28a745', color: '#ffffff' },
  social: { bg: '#1da1f2', color: '#ffffff' },
  'email-campaign': { bg: '#0052cc', color: '#ffffff' },
  'paid-ads': { bg: '#ff8b00', color: '#ffffff' },
  'marketing-campaign': { bg: '#fb6a2a', color: '#ffffff' },
  'growth-experiment': { bg: '#20c997', color: '#ffffff' },

  // Customer / Sales / Support
  'customer-support': { bg: '#6a737d', color: '#ffffff' },
  onboarding: { bg: '#2f80ed', color: '#ffffff' },
  'sales-outreach': { bg: '#ffd33d', color: '#000000' },
  partnerships: { bg: '#6f42c1', color: '#ffffff' },
  'incident-response': { bg: '#d73a49', color: '#ffffff' },

  // Ops / Infra / Security / Legal / Finance / HR
  monitoring: { bg: '#ffb84d', color: '#000000' },
  backup: { bg: '#6f42c1', color: '#ffffff' },
  security: { bg: '#24292e', color: '#ffffff' },
  'config-change': { bg: '#0366d6', color: '#ffffff' },
  automation: { bg: '#0a66c2', color: '#ffffff' },
  legal: { bg: '#8b5cf6', color: '#ffffff' },
  finance: { bg: '#0f766e', color: '#ffffff' },
  hr: { bg: '#ef4444', color: '#ffffff' },
  meeting: { bg: '#94a3b8', color: '#000000' },
  training: { bg: '#0ea5a4', color: '#ffffff' },

  // New
  'child-joined': { bg: '#2b9348', color: '#ffffff' },
  'seasonal-report': { bg: '#005f73', color: '#ffffff' },
};

const getChipStyle = (type) => TYPE_CHIP_STYLES[type] || { bg: '#6a737d', color: '#ffffff' };

// --------- Helpers: convert hex -> rgba and create very pale, low-saturation chip styles
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const full =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h;
  const bigint = parseInt(full, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}
function hexToRgba(hex, alpha = 1) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Create a very pale background + faint border and readable text for small chips
function getChipSxFromBase(baseHex, opts = {}) {
  const bgAlpha = typeof opts.bgAlpha === 'number' ? opts.bgAlpha : 0.06; // 0.04 - 0.12 recommended
  const borderAlpha = typeof opts.borderAlpha === 'number' ? opts.borderAlpha : 0.14;
  const text = opts.forceTextColor ?? '#0f172a'; // prefer dark text for pale backgrounds

  return {
    backgroundColor: hexToRgba(baseHex, bgAlpha),
    color: text,
    border: `1px solid ${hexToRgba(baseHex, borderAlpha)}`,
    fontWeight: 200,
    height: 24,
    fontSize: '0.72rem',
    ml: 0.5,
  };
}

export default function CheckpointLog() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const checkpointList = useSelector((state) => state.userCheckPoints || {});
  const { checkpoints = [], loading, error } = checkpointList;
console.log(checkpoints);

  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    dispatch(fetchCheckpoints());
  }, [dispatch]);

  function formatDate(val) {
    if (!val) return '';
    try {
      return dateConvertor(new Date(val).toLocaleString());
    } catch {
      return val;
    }
  }

  const toggleOpen = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <Box
      sx={{
        mb: 10,
        textAlign: 'center',
        width: '100%',
        p: 2,
        color: (theme) => theme.palette.text.primary,
      }}
    >
      <Typography variant="h6" component="div" sx={{ fontWeight: 500, mb: 1 }}>
        {t('checkpoint.publicTitle')}
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <CircularProgress size={20} sx={{ color: (theme) => theme.palette.text.primary }} />
        </Box>
      )}

      {error && (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            {t('checkpoint.errorMessage', {
              message: typeof error === 'string' ? error : JSON.stringify(error),
            })}
          </Typography>
        </Box>
      )}

      <Box
        role="region"
        aria-label={t('checkpoint.listAria')}
        sx={{
          height: 360,
          overflowY: 'auto',
          overflowX: 'hidden',
          bgcolor: 'transparent',
          mt: 1,
        }}
      >
        {!loading && !error && checkpoints && checkpoints.length === 0 && (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2">{t('checkpoint.noCheckpoints')}</Typography>
          </Box>
        )}

        <List disablePadding>
          {checkpoints &&
            checkpoints.map((it) => {
              const id = it.id ?? it._id ?? JSON.stringify(it);

              // localized type label (fall back to raw type)
              const typeLabel = it.type
                ? t(`checkpoint.typeLabels.${it.type}`, { defaultValue: it.type })
                : '';

              const chipStyle = getChipStyle(it.type);

              return (
                <React.Fragment key={id}>
                  <ListItem
                    sx={{
                      display: 'block',
                      py: 0.5,
                    }}
                    disableGutters
                  >
                    {/* Primary single-line row */}
                    <Grid container wrap="nowrap" alignItems="center" spacing={1} sx={{ gap: 1 }}>
                      {/* Title (truncates) */}
                      <Grid item xs sx={{ minWidth: 0, overflow: 'hidden' }}>
                        <Typography
                          sx={{
                            fontWeight: 300,
                            fontSize: 12,
                            minWidth: 0,
                            maxWidth: '100%',
                          }}
                          noWrap
                          component="span"
                        >
                          {it.title || t('checkpoint.untitled')}
                        </Typography>
                      </Grid>

                      {/* Type chip (keeps natural width) */}
                      <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                        {typeLabel ? (
                          <Chip
                            variant="outlined"
                            label={typeLabel}
                            size="small"
                            sx={getChipSxFromBase(chipStyle.bg, {
                              bgAlpha: 0.06,
                              borderAlpha: 0.14,
                            })}
                          />
                        ) : (
                          <Typography variant="caption" sx={{ opacity: 0.85 }}>
                            {it.type || ''}
                          </Typography>
                        )}
                      </Grid>

                      {/* Date + actions: pushed to the far right, stays on one line */}
                      <Grid
                        item
                        sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            whiteSpace: 'nowrap',
                            fontWeight: 200,
                            fontSize: 10,
                          }}
                        >
                          {formatDate(it.checkPointDate || it.checkpointDate)}
                        </Typography>

                        <Tooltip
                          title={
                            openId === id
                              ? t('checkpoint.hideDetails')
                              : t('checkpoint.showDetails')
                          }
                        >
                          <IconButton
                            size="small"
                            aria-expanded={openId === id}
                            aria-label={
                              openId === id
                                ? t('checkpoint.collapseDetails')
                                : t('checkpoint.expandDetails')
                            }
                            onClick={() => toggleOpen(id)}
                          >
                            <ExpandMoreIcon
                              sx={{
                                transform: openId === id ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 200ms',
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>

                    {/* Collapsible details (description + url) */}
                    <Collapse in={openId === id} timeout="auto" unmountOnExit>
                      <Box sx={{ mt: 1, pr: 1 }}>
                        {it.description && (
                          <Typography
                            variant="body2"
                            sx={{ whiteSpace: 'pre-wrap', mb: it.url ? 1 : 0 }}
                          >
                            {it.description}
                          </Typography>
                        )}

                        {it.url && (
                          <Link
                            href={it.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            underline="hover"
                          >
                            {it.url}
                          </Link>
                        )}
                      </Box>
                    </Collapse>
                  </ListItem>

                  <Divider sx={{ borderColor: (theme) => theme.palette.text.primary }} />
                </React.Fragment>
              );
            })}
        </List>
      </Box>
    </Box>
  );
}
