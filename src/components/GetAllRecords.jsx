import {Component} from 'react'
import { AllRecordsContext } from './RecordsContext'

class GetAllRecords extends Component {
    render() {
        return(
            <AllRecordsContext.Consumer>
                {value => 
                    <button onClick = {() => value.getAllRecords()}>
                        Retrieve latest Records
                    </button>
                }
            </AllRecordsContext.Consumer>
        )
    }
}

export default GetAllRecords
