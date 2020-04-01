import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';
// import debounce from 'lodash.debounce';

const useStyles = makeStyles(() => ({
  textArea: {
    marginTop: '32px',
  },
}));

const WritingArea = ({ text, setText }) => {
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
      rows="10"
      fullWidth
      value={text}
      onChange={onChangeText}
    />
  )
}

export default WritingArea;
