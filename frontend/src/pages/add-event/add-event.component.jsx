import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';

import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {setAdmin} from '../../redux/admin/admin.actions'
import {connect} from 'react-redux'
import axios from 'axios'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AddEvent() {
  const classes = useStyles();
    const [eventCredentails,setEventCredentials] = useState({
        name: '',
        description: '',
        image: '',
        location: ''
    })
    const {name,description,image,location} = eventCredentails;
    const handleChange = event => {
        const {name,value} = event.target;
        console.log(name,value);
        setEventCredentials({...eventCredentails,[name]: value})
    }

    const handleSubmit = event =>{
        event.preventDefault();
        axios({
            url: 'new',
            method: 'post',
            data: {
                name: name,
                description: description,
                image: image,
                location: location
            }
        }).then(response => {
            alert('Request Sent');
        })
        .catch(error => {
            console.log('Error: ',error);
            alert(
                'Some problem while adding the event'
            )
        })
        //trigger sagas.
    }
  
    return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Event Details
        </Typography>
        <form className={classes.form} noValidate onSubmit = {handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            type="text"
            id = "eventName"
            value = {name}
            autoComplete="event-name"
            onChange = {handleChange}
          />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            type="text"
            id="eventDescription"
            value = {description}
            autoComplete="event-description"
            onChange = {handleChange}
          />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="image"
            label="ImageURL"
            type="text"
            id="eventImage"
            value = {image}
            autoComplete="event-image"
            onChange = {handleChange}
          />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="location"
            label="Location"
            type="text"
            id="eventLocation"
            value = {location}
            autoComplete="Event-Location"
            onChange = {handleChange}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Event
          </Button>
          
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );

    }
const mapDispatchToProps = dispatch => ({
    setAdmin: () => dispatch(setAdmin())
})

export default connect(null,mapDispatchToProps)(AddEvent);

