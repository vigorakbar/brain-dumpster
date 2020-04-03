import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Container, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import dumpster from 'dumpster';
import { generateNewGarbage } from 'util/garbage';
import { countWords } from 'util/string';
import { isSameDay, getCurrentDate, formatFullDate } from 'util/date';
import WritingArea from './WritingArea';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '2rem 1rem 3rem',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
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
    <React.Fragment>
      <Container className={classes.container}>
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
    </React.Fragment>
  );
}

export default GarbageDump;
