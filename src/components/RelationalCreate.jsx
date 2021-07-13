import {Component} from 'react'
import { getCurrentDate } from './CurrentDate'
import { AllRecordsContext } from './RecordsContext'
import axios from 'axios'

const baseURL = (
    (process.env.NODE_ENV === 'production') ?
  
        'http://bernoullibackend.herokuapp.com'
        :
        'http://localhost:8000'
  
  );

class RelationalCreate extends Component {
    
    static contextType = AllRecordsContext

    constructor(props) {
        super(props)
        this.state = {
            recordType: '',
            last_updated: '',
            issuing_entity: {}
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }

    componentDidMount() {
        this.setState({last_updated: getCurrentDate()})
    }

    handleChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
    }

    handleSubmit(event) {

        let postObject;

        if (this.state.recordType === 'equitytokens') {
            postObject = {
                issuing_entity: this.state.issuing_entity,
                equity_class_type: this.state.equity_class_type,
                natural_person_holder: this.state.natural_person_holder,
                legal_entity_holder: this.state.legal_entity_holder,
                number_issued: this.state.number_issued,
                date_of_issuance: this.state.date_of_issuance,
                previous_records: {},
            }
        } else if (this.state.recordType === 'employmentrelations') {
            postObject = {
                employer: this.state.employer,
                employee: this.state.employee,
                position: this.state.employee,
                start_date: this.state.start_date,
                term: this.state.term,
                pay: this.state.pay,
                at_will: this.state.at_will,
                at_will_exceptions: this.state.at_will_exceptions,
                incentive_equity_award: this.state.incentive_equity_award,
                previous_records: {},
            }
        } else if (this.state.recordType === 'officerrelations') {
            postObject = {
                // full_name: this.state.name,
                // residency_state: this.state.state,
                // last_updated: this.state.last_updated,
            }

        } else if (this.state.recordType === 'directorrelations') {
            postObject = {
                // full_name: this.state.name,
                // residency_state: this.state.state,
                // last_updated: this.state.last_updated,
            }
        }

        axios
        .post(
            `${baseURL}/${this.state.recordType}/`,
            postObject,
            {headers: {
            'Content-Type': 'application/json'
            }}
        )
        .then((res) => this.props.handleAddRelationalRecord(res.data))
    }

    returnForm() {
        if (this.state.recordType === 'equitytokens') {
            return(
                <div>
                    {/* <label htmlFor="issuing_entity">Issuing Entity</label>
                    <select id="issuing_entity" name="issuing_entity">
                        {this.context.legal_entities.map(legal_entity) => {
                            <option value={legal_entity.entity_name}>{legal_entity.entity_name}</option>
                        }}
                    </select> */}
                    <label htmlFor="what_equity">What equity?</label>
                    <select id="what_equity" name="what_equity">
                        {this.context.equity_classes.map((equity_class_type) => {
                            axios
                            .get(
                                `${equity_class_type.issuing_entity}`
                            )
                            .then((res) => {
                                console.log("res is: ", res.data);
                                this.setState({issuing_entity: res.data}, () => {
                                    return(
                                        <option value={`${this.state.issuing_entity.entity_name} ${equity_class_type.equity_class_type}`}>{`${this.state.issuing_entity.entity_name} ${equity_class_type.equity_class_type}`}</option>
                                    )
                                })
                            })
                        })}
                    </select>

                </div>
                )}
            }

    //             issuing_entity: this.state.issuing_entity,
    //             equity_class_type: this.state.equity_class_type,
    //             natural_person_holder: this.state.natural_person_holder,
    //             legal_entity_holder: this.state.legal_entity_holder,
    //             number_issued: this.state.number_issued,
    //             date_of_issuance: this.state.date_of_issuance,
    //             previous_records: {},
    //         }
    //         )
    //     } else if (this.state.recordType === 'employmentrelations') {
    //         postObject = {
    //             employer: this.state.employer,
    //             employee: this.state.employee,
    //             position: this.state.employee,
    //             start_date: this.state.start_date,
    //             term: this.state.term,
    //             pay: this.state.pay,
    //             at_will: this.state.at_will,
    //             at_will_exceptions: this.state.at_will_exceptions,
    //             incentive_equity_award: this.state.incentive_equity_award,
    //             previous_records: {},
    //         }
    //     } else if (this.state.recordType === 'officerrelations') {
    //         postObject = {
    //             // full_name: this.state.name,
    //             // residency_state: this.state.state,
    //             // last_updated: this.state.last_updated,
    //         }

    //     } else if (this.state.recordType === 'directorrelations') {
    //         postObject = {
    //             // full_name: this.state.name,
    //             // residency_state: this.state.state,
    //             // last_updated: this.state.last_updated,
    //         }
    //     }
    // }
    render() {
        
        return (
            <div>
                <h3>Create a new relational entry</h3>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                        Equity Issuance
                        <input type="radio" name="recordType" id="recordType" onClick={() => this.setState({recordType: 'equitytokens'})} required/>
                        Employment
                        <input type="radio" name="recordType" id="recordType" onClick={() => this.setState({recordType: 'employmentrelations'})} required/>
                        Officer
                        <input type="radio" name="recordType" id="recordType" onClick={() => this.setState({recordType: 'officerrelations'})} required/>
                        Director
                        <input type="radio" name="recordType" id="recordType" onClick={() => this.setState({recordType: 'directorrelations'})} required/>
                    </label>
                    <br/>
                    {
                        this.returnForm()
                    }
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

export default RelationalCreate