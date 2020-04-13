import React from 'react'
import { Dialog, DialogTitle, Typography, IconButton, DialogContent, Container, makeStyles } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import BackIcon from '@material-ui/icons/ChevronLeft'
import { formatFullDate } from 'util/date'

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
  dialogTitle: {
    borderBottom: '2px solid lightgrey',
    display: 'flex',
    alignItems: 'center',

    '& > button': {
      marginRight: '4px',
    }
  },
  dialogContent: {
    whiteSpace: 'pre-wrap',
  }
}))

const TrashDetail = ({ selectedTrash, setSelectedTrash }) => {
  const classes = useStyles()
  return (
    <Dialog
      open={Boolean(selectedTrash)}
      fullScreen
      onClose={() => setSelectedTrash(null)}
    // TransitionComponent={Transition} // TODO: set Transition to slide
    >
      <DialogTitle disableTypography>
        <Typography variant="h6" className={classes.dialogTitle} component="div">
          <IconButton
            aria-label="close"
            onClick={() => setSelectedTrash(null)}
          >
            <BackIcon />
          </IconButton>
          <div>{selectedTrash && formatFullDate(selectedTrash.date)}</div>
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => setSelectedTrash(null)}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Container>
          <div className={classes.dialogContent}>
            {selectedTrash ? selectedTrash.content : ''}
          </div>
        </Container>
      </DialogContent>
    </Dialog>
  )
}

export default TrashDetail
