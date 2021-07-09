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
                <h3>Create a new entry</h3>
                <label>
                    Entity
                    <input type="radio" name="entity" onClick={() => this.setState({entity: true})}/>
                    Person
                    <input type="radio" name="entity" onClick={() => this.setState({entity: false})}/>
                </label>
                <form onSubmit = {this.handleSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name" onChange={ this.handleChange } value={ this.state.name } placeholder="name of person" />
                    <br/>
                    <label htmlFor="state">State: </label>
                    <input type="text" id="state" name="state" onChange={ this.handleChange } value={ this.state.state } placeholder="residency/jurisdictional state" />
                    <br/>
                    {(this.state.entity) ?
                        <div>
                            <label htmlFor="entitytype">Entity Type</label>
                            <input type="text" id="entitytype" name="entitytype" onChange={ this.handleChange } value={ this.state.entitype } placeholder="entity type" />
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