import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import GarbageDump from './components/GarbageDump/GarbageDump';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Archive from 'components/Archive/Archive';

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
  list: {
    width: 250,
    marginTop: 16,
  }
}));

export default function App(props) {
  const classes = useStyles();
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Brain Dumpster
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div
          className={classes.list}
          role="presentation"
          onClick={() => setOpenDrawer(false)}
          onKeyDown={() => setOpenDrawer(false)}
        >
          <List>
            <ListItem
              button
              selected={window.location.pathname === '/'}
              onClick={() => history.push('/')}
            >
              <ListItemIcon><DeleteIcon /></ListItemIcon>
              <ListItemText primary="Brain Dump" />
            </ListItem>
            <ListItem
              button
              selected={window.location.pathname === '/archive'}
              onClick={() => history.push('/archive')}
            >
              <ListItemIcon><FolderIcon /></ListItemIcon>
              <ListItemText primary="Garbage Archive" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <Switch>
        <Route exact path="/">
          <GarbageDump />
        </Route>
        <Route exact path="/archive">
          <Archive />
        </Route>
      </Switch>
    </div>
  );
}
