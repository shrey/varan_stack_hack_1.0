import React from 'react';
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import EventContent from '../../components/events-collection-content/events-collection-content.component'
class CollectionPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            eventCollections: []
        }

    }
    async componentDidMount() {
        axios({
            method: 'get',
            url: '/home',

        }).then(response => {
            this.setState({eventCollections: response.data})
            console.log(this.state);
            console.log('Fetched data')
        })
        .catch(error => {
            console.log(error)
            alert("couldn't fetch data")
        })
    }     
    render(){
        const{eventCollections} = this.state;
        return(
            <div>
            <Grid container>
                <Grid item xs={false} sm={2} />
                <Grid item xs={12} sm={8}>
                    <EventContent events = {eventCollections}/>
                </Grid>

                <Grid item xs={false} sm={2} />

            </Grid>
            
            </div>
        )
    }
}
export default CollectionPage;