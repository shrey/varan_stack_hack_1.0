import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './pages/admin-login/admin-login.component'
import CollectionPage from './pages/events-collection/events-collection.component'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import './App.css';
import Header from './components/header/header.component'
import AddEvent from './pages/add-event/add-event.component'
import EventPage from './pages/event-page/event-page.component'
import {selectAdminPresent} from './redux/admin/admin.selector'
import UserRegister from './pages/user-register-and-preview/user-register-and-preview.component';
import UserProfile from './pages/user-profile/user-profile.component'
import {selectIsLoading} from './redux/single-event/single-event.selectors'
function App({isAdmin}) {
  console.log("Admin: ")
  console.log(isAdmin);
  return (
   <div>
      <Header />
      <Switch>
        <Route exact path = "/" component = {CollectionPage} />
        <Route exact path = "/admin"
        render =
        {
          () => isAdmin?
            (<Redirect to = '/' />):
            (
              <SignIn />
            )
        } />
        <Route exact path = "/event/new" component = {AddEvent} />
        <Route exact path = "/event/:id" component = {EventPage} />
        <Route exact path = "/event/:id/register" component = {UserRegister} />
        <Route exact path = "/user/:id" component = {UserProfile} />

      </Switch>
   </div>

  );
}
const mapStateToProps = createStructuredSelector({
  isAdmin: selectAdminPresent
})
export default connect(mapStateToProps)(App);
