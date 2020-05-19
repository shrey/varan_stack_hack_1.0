import React from 'react';
import axios from 'axios'
import UserRegister from '../user-register-and-preview/user-register-and-preview.component'
import {withRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import {setName} from '../../redux/single-event/single-event.actions';
import {selectAdminPresent} from '../../redux/admin/admin.selector'
import {createStructuredSelector} from 'reselect';
class EventPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            event: {}
        }
    }
    
    async componentDidMount(){
        const {match} = this.props;
        const {setName} = this.props;
        axios({
            method: 'get',
            url: `/event/${match.params.id}`
        }).then(response => {
            this.setState({event: response.data})
            alert("Successful Request");
            console.log(this.state);
            const {name} = response.data;
            setName(name);
        }).catch(error => {
            console.log(error);
            alert("Error Occured");
        })
    }
    
    render(){
        const {isAdmin} = this.props;
        const {event} = this.state
        const {name,_id,description,image,location,likes} = event;
        const {match,history} = this.props
        console.log(match);
        const handleDelete = () => {
            axios({
                method: 'get',
                url: `/event/delete/${match.params.id}`,
                
            }).then(response => {
                alert('Deleted the page')

            }).catch(error => {
                alert("Some error occured while deleting")
            })
        }
        return(
            <div>

                Event page
                <button onClick = {() => history.push(`${match.url}/register`)}>Register</button>
                {
                    isAdmin ? (
                        <button onClick = {handleDelete}>Delete</button>
                    ):(
                        null
                    )
                }
                
            </div>
            
        )
    }
}
const mapStateToProps = createStructuredSelector({
    isAdmin: selectAdminPresent
})
const mapDispatchToProps = dispatch => ({
    setName: (name) => dispatch(setName(name))
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(EventPage));