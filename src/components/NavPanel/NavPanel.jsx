import {Component} from 'react'
import "../styles.css";
import { AllRecordsContext } from '../Context/RecordsContext';
import ShowBox from '../ShowBox/ShowBox';
import EditBox from '../EditBox/EditBox';
import CreateBox from '../CreateBox/CreateBox';

class NavPanel extends Component {

    constructor(props) {
        super(props)

        this.state = {
            viewCreate: false,
            viewEdit: false,
        }
    }

    static contextType = AllRecordsContext

    toggleCreate = () => {
        this.setState({viewCreate: true, viewEdit: false})
    }

    toggleEdit = () => {
        this.setState({viewEdit: true, viewCreate: false})
    }
    
    // FUNCTION FOR DELETING
    deleteEntry = (entry) => {
        return
    }

    render() {
        
        return (
        <div className="list_container">
            <ShowBox />
            <button onClick={this.toggleCreate}>New Entry</button>
            {(this.context.shown_record.entity_name || this.context.shown_record.full_name) ?
                <span>
                    <button onClick={this.toggleEdit}>Edit Entry</button>
                    <button onClick={this.deleteEntry}>*Delete Entry*</button>
                </span>
                :
                <></>
            }
            {(this.state.viewEdit) ? 
                <EditBox />
                :
                (
                    (this.state.viewCreate) ? 
                        <CreateBox />
                        :
                        <></>
                )
            }
        </div>
        )
    }
}

export default NavPanel