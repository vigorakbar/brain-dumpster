import React, { useEffect, useState, useCallback } from 'react';
import { Container, Typography, makeStyles, Card, CardContent, CardActions, Button } from '@material-ui/core';
import dumpster from 'dumpster';
import { formatFullDate } from 'util/date'

const PAGE_SIZE = 10;

const useStyles = makeStyles((theme) => ({
  title: {
    borderBottom: '2px solid lightgrey',
    marginTop: '18px',
    paddingBottom: '6px',
    width: '100%',
  },
  card: {
    marginBottom: '16px',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center'
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
  return (
    <Container>
      <Typography variant="h4" className={classes.title}>Archive</Typography>
      {trashList.map(data => {
        const fullDate = data && formatFullDate(data.date)
        return (
          <Card
            classes={{ root: classes.card }}
            key={fullDate}
          >
            <CardContent>
              <Typography variant="h5" component="h2">
                {fullDate}
              </Typography>
              <Typography>
                {data && data.content.slice(0, 21)}. . .
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Open</Button>
            </CardActions>
          </Card>
        )
      })}
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
  )
}

export default Archive;
