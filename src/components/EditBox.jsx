import {Component} from 'react'
import axios from 'axios';

import { AllRecordsContext } from './RecordsContext';
import { getCurrentDate } from './CurrentDate';

import "./styles.css";

const baseURL = (
    (process.env.NODE_ENV) ?
        'http://localhost:8000'
        :
        'http://bernoullibackend.herokuapp.com'
);

class CreateBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entity: null,
            id: '',
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
        if(this.context.shown_record.entity_name){
            this.setState({
                id: this.context.shown_record.id,
                entity: true,
                name: this.context.shown_record.entity_name,
                state: this.context.shown_record.state_of_formation,
                entitytype: this.context.shown_record.entity_type,
                last_updated: getCurrentDate(),

            })
        } else if(this.context.shown_record.full_name){
            this.setState({
                id: this.context.shown_record.id,
                entity: false,
                name: this.context.shown_record.full_name,
                state: this.context.shown_record.residency_state,
                last_updated: getCurrentDate(),
                
            })
        } else {
            return
        }
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
        .put(
          `${baseURL}/${recordType}/${this.context.shown_record.id}/`,
          postObject,
          {headers: {
            'Content-Type': 'application/json'
          }}
        )
        .then((res) => {
            this.props.handleUpdateRecord(res.data);
            this.props.updateShownRecord(res.data)
        })

        // event.preventDefault()
        // fetch(baseURL + `${this.state.entity}`, {
        //   method: 'POST',
        //   body: JSON.stringify({ name: this.state.name }),
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // }).then(res => res.json())
        //   .then(resJson => {
        //     this.props.handleAddHoliday(resJson)
        //     this.setState({
        //       name: ''
        //     })
        //   })
        //   .catch(error => console.log({ 'Error': error }))
    }

    render() {
        
        return (
            <div>
                <h3>Edit the above entry</h3>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                        Entity
                        {(this.state.entity) ? 
                            <input type="radio" id="entity" name="entity" onClick={() => this.setState({entity: true})} defaultChecked />
                            :
                            <input type="radio" id="entity" name="entity" onClick={() => this.setState({entity: true})} />
                        }
                        Person
                        {(this.state.entity) ? 
                            <input type="radio" id="entity" name="entity" onClick={() => this.setState({entity: false})} />
                            :
                            <input type="radio" id="entity" name="entity" onClick={() => this.setState({entity: false})} defaultChecked/>
                        }
                    </label>
                    <br/>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name" onChange={ this.handleChange } value={ this.state.name } value={this.state.name} />
                    <br/>
                    <label htmlFor="state">State: </label>
                    <input type="text" id="state" name="state" onChange={ this.handleChange } value={ this.state.state } value={this.state.state}/>
                    <br/>
                    {(this.state.entity) ?
                        <div>
                            <label htmlFor="entitytype">Entity Type</label>
                            <input type="text" id="entitytype" name="entitytype" onChange={ this.handleChange } value={ this.state.entitytype }/>
                            <br/>
                        </div>
                        :
                        <></>
                    }
                    <label htmlFor="last_updated">Last updated (YYYY-MM-DD):</label>
                    <input type="text" id="last_updated" name="last_updated" onChange={ this.handleChange } value={ this.state.last_updated } value={this.state.last_updated}/>
                    <br/>
                    <input type="submit" value="Update Entity/Person" />
                </form>
            </div>
        )
    }
}

export default CreateBox