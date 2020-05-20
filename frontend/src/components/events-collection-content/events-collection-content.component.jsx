import React from 'react';
import Grid from '@material-ui/core/Grid'
import EventCard from '../event-card/event-card.component'
import {Paper, Container} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

function EventContent(props){
    const {events} = props;
    
    return(
        
        <Grid container spacing={4}>
            {
                events.map(event => (
                    <Grid item key = {event._id} xs = {12} sm = {6} md = {4}>
                        <EventCard event = {event} />
                    </Grid>
                ))
            }
        </Grid>
           
        
        
    )
}
export default EventContent;