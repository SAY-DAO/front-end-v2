/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {
  Box,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { createCheckpoint, resetCreateCheckpoint } from '../../redux/actions/userAction';
import { CheckPointType } from '../../utils/checkpoint';

export default function CheckpointForm({ setOpenCheckPoint }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { loading, error, success } = useSelector((state) => state.userCheckPoints || {});

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      url: '',
      description: '',
      type: '',
      checkPointDate: null,
    },
  });

  // Build localized type options (label keys are in translation files under checkpoint.typeLabels)
  const typeOptions = Object.values(CheckPointType).map((type) => ({
    value: type,
    // translation key uses the enum value (e.g. 'feature', 'bug-fix', 'child-joined' ...)
    label: t(`checkpoint.typeLabels.${type}`),
  }));

  useEffect(() => {
    if (success) {
      reset({ title: '', url: '', description: '', type: '', checkPointDate: null });
      const tId = setTimeout(() => dispatch(resetCreateCheckpoint()), 2000);
      return () => clearTimeout(tId);
    }
  }, [success, dispatch, reset]);

  const onSubmit = (data) => {
    const dateObj =
      data.checkPointDate instanceof Date ? data.checkPointDate : new Date(data.checkPointDate);
    const isoDateNoTime = moment(dateObj).format('YYYY-MM-DD');
    const dto = {
      title: data.title,
      url: data.url || undefined,
      description: data.description || undefined,
      type: data.type || undefined,
      checkPointDate: isoDateNoTime,
    };
    dispatch(createCheckpoint(dto));
  };

  const handleClose = () => setOpenCheckPoint(false);

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'relative',
        p: 3,
        maxWidth: 800,
        width: '100%',
        mx: 'auto',
      }}
    >
      <IconButton
        aria-label={t('checkpoint.closeAria', 'Close')}
        onClick={handleClose}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
        }}
      >
        <CloseIcon />
      </IconButton>

      <Typography variant="h6" gutterBottom>
        {t('checkpoint.createTitle')}
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Title */}
          <Grid item xs={12} md={6}>
            <Controller
              name="title"
              control={control}
              rules={{
                required: t('checkpoint.titleRequired'),
                maxLength: { value: 50, message: t('checkpoint.maxChars', { count: 50 }) },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('checkpoint.titleLabel')}
                  required
                  error={!!errors.title}
                  helperText={errors.title?.message || t('checkpoint.maxCharsHint', { count: 50 })}
                  inputProps={{ maxLength: 50 }}
                  fullWidth
                />
              )}
            />
          </Grid>

          {/* URL */}
          <Grid item xs={12} md={6}>
            <Controller
              name="url"
              control={control}
              rules={{
                maxLength: { value: 500, message: t('checkpoint.maxUrlChars', { count: 500 }) },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('checkpoint.urlLabel')}
                  error={!!errors.url}
                  helperText={errors.url?.message || t('checkpoint.urlHelper')}
                  fullWidth
                />
              )}
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              rules={{
                required: t('checkpoint.descriptionRequired'),
                maxLength: { value: 150, message: t('checkpoint.maxChars', { count: 150 }) },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('checkpoint.descriptionLabel')}
                  multiline
                  minRows={3}
                  maxRows={8}
                  fullWidth
                  required
                  error={!!errors.description}
                  helperText={
                    errors.description?.message || t('checkpoint.maxCharsHint', { count: 150 })
                  }
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value)}
                  /* force a minimum visible height so external CSS can't collapse it */
                  inputProps={{
                    style: { maxHeight: 72, lineHeight: '1.5', resize: 'vertical' },
                  }}
                  sx={{
                    /* target the textarea input specifically and make sure it wraps & preserves newlines */
                    '& .MuiInputBase-input': {
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      overflowWrap: 'anywhere',
                    },
                    /* defensive: if something else sets a fixed height on the input root, override it */
                    '& .MuiInputBase-root': {
                      minHeight: 72,
                    },
                  }}
                />
              )}
            />
          </Grid>

          {/* Type selector (required) */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required error={!!errors.type}>
              <InputLabel id="type-label">{t('checkpoint.typeLabel')}</InputLabel>

              <Controller
                name="type"
                control={control}
                rules={{ required: t('checkpoint.typeRequired') }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="type-label"
                    label={t('checkpoint.typeLabel')}
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {typeOptions.map((opt) => {
                      const isDisabled =
                        opt.value === CheckPointType.CHILD_JOINED ||
                        opt.value === CheckPointType.SEASONAL_REPORT;
                      return (
                        <MenuItem key={opt.value} value={opt.value} disabled={isDisabled}>
                          {opt.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />

              <FormHelperText>{errors.type?.message}</FormHelperText>
            </FormControl>
          </Grid>

          {/* Date picker (required) */}
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
              <Controller
                name="checkPointDate"
                control={control}
                rules={{ required: t('checkpoint.dateRequired') }}
                render={({ field }) => (
                  <Box sx={{ width: '100%' }}>
                    <DesktopDatePicker
                      {...field}
                      label={t('checkpoint.dateLabel')}
                      inputFormat="MM/dd/yyyy"
                      value={field.value}
                      onChange={(val) => field.onChange(val)}
                      // swap the arrow icons so they read correctly in Jalali/RTL
                      components={{
                        RightArrowIcon: ChevronLeftIcon,
                        LeftArrowIcon: ChevronRightIcon,
                      }}
                      sx={{ width: '100%' }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={!!errors.checkPointDate}
                          helperText={errors.checkPointDate?.message}
                        />
                      )}
                    />
                  </Box>
                )}
              />
            </LocalizationProvider>
          </Grid>

          {/* Buttons */}
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'flex-end',
                gap: 1,
                '& > button': {
                  width: { xs: '100%', sm: 'auto' },
                },
              }}
            >
              <Button
                variant="outlined"
                onClick={() =>
                  reset({ title: '', url: '', description: '', type: '', checkPointDate: null })
                }
              >
                {t('checkpoint.reset')}
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={18} /> : null}
              >
                {loading ? t('checkpoint.saving') : t('checkpoint.createButton')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => dispatch(resetCreateCheckpoint())}
      >
        <Alert severity="success" onClose={() => dispatch(resetCreateCheckpoint())}>
          {t('checkpoint.createdSuccess')}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => dispatch(resetCreateCheckpoint())}
      >
        <Alert severity="error" onClose={() => dispatch(resetCreateCheckpoint())}>
          {typeof error === 'string' ? error : t('checkpoint.createdError')}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
