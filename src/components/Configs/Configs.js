import React from 'react';
import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import ArrowDown from '@material-ui/icons/ArrowDownwardRounded'
import ArrowUp from '@material-ui/icons/ArrowUpwardRounded'
import dumpster from 'dumpster';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 64px)',
    '@media (max-width: 600px)': {
      height: 'calc(100vh - 56px)',
    },
    overflow: 'hidden'
  },
  title: {
    borderBottom: '2px solid lightgrey',
    marginTop: '18px',
    paddingBottom: '6px',
    width: '100%',
  },
  importExport: {
    margin: '32px 0'
  },
  imExWrapper: {
    margin: '24px 0'
  }
}));

const Config = () => {
  const classes = useStyles();
  const iterateTest = () => {
    dumpster.iterate((value, key) => {
      console.log(key, value)
    })
  }
  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h4" className={classes.title}>
          Configs
        </Typography>
        <div className={classes.importExport}>
          <div className={classes.imExWrapper}>
            <Typography variant="body1"><b>Import</b> Database from JSON file</Typography>
            <Button variant="contained" color="primary" startIcon={<ArrowDown />}>Import</Button>
          </div>
          <div>
            <Typography variant="body1"><b>Export</b> Database to JSON file</Typography>
            <Button onClick={iterateTest} variant="contained" color="primary" startIcon={<ArrowUp />}>Export</Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Config;
