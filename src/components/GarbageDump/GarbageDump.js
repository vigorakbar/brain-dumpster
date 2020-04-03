import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Container, LinearProgress, makeStyles, Typography, SnackbarContent, Collapse, IconButton } from '@material-ui/core';
import dumpster from 'dumpster';
import { generateNewGarbage } from 'util/garbage';
import { countWords } from 'util/string';
import { isSameDay, getCurrentDate, formatFullDate } from 'util/date';
import WritingArea from './WritingArea';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 64px)',
    '@media (max-width: 600px)': {
      height: 'calc(100vh - 56px)',
    },
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    height: 'calc(100vh - (64px + 3.5rem))',
    '@media (max-width: 600px)': {
      height: 'calc(100vh - (56px + 3.5rem))',
    },
    padding: '2rem 1rem 3rem',
    overflowY: 'auto',
  },
  footer: {
    width: '100%',
    padding: '12px 12px',
    backgroundColor: 'lightblue',
    boxSizing: 'border-box',
    height: '3.5rem',
    display: 'flex',
    alignItems: 'center',
  },
  progressWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  loading: {
    display: 'relative',
    top: -2,
  },
  progress: {
    height: '20px',
    marginRight: '12px',
    flex: 6,
  },
  count: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  progressIcon: {
    marginLeft: '8px',
  },
  infoRoot: {
    maxWidth: '615px',
    marginBottom: '16px',
    backgroundColor: theme.palette.info.main,
  },
  refreshIcon: {
    color: 'white',
  }
}))

const GarbageDump = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false)
  const saveProgress = debounce(({ id, content, date, wordCount }) => {
    if (id) {
      dumpster.setItem(`trash/${id}`, {
        content,
        date,
        wordCount,
      })
    }
  }, 500);

  const loadProgress = (id) => {
    setLoading(true)
    dumpster.getItem(`trash/${id}`)
      .then((res) => {
        setText(res.content)
        setCount(res.wordCount)
        setLoading(false)
      })
  }

  const [trashId, setTrashId] = useState();
  const [trashDate, setTrashDate] = useState();
  useEffect(() => {
    dumpster.iterate((value, key) => console.log(`${key}: ${JSON.stringify(value)}`))
    const currDate = getCurrentDate()
    dumpster.getItem('inProgress')
      .then((res) => {
        let trashInfo;
        if (!res || (res && !isSameDay(res.date, currDate))) {
          trashInfo = generateNewGarbage();
        } else {
          trashInfo = { id: res.id, date: res.date };
          loadProgress(res.id)
        }
        setTrashId(trashInfo.id);
        setTrashDate(trashInfo.date);
      })
  }, [])

  /* handle notification when trash date is not current date */
  const [dayChanged, setDayChanged] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      if (trashDate && !isSameDay(trashDate, getCurrentDate())) {
        setDayChanged(true)
      }
    }, 30000)

    return () => {
      clearInterval(interval)
    }
  }, [trashDate])

  /* Writing Actions */
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);
  useEffect(() => {
    const wordCount = countWords(text);
    setCount(wordCount);
    saveProgress({
      id: trashId,
      content: text,
      date: trashDate,
      wordCount
    });
  }, [text, saveProgress, trashId, trashDate])

  /* Progress */
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const currProgress = Math.floor((count / 750) * 100)
    setProgress(currProgress < 100 ? currProgress : 100);
  }, [count])

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Collapse in={dayChanged}>
          <SnackbarContent
            classes={{ root: classes.infoRoot }}
            message="This writing is from the past. Refresh this page to save it and start a new writing for today."
            action={
              <IconButton
                edge="start"
                aria-label="Refresh Page"
                title="Refresh Page"
                onClick={() => {
                  window.location.reload()
                  return false
                }}
                classes={{
                  colorPrimary: classes.refreshIcon
                }}
                color="primary"
              >
                <RefreshIcon />
              </IconButton>
            }
          />
        </Collapse>
        <Typography variant="h5">{formatFullDate(trashDate)}</Typography>
        <WritingArea
          text={text}
          setText={setText}
          loading={loading}
        />
        {loading && <LinearProgress variant="indeterminate" className={classes.loading} />}
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

export default GarbageDump;
