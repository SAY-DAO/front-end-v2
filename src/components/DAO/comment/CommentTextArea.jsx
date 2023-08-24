import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TextareaAutosize } from '@mui/material';
import { styled } from '@mui/system';
import { blue, grey } from '@mui/material/colors';

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
  width: 100%;
  font-size: 0.75rem;
  font-weight: 200;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.secondary.light};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

export default function CommentTextArea({ message, setMessage }) {
  const { t } = useTranslation();

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <StyledTextarea
      id="outlined-multiline-static"
      label="Comment Area"
      minRows={3}
      placeholder={t('comment.placeholder')}
      variant="outlined"
      value={message}
      onChange={handleChange}
    />
  );
}

CommentTextArea.propTypes = {
  message: PropTypes.string,
  setMessage: PropTypes.func,
};
