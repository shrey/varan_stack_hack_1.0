import React from 'react';
import {withRouter} from 'react-router-dom'
const EventCard = ({event,history}) => {
    
    const {name, image, location, _id} = event;
    return(
        <div onClick = {() => history.push(`event/${_id}`)}>
            <div>{name}</div>
            <div>{image}</div>
            <div>{location}</div>
            <div>{_id}</div>
        </div>
    )
}
export default withRouter(EventCard);