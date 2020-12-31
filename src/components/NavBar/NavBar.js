import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import SettingsIcon from '@material-ui/icons/Settings';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { ARCHIVE_PAGE, BRAIN_DUMPSTER_PAGE, CONFIG_PAGE } from 'const/pages';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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

const NavBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <>
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
              selected={window.location.pathname === BRAIN_DUMPSTER_PAGE}
              onClick={() => history.push(BRAIN_DUMPSTER_PAGE)}
            >
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Brain Dump" />
            </ListItem>
            <ListItem
              button
              selected={window.location.pathname === ARCHIVE_PAGE}
              onClick={() => history.push(ARCHIVE_PAGE)}
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Garbage Archive" />
            </ListItem>
            <ListItem
              button
              selected={window.location.pathname === CONFIG_PAGE}
              onClick={() => history.push(CONFIG_PAGE)}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Configs" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default NavBar;
