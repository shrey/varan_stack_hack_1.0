import React from 'react';
import Grid from '@material-ui/core/Grid'
import EventCard from '../event-card/event-card.component'
function EventContent(props){
    const {events} = props;
    return(
        <Grid container spacing = {2}>
            {
                events.map(event => (
                    <span key = {event._id}>
                    <Grid item sm = {4} xs = {12} key = {event._id}>
                        <EventCard key = {event._id} event = {event} />
                    </Grid>>
                    </span>
                    
                    
                ))
            }
        </Grid>
    )
}
export default EventContent;