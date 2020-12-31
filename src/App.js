import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GarbageDump from './components/GarbageDump/GarbageDump';
import { Switch, Route, Redirect } from 'react-router-dom';
import Archive from 'components/Archive/Archive';
import { ARCHIVE_PAGE, BRAIN_DUMPSTER_PAGE, CONFIG_PAGE } from 'const/pages';
import Config from 'components/Configs/Configs';
import NavBar from 'components/NavBar/NavBar';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    minHeight: '100vh',
  },
}));

export default function App(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar />
      <Switch>
        <Route exact path='/' >
          <Redirect to={BRAIN_DUMPSTER_PAGE} />
        </Route>
        <Route exact path={BRAIN_DUMPSTER_PAGE}>
          <GarbageDump />
        </Route>
        <Route exact path={ARCHIVE_PAGE}>
          <Archive />
        </Route>
        <Route exact path={CONFIG_PAGE}>
          <Config />
        </Route>
      </Switch>
    </div>
  );
}
