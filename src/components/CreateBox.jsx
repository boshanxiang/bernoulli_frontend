import {Component} from 'react'
import axios from 'axios';

import { AllRecordsContext } from './RecordsContext';
import { getCurrentDate } from './CurrentDate';

import "./styles.css";

import baseURL from './BaseURLs'

class CreateBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entity: null,
            name: '',
            state: '',
            entitytype: '',
            last_updated: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }
    static contextType = AllRecordsContext

    componentDidMount() {
        this.setState({last_updated: getCurrentDate()})
    }

    handleChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
    }

    handleSubmit(event) {

        let postObject;
        let recordType;

        if(this.state.entity === true) {
            recordType = 'legalentities';

            postObject = {
                entity_name: this.state.name,
                entity_type: this.state.entitytype,
                state_of_formation: this.state.state,
                last_updated: this.state.last_updated,
            }
        } else if (this.state.entity === false) {
            recordType = 'naturalpersons';

            postObject = {
                full_name: this.state.name,
                residency_state: this.state.state,
                last_updated: this.state.last_updated,
            }
        }

        axios
        .post(
          `${baseURL}/${recordType}/`,
          postObject,
          {headers: {
            'Content-Type': 'application/json'
          }}
        )
        .then((res) => this.props.handleAddRecord(res.data))
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
                    <label htmlFor="last_updated">Last updated (YYYY-MM-DD):</label>
                    <input type="text" id="last_updated" name="last_updated" onChange={ this.handleChange } value={ this.state.last_updated } value={this.state.last_updated}/>
                    <br/>
                    <input type="submit" value="Create Entity/Person" />
                </form>
            </div>
        )
    }
}

export default CreateBox