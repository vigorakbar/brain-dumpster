import React, { useEffect, useState, useCallback } from 'react';
import { Container, Typography, makeStyles, Card, CardContent, CardActions, Button } from '@material-ui/core';
import dumpster from 'dumpster';
import { formatFullDate } from 'util/date'
import TrashDetail from './TrashDetail';

const PAGE_SIZE = 10;

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
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '6px',
  },
  card: {
    flex: '0 1 30%',
    margin: '16px 8px',
    minWidth: '272px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '8px'
  },
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

  const totalPage = Math.ceil(ids.length / 10);
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

  const [selectedTrash, setSelectedTrash] = useState(null)

  return (
    <div className={classes.root}>
      <TrashDetail selectedTrash={selectedTrash} setSelectedTrash={setSelectedTrash} />
      <Container>
        <Typography variant="h4" className={classes.title}>Archive</Typography>
        <div className={classes.cardsContainer}>
          {trashList.map(data => {
            const fullDate = data && formatFullDate(data.date)
            return (
              <Card
                classes={{ root: classes.card }}
                key={fullDate}
              >
                <CardContent>
                  <Typography variant="h5">
                    {fullDate}
                  </Typography>
                  <Typography>
                    {data && data.content.slice(0, 21)}. . .
              </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => setSelectedTrash({ ...data })}>Open</Button>
                </CardActions>
              </Card>
            )
          })}
        </div>
        <div className={classes.pagination}>
          <Button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            &lt; Prev
        </Button>
          <div>
            {page} of {totalPage}
          </div>
          <Button
            disabled={page === totalPage}
            onClick={() => setPage(page + 1)}
          >
            Next &gt;
        </Button>
        </div>
      </Container>
    </div>
  )
}

export default Archive;
