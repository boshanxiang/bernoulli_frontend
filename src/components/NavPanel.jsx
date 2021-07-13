import {Component} from 'react'
import axios from 'axios';

import "./styles.css";
import { AllRecordsContext } from './RecordsContext';
import ShowBox from './ShowBox';
import EditBox from './EditBox';
import CreateBox from './CreateBox';
import RelationalCreate from './RelationalCreate';

const baseURL = (
    (process.env.REACT_APP_ENVIRO) ?
  
        'http://bernoullibackend.herokuapp.com'
        :
        'http://localhost:8000'
  
  );  

class NavPanel extends Component {

    static contextType = AllRecordsContext

    constructor(props) {
        super(props)

        this.state = {
            viewCreate: false,
            viewEdit: false,
        }
    }

    static contextType = AllRecordsContext

    // Functions to toggle panel shows

    toggleCreate = () => {
        this.setState({viewCreate: true, viewEdit: false})
    }

    toggleEdit = () => {
        this.setState({viewEdit: true, viewCreate: false})
    }

    // Function to delete db record

    deleteRecord(record) {
        let recordType = 'naturalpersons'
        if(record.entity_name) {
        recordType = 'legalentities'
        }
        axios
        .delete(`${baseURL}/${recordType}/${record.id}/`)
        .then((res) => this.props.handleDeleteRecord(record))
    }

    render() {
        
        return (
        <div className="list_container">
            <ShowBox />
            <button onClick={() => this.toggleCreate()}>New Entry</button>
            {(this.context.shown_record.entity_name || this.context.shown_record.full_name) ?
                <div>
                    <button onClick={() => this.toggleEdit()}>Edit Entry</button>
                    <button onClick={
                        () => {
                            this.deleteRecord(this.context.shown_record);
                            this.props.clearShownRecord();
                            console.log("You clicked on Delete!")
                        }}
                    >*Delete Entry*</button>
                </div>
                :
                <></>
            }
            {(this.state.viewEdit) ? 
                <EditBox
                    handleUpdateRecord={this.props.handleUpdateRecord}
                    updateShownRecord={this.props.updateShownRecord}
                />
                :
                (
                    (this.state.viewCreate) ? 
                        <CreateBox handleAddRecord={this.props.handleAddRecord} />
                        :
                        <></>
                )
            }
            {
                (this.context.show_relational_create) ?
                    <RelationalCreate
                        record1 = {this.context.dropzone_record}
                        record2 = {this.context.draggable_record}
                        handleAddRelationalRecord = {this.props.handleAddRelationalRecord}
                    />
                    :
                    <></>
            }
        </div>
        )
    }
}

export default NavPanel