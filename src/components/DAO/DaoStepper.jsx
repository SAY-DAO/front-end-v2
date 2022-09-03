/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';

export default function DaoStepper() {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <div>
      <Radio
        {...controlProps('a')}
        size="small"
        sx={{
          m: 0,
          p: 0,
          '& .MuiSvgIcon-root': {
            fontSize: 10,
          },
          '&.Mui-checked': {
            color: '#26DFD0 ',
          },
        }}
      />
      <Radio
        {...controlProps('b')}
        color="secondary"
        sx={{
          m: 0,
          p: 0,
          '& .MuiSvgIcon-root': {
            fontSize: 10,
            borderRadius: 0,
          },
          '&.Mui-checked': {
            color: '#F62AA0',
          },
        }}
      />
      <Radio
        {...controlProps('c')}
        color="success"
        sx={{
          m: 0,
          p: 0,
          '& .MuiSvgIcon-root': {
            fontSize: 10,
          },
          '&.Mui-checked': {
            color: '#65FC6A',
          },
        }}
      />
      <Radio
        {...controlProps('d')}
        color="default"
        sx={{
          m: 0,
          p: 0,
          '& .MuiSvgIcon-root': {
            fontSize: 10,
          },
          '&.Mui-checked': {
            color: '#F9F940',
          },
        }}
      />
    </div>
  );
}
