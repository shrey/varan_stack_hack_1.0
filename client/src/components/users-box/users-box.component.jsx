import React from 'react';
import {withRouter} from 'react-router-dom'
import './users-box.styles.scss'
import {makeStyles} from '@material-ui/core/styles';
import {Typography, Link} from '@material-ui/core'
import { textAlign } from '@material-ui/system';
const useStyles = makeStyles((theme) => ({
    usersBox: {
        
        
        
        
        
    },
    userContainer: {
        textAlign: "center",
        backgroundColor: "#000000",
       
        color: "#FFFFFF",
       
        padding: "10px",
    },
    box: {
        marginLeft: "60px",
        marginRight: "60px",
        marginTop: "30px",
        backgroundColor: "#F1F1F1",
        
    },
    userDetails: {
        marginLeft: "20px",
        marginTop: "10px",
        
    },
    userBackground: {
        
        marginTop: "0px",
    },
    fixedBox: {
        overflow: "scroll",
        maxHeight: "400px"
    }

}))
const UsersBox = ({users,history}) => {
    if(!users){
        users = [];
    }
    //user also gives user._id
    const classes = useStyles();
    return(
    <div className = {classes.box}>
        
            <div className = {classes.userContainer}>Registered Users</div>
            
    
            <div className = {classes.fixedBox}>
            {
       
       users.map(user => (
           <div>
           <div className = {classes.userDetails}>
               <Typography variant = 'subtitle1' 
               onClick = {
                   () => history.push(`/user/${user._id}`)}
                style = {{cursor: "pointer"}}   
                >
                   {user.name}
                </Typography>
               <Typography variant = 'caption'>{user.email}</Typography>
            </div>
           <hr />
           </div>
          
       ))
   }
            </div>
    
    </div>
    
    
  
    
    )
}

export default withRouter(UsersBox);