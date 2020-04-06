import React, { useEffect, useState, useCallback } from 'react';
import { Container, Typography, makeStyles } from '@material-ui/core';
import dumpster from 'dumpster';
import { formatFullDate } from 'util/date'

const PAGE_SIZE = 10;

const useStyles = makeStyles((theme) => ({
  title: {
    borderBottom: '2px solid lightgrey',
    marginTop: '18px',
    paddingBottom: '6px',
    width: '100%',
  }
}))

const Archive = () => {
  const classes = useStyles()

  const [ids, setIds] = useState([]);
  const [trashList, setTrashList] = useState([]);
  useEffect(() => {
    dumpster.getItem('dumpster')
      .then(res => {
        setIds([...res])
      })
  }, [])

  const [page, setPage] = useState(1);
  const getTrashList = useCallback(() => {
    let firstIdx = PAGE_SIZE * (page - 1)
    let lastIdx = PAGE_SIZE * page
    const getGarbage = ids.slice(firstIdx, lastIdx).map(id => (
      dumpster.getItem(`trash/${id}`)
    ))
    Promise.all(getGarbage)
      .then((data) => {
        setTrashList(data)
      })
  }, [ids, page])

  useEffect(() => {
    getTrashList();
  }, [getTrashList, page])

  return (
    <Container>
      <Typography variant="h4" className={classes.title}>Archive</Typography>
      {trashList.map(data => (
        <div key={formatFullDate(data.date)}>{formatFullDate(data.date)}</div>
      ))}
    </Container>
  )
}

export default Archive;
