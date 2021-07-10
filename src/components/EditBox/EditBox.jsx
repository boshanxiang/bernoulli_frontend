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

    componentDidMount() {
        if(this.context.shown_record.entity_name){
            this.setState({
                entity: true,
                name: this.context.shown_record.entity_name,
                state: this.context.shown_record.state_of_formation,
                entitytype: this.context.shown_record.entity_type
            })
        } else if(this.context.shown_record.full_name){
            this.setState({
                entity: false,
                name: this.context.shown_record.full_name,
                state: this.context.shown_record.residency_state
            })
        } else {
            return
        }
    }

    handleChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
    }

    handleSubmit(event) {
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
                            <input type="radio" id="entity" name="entity" onClick={() => this.setState({entity: true})} checked />
                            :
                            <input type="radio" id="entity" name="entity" onClick={() => this.setState({entity: true})} />
                        }
                        Person
                        {(this.state.entity) ? 
                            <input type="radio" id="entity" name="entity" onClick={() => this.setState({entity: false})} />
                            :
                            <input type="radio" id="entity" name="entity" onClick={() => this.setState({entity: false})} checked/>
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
                    <input type="submit" value="Create Entity/Person" />
                </form>
            </div>
        )
    }
}

export default CreateBox