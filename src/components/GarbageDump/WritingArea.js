import React, { useState } from 'react';
import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  textArea: {
    marginTop: '16px',
  },
}));

const WritingArea = ({ text, setText, loading }) => {
  const classes = useStyles();
  const [error, setError] = useState('');

  const onChangeText = (e) => {
    const text = e.target.value || '';
    if (text.length <= 50000) {
      setText(text)
      setError('')
    } else {
      setError('Your writing appetite is extraordinary today! unfortunately you reached the input limit :(')
    }
  }

  return (
    <TextField
      className={classes.textArea}
      multiline
      variant="outlined"
      rows="20"
      fullWidth
      value={text}
      onChange={onChangeText}
      disabled={loading}
      helperText={error}
      error={Boolean(error)}
    />
  )
}

export default WritingArea;
