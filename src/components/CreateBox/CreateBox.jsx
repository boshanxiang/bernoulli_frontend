import {Component} from 'react'
import { AllRecordsContext } from '../Context/RecordsContext';
import "../styles.css";

const baseURL = 'http://localhost:8000/'

class CreateBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entity: null,
            name: '',
            state: '',
            entitytype: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }
    static contextType = AllRecordsContext

    handleChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
    }

    handleSubmit(event) {
        event.preventDefault()

        let recordType;
        let postObject;
        if(this.state.entity == true) {
            recordType = 'legalentities'
            postObject = {
                entity_name: this.state.name,
                entity_type: this.state.entitytype,
                state_of_formation: this.state.state,
            }
        } else if (this.state.entity == false) {
            recordType = 'naturalpersons'
            postObject = {
                full_name: this.state.name,
                residency_state: this.state.state,
            }
        }

        fetch(baseURL + recordType, {
          method: 'POST',
          body: JSON.stringify(postObject),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(resJson => {
            this.props.handleAddRecord(resJson)
            this.setState({
                entity: null,
                name: '',
                state: '',
                entitytype: ''
            })
          })
          .catch(error => console.log({ 'Error': error }))
    }

    render() {
        
        return (
            <div>
                <h3>Create a new entry</h3>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                        Entity
                        <input type="radio" name="entity" id="entity" onClick={() => this.setState({entity: true})} required/>
                        Person
                        <input type="radio" name="entity" id="entity" onClick={() => this.setState({entity: false})} required/>
                    </label>
                    <br/>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name" onChange={ this.handleChange } value={ this.state.name } placeholder="name of legal person/entity" required/>
                    <br/>
                    <label htmlFor="state">State: </label>
                    <input type="text" id="state" name="state" onChange={ this.handleChange } value={ this.state.state } placeholder="residency/jurisdictional state" required/>
                    <br/>
                    {(this.state.entity) ?
                        <div>
                            <label htmlFor="entitytype">Entity Type</label>
                            <input type="text" id="entitytype" name="entitytype" onChange={ this.handleChange } value={ this.state.entitytype } placeholder="entity type" required/>
                            <br/>
                        </div>
                        :
                        <></>
                    }
                    <input type="submit" value="Create Entity/Person" />
                </form>
            </div>
        )
    }
}

export default CreateBox