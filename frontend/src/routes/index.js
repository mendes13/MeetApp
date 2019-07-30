import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Meetup from '../pages/Meetup';
import CreateMeetup from '../pages/CreateMeetup';
import EditMeetup from '../pages/EditMeetup';
import Profile from '../pages/Profile';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />

      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route exact path="/meetup/:id" component={Meetup} isPrivate />
      <Route exact path="/create-meetup" component={CreateMeetup} isPrivate />
      <Route exact path="/edit-meetup/:id" component={EditMeetup} isPrivate />
      <Route exact path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}

export default Routes;
