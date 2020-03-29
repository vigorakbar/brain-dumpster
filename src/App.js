import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Container, LinearProgress } from '@material-ui/core';
import WritingArea from './components/WritingArea';
import { countWords } from './util/string';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    minHeight: '100vh',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    paddingBottom: '3rem',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: '12px 12px',
    backgroundColor: 'lightblue',
    boxSizing: 'border-box',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
  },
  progressWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  progress: {
    height: '20px',
    marginRight: '12px',
    flex: 4,
  },
  count: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  progressIcon: {
    marginLeft: '8px',
  }
}));

export default function App() {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const currProgress = Math.floor((count / 750) * 100)
    setProgress(currProgress < 100 ? currProgress : 100);
  }, [count])
  useEffect(() => {
    setCount(countWords(text));
  }, [text])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <WritingArea
          text={text}
          setText={setText}
        />
      </Container>
      <div className={classes.footer}>
        <div className={classes.progressWrapper}>
          <LinearProgress className={classes.progress} variant="determinate" value={progress} />
          <div className={classes.count}>
            <div>{count} words</div>
            {progress === 100 && <CheckCircleIcon color="primary" className={classes.progressIcon} />}
          </div>
        </div>
      </div>
    </div>
  );
}
