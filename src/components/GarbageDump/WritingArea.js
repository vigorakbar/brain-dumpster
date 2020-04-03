import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  textArea: {
    marginTop: '16px',
  },
}));

const WritingArea = ({ text, setText, loading }) => {
  const classes = useStyles();

  const onChangeText = (e) => {
    const text = e.target.value;
    setText(text)
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
    />
  )
}

export default WritingArea;
