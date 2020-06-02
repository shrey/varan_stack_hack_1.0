import React from 'react';
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import EventContent from '../../components/events-collection-content/events-collection-content.component'
import {Container} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {turnLoadingOn, turnLoadingOff} from '../../redux/single-event/single-event.actions'
import {connect} from 'react-redux'
class CollectionPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            eventCollections: []
        }

    }

    async componentDidMount() {
        const {turnLoadingOff, turnLoadingOn} = this.props;
        turnLoadingOn();
        axios({
            method: 'get',
            url: '/home',

        }).then(response => {
            this.setState({eventCollections: response.data})
            console.log(this.state);
            console.log('Fetched data')
            turnLoadingOff();
        })
        .catch(error => {
            console.log(error)
            alert("couldn't fetch data")
            turnLoadingOff();
        })
    }

    render(){
        const{eventCollections} = this.state;

        return(
            <div>
                 <Container  maxWidth="md">
                    <EventContent events = {eventCollections}/>
                 </Container>



            </div>


        )
    }
}
const mapDispatchToProps = dispatch => ({
    turnLoadingOn: () => dispatch(turnLoadingOn()),
    turnLoadingOff: () => dispatch(turnLoadingOff())
})
export default connect(null, mapDispatchToProps)(CollectionPage);