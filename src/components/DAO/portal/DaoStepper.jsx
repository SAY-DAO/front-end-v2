import * as React from 'react';
import Radio from '@mui/material/Radio';
import { useState } from 'react';

export default function DaoStepper() {
  const [selectedValue, setSelectedValue] = useState('pending');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value);
  };

  const controlProps = (item) => ({
    // checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <div>
      <Radio
        {...controlProps('pending')}
        checked={
          selectedValue === 'pending' ||
          selectedValue === 'socialWorker' ||
          selectedValue === 'family' ||
          selectedValue === 'friend'
        }
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
        {...controlProps('socialWorker')}
        checked={
          selectedValue === 'socialWorker' ||
          selectedValue === 'family' ||
          selectedValue === 'friend'
        }
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
        {...controlProps('family')}
        checked={selectedValue === 'family' || selectedValue === 'friend'}
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
        {...controlProps('friend')}
        checked={selectedValue === 'friend'}
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
