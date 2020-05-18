import React,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import {withRouter,Redirect} from 'react-router-dom'
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {setAdmin} from '../../redux/admin/admin.actions'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectEventName} from '../../redux/single-event/single-event.selectors'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(10),
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
  
const UserRegister = ({match,eventName}) => {
    console.log("USER REGISTER")
    console.log(match);
    
    const [preview,setPreview] = useState(false);
    
    const [userCredentials, setUserCredentials] = 
    
    useState({
        name: '',
        email: '',
        image_url: '',
        registration_type: '',
        tickets: '',
        mobile_no: ''
    });

    const {name,email,image_url,registration_type,tickets,mobile_no} = userCredentials;
    const handleChange = event => {
        const {name,value} = event.target;
        setUserCredentials({...userCredentials, [name]: value});
    }
    const setToPreview = event =>{
        event.preventDefault();
        setPreview(true);
    }
    const handleSubmit = event =>{
        event.preventDefault();
        axios({
            url: `/event/register/${match.params.id}`,
            method: 'post',
            data: {
            name: name,
            email: email,
            image_url: image_url,
            registration_type: registration_type,
            tickets: tickets,
            mobile_no: mobile_no
        }
        }).then(response => {
            alert("Successful Post");
        }).catch(error => {
            alert("Some error occured")
        })
    }
    
    const classes = useStyles();
    
    
    
    return(
        
          <div>
            {
                preview? (
                <div>
                    Hey this is the preview page
                    <div>{name}</div>
                    <div>{email}</div>
                    <div>{image_url}</div>
                    <div>{registration_type}</div>
                    <div>{tickets}</div>
                    <div>{mobile_no}</div>
                    <form className={classes.form} 
                    noValidate 
                    onSubmit = {handleSubmit}>
                    <Button
                    type="submit"
                    
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    
                    >Confirm</Button>
                    <Button
                    type="button"
                    
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick = {() => setPreview(false)}
                    >Edit Details</Button>
                    </form>
                    
                Preview
            
                </div>
            ):
            (
            
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            
            <Typography component="h1" variant="h5">
                Register for {eventName}
            </Typography>
            <form className={classes.form} noValidate onSubmit = {setToPreview}>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="name"
                label="Name"
                type="Text"
                id = "user_name"
                onChange = {handleChange}
                autoComplete="user-name"
                value = {name}
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="text"
                id = "user_email"
                onChange = {handleChange}
                autoComplete="user-email"
                value = {email}
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="image_url"
                label="Image URL"
                type="text"
                id = "user_image"
                onChange = {handleChange}
                autoComplete="user-image"
                value = {image_url}
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="registration_type"
                label="Registration Type"
                type="text"
                id = "registration_type"
                onChange = {handleChange}
                autoComplete="registration-type"
                value = {registration_type}
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="tickets"
                label="Number of Tickets"
                type="text"
                id = "tickets"
                onChange = {handleChange}
                autoComplete="tickets"
                value = {tickets}
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="mobile_no"
                label="Mobile Number"
                type="text"
                id = "mobile"
                onChange = {handleChange}
                autoComplete="mobile"
                value = {mobile_no}
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}

            >
                Preview
            </Button>
                
                </form>
                </div>
            </Container>
            
            )
}
            
          </div>
        
    )

}
const mapDispatchToProps = createStructuredSelector({
    eventName: selectEventName
})
export default connect(mapDispatchToProps)(UserRegister);