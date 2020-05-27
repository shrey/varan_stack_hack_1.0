import React,{useState,useEffect} from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {TextField, Select, FormControl, InputLabel, Container, Avatar} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import {withRouter,Redirect} from 'react-router-dom'
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
      textAlign: 'center',
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
    formControl: {
        width: "100%",
        marginTop: theme.spacing(1)
    },
    avatar: {
        width: "150px",
        height: "150px",
    },
    previewText: {
        textAlign: "center",
        width: "300px"
    },
    buttonContainer: {
        alignItems: "center",
        textAlign: "center"
    },
    button: {
        margin: "20px"
    }
  }));
  
const UserRegister = ({match,eventName,history}) => {
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
    
    const [file,setFile] = useState(null);



    const {name,email,image_url,registration_type,tickets,mobile_no} = userCredentials;
    const handleChange = event => {
        
        const {name,value} = event.target;
        console.log(value);
        setUserCredentials({...userCredentials, [name]: value});
        console.log(userCredentials);
    }
    const setToPreview = event =>{
        event.preventDefault();
        var isEmpty = false;
        for(var key in userCredentials){
            if(userCredentials[key] === ''){
               isEmpty = true;
            }
        }
        if(isEmpty){
            alert("Please Enter all values");
            return;
        }
        setPreview(true);
    }
    const handleFileChange = (event) =>{
     const imageFile = event.target.files[0];
     if(imageFile.type === 'image/jpeg' || imageFile.type === 'image/png'){
        setFile(imageFile);
    }
     else{
         alert("Please upload .png or .jpeg files");
         
     }
        
    }
    const handleSubmit = () =>{
        
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
            //Have to enter the axios request here
            
            console.log(response);
            history.push(`/event/${match.params.id}`)
        }).catch(error => {
            alert("Some error occured")
        })
    }
    
    const classes = useStyles();


    const handleUpload = () => {
	let formData = new FormData();
        
	formData.append("file", file);
        console.log("Upload opened")
        console.log(formData);
        axios.post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            setUserCredentials({...userCredentials, image_url: response.data.url})
            console.log('File Uploaded')
        }).catch(error => {
            console.log(error);
        })
    }
    
    return(
        
          <div>
            {
                preview? (
                <div>
                    <Container component = "main" maxWidth = "xs">
                        <CssBaseline />

                        <div className = {classes.paper}>
                            <Avatar alt = {name} src = {image_url} alt = {name} className = {classes.avatar}/>
                            <TextField
                            variant="standard"
                            isRequired="true"
                            margin="normal"
                            className = {classes.previewText}
                            
                            name="name"
                            label="Name"
                            type="Text"
                            id = "user_name_preview"
                            
                            autoComplete="user-name"
                            value = {name}
                            disabled
                            />
                            <TextField
                            variant="standard"
                            margin="normal"
                            
                            disabled
                            name="email"
                            label="Email"
                            type="email"
                            id = "user_email_preview"
                            onChange = {handleChange}
                            autoComplete="user-email"
                            value = {email}
                            className = {classes.previewText}
                            />
                            <TextField
                            variant="standard"
                            margin="normal"
                            
                            disabled
                            name="registration_type"
                            label="Registration Type"
                            type="text"
                            id = "registration_type_preview"
                            onChange = {handleChange}
                            autoComplete="registration-type"
                            value = {registration_type}
                            className = {classes.previewText}
                            />
                            <TextField
                            variant="standard"
                            margin="normal"
                            
                            disabled
                            name="tickets"
                            label="Tickets"
                            type="text"
                            id = "tickets_preview"
                            onChange = {handleChange}
                            autoComplete="registration-type"
                            value = {tickets}
                            className = {classes.previewText}
                            />
                            
                            <TextField
                            variant="standard"
                            margin="normal"
                            
                            disabled
                            name="mobile_no"
                            label="Mobile Number"
                            type="text"
                            id = "mobile_no__preview"
                            onChange = {handleChange}
                            autoComplete="mobile-no"
                            value = {mobile_no}
                            className = {classes.previewText}
                            />
                        </div>
                        <div className = {classes.buttonContainer}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick = {() => setPreview(false)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick = {() => handleSubmit()}
                        >
                            Register
                        </Button>
                        </div>
                    </Container>
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
                isRequired="true"
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
                type="email"
                id = "user_email"
                onChange = {handleChange}
                autoComplete="user-email"
                value = {email}
                />
                
                <input type = "file" onChange = {handleFileChange} />
                <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick = {() => handleUpload()}
                >
                Upload
            </Button>
                <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="filled-age-native-simple">Registration Type</InputLabel>
                <Select
                native
                name = 'registration_type'
                onChange={handleChange}
                label="Registration Type"
                inputProps={{
                    name: 'registration_type',
                    id: 'outlined-age-native-simple',
                }}
                >
            <option aria-label="None" value="" />
                <option value="Self">Self</option>
                <option value="Group">Group</option>
                <option value="Corporate">Corporate</option>
                <option value="Others">Others</option>
                </Select>
                </FormControl>
                
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="tickets"
                label="Number of Tickets"
                type="number"
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
                label="Mobile Number(10 digits)"
                type="number"
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
export default withRouter(connect(mapDispatchToProps)(UserRegister));
