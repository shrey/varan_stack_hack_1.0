import React from 'react';
import {selectAdminPresent} from '../../redux/admin/admin.selector';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link, withRouter} from 'react-router-dom';
import {createStructuredSelector} from 'reselect'
import { withTheme } from '@material-ui/styles';
import { removeAdmin } from '../../redux/admin/admin.actions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  optionLink: {
      color: "white",

  }
}));

function Header({isAdmin,removeAdmin,history}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" className={classes.title}>
            <Link to = "/" className = {classes.optionLink}>Events</Link>
          </Typography>
          {
              isAdmin? 
              (
                <span>
                <Button color = "inherit" onClick = {() => history.push('/event/new')}>
                    + Add Event
                </Button>
                <Button color = "inherit" onClick = {() => removeAdmin()}>
                    Logout
                </Button>
                </span>
                
              ):
              (
                <Button color="inherit" onClick = {() => history.push('/admin')}>Login as Admin</Button>
              )
          }
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
    isAdmin: selectAdminPresent
})
const mapDispatchToProps = dispatch => ({
    removeAdmin: () => dispatch(removeAdmin())
})
export default withRouter (connect(mapStateToProps,mapDispatchToProps)(Header))