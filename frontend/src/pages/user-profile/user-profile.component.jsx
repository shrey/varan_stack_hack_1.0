// import React,{useEffect, useState} from 'react';
// import axios from 'axios'
// import {Container, CssBaseline,Avatar,TextField} from '@material-ui/core'
// import {makeStyles} from '@material-ui/styles'

// const useStyles = makeStyles((theme) => ({

// }))
// const UserProfile = ({match}) => {
//     console.log(match.params.id)
//     useEffect(() => {
//         axios({
//             method: 'get',
//             url: `/user/${match.params.id}`
//         }).then(response => {
//             console.log(response.data);
//             alert('fetched');
//         }).catch(error => {
//             alert("Some error");
//             console.log(error);
//         })
//     },[])
//     const classes = useStyles();
//     return(
//         <Container component = "main" maxWidth = "xs">
//                         <CssBaseline />

//                         <div className = {classes.paper}>
//                             <Avatar alt = {name} src = {image_url} alt = {name} className = {classes.avatar}/>
//                             <TextField
//                             variant="standard"
//                             isRequired="true"
//                             margin="normal"
//                             className = {classes.previewText}
                            
//                             name="name"
//                             label="Name"
//                             type="Text"
//                             id = "user_name_preview"
                            
//                             autoComplete="user-name"
//                             value = {name}
//                             disabled
//                             />
//                             <TextField
//                             variant="standard"
//                             margin="normal"
                            
//                             disabled
//                             name="email"
//                             label="Email"
//                             type="email"
//                             id = "user_email_preview"
//                             onChange = {handleChange}
//                             autoComplete="user-email"
//                             value = {email}
//                             className = {classes.previewText}
//                             />
//                             <TextField
//                             variant="standard"
//                             margin="normal"
                            
//                             disabled
//                             name="registration_type"
//                             label="Registration Type"
//                             type="text"
//                             id = "registration_type_preview"
//                             onChange = {handleChange}
//                             autoComplete="registration-type"
//                             value = {registration_type}
//                             className = {classes.previewText}
//                             />
//                             <TextField
//                             variant="standard"
//                             margin="normal"
                            
//                             disabled
//                             name="tickets"
//                             label="Tickets"
//                             type="text"
//                             id = "tickets_preview"
//                             onChange = {handleChange}
//                             autoComplete="registration-type"
//                             value = {tickets}
//                             className = {classes.previewText}
//                             />
//                             <TextField
//                             variant="standard"
//                             margin="normal"
                            
//                             disabled
//                             name="mobile_no"
//                             label="Mobile Number"
//                             type="text"
//                             id = "mobile_no__preview"
//                             onChange = {handleChange}
//                             autoComplete="mobile-no"
//                             value = {mobile_no}
//                             className = {classes.previewText}
//                             />
//                         </div>
//                         </Container>
//     )
// }
// export default UserProfile;