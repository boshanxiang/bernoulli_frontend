import {Component} from 'react'
import { AllRecordsContext } from './RecordsContext';
import "./styles.css";

class ShowBox extends Component {

    static contextType = AllRecordsContext

    render() {
        
        return (
        <div>
            {(this.context.shown_record.entity_name || this.context.shown_record.full_name) ?
                <div>
                    <h3>Selected Entry</h3>
                    <h2>{this.context.shown_record.entity_name || this.context.shown_record.full_name}</h2>
                    {(this.context.shown_record.entity_name) ?
                        <p> Entity Type: {this.context.shown_record.entity_type} </p>
                        :
                        <></>
                    }
                    {(this.context.shown_record.state_of_formation) ?
                        <p> State of Formation: {this.context.shown_record.state_of_formation} </p>
                        :
                        ((this.context.shown_record.residency_state) ?
                            <p> Residency State: {this.context.shown_record.residency_state} </p>
                        :
                        <></>)
                    }
                </div>
                :
                <></>
            }
        </div>
        )
    }
}

export default ShowBox