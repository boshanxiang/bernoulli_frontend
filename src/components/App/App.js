// Import libraries
import {Component} from 'react'; //React
import axios from 'axios'; //Axios

// Import Components
import Sandbox from '../Sandbox/Sandbox' //Main interactable panel on right side
import NavPanel from '../NavPanel/NavPanel' //Main panel for CRUD operations
import GetAllRecords from '../GetAllRecords/GetAllRecords'; //Button for refreshing all records

// Import Context
import { AllRecordsContext } from '../Context/RecordsContext'; //Context

// Import CSS
import '../styles.css' //Styles repository

const baseURL = 'http://localhost:8000/'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      legal_entities: [],
      natural_persons: [],
      equity_classes: [],
      equity_tokens: [],
      employment_relations: [],
      officer_relations: [],
      director_relations: [],

      shown_record: {},

      ownership_lines: [],
      employment_lines: [],
      officer_lines: [],
      director_lines: [],
    }
    
    this.handleAddRecord = this.handleAddRecord.bind(this)
    this.handleUpdateRecord = this.handleUpdateRecord.bind(this)
    this.handleDeleteRecord = this.handleDeleteRecord.bind(this)
  }

  // Backend Axios API functions

  getLegalEntities = () => {
    axios
      .get(baseURL + 'legalentities/')
      .then((res) => this.setState({legal_entities: res.data}))
      .catch((err) => console.log(err));
  }

  getNaturalPersons = () => {
    axios
    .get(baseURL + 'naturalpersons/')
    .then((res) => this.setState({natural_persons: res.data}))
    .catch((err) => console.log(err));
  }

  getEquityClasses = () => {
    axios
    .get(baseURL + 'equityclasses/')
    .then((res) => this.setState({equity_classes: res.data}))
    .catch((err) => console.log(err));
  }

  getEquityTokens = () => {
    axios
    .get(baseURL + 'equitytokens/')
    .then((res) => this.setState({equity_tokens: res.data}))
    .catch((err) => console.log(err));
  }

  getEmploymentRelations = () => {
    axios
    .get(baseURL + 'employmentrelations/')
    .then((res) => this.setState({employment_relations: res.data}))
    .catch((err) => console.log(err));
  }

  getOfficerRelations = () => {
    axios
    .get(baseURL + 'directorrelations/')
    .then((res) => this.setState({director_relations: res.data}))
    .catch((err) => console.log(err));
  }

  getDirectorRelations = () => {
    axios
    .get(baseURL + 'employmentrelations/')
    .then((res) => this.setState({employment_relations: res.data}))
    .catch((err) => console.log(err));
  }

  getAllRecords = () => {
      this.getLegalEntities()
      this.getNaturalPersons()
      this.getEquityClasses()
      this.getEquityTokens()
      this.getEmploymentRelations()
      this.getOfficerRelations()
      this.getDirectorRelations()
  }

  
  // State management functions

  updateShownRecord = (record) => {
    this.setState({shown_record: record})
  }

  clearShownRecord = () => {
    this.setState({shown_record: {} })
  }

  handleAddRecord(record) {
    console.log("record: ", record)
    console.log("typeOf Record: ", record)
    if(record.entity_name){
      let copyLegalEntities = this.state.legal_entities
      let revisedLegalEntities = [...copyLegalEntities, record]
      this.setState({legal_entities: revisedLegalEntities})

    } else if(record.full_name) {
      let copyNaturalPersons = this.state.natural_persons
      let revisedNaturalPersons = [...copyNaturalPersons, record]
      this.setState({natural_persons: revisedNaturalPersons})
    }
  }

  handleUpdateRecord(record) {
    if(record.entity_name){
      let updatedLegalEntities = this.state.legal_entities;
      let findIndex = updatedLegalEntities.findIndex((legal_entity) => {
        return legal_entity.id === record.id
      });
      updatedLegalEntities[findIndex] = record;
      this.setState({legal_entities: updatedLegalEntities})

    } else if(record.full_name) {
      let updatedNaturalPersons = this.state.natural_persons;
      let findIndex = updatedNaturalPersons.findIndex((natural_person) => {
        return natural_person.id === record.id
      });
      updatedNaturalPersons[findIndex] = record;
      this.setState({natural_persons: updatedNaturalPersons})
    }
  }

  handleDeleteRecord(record) {
    if(record.entity_name){
      let prunedLegalEntities = this.state.legal_entities.filter((legal_entity) => {
        return legal_entity.id !== record.id
      })
      this.setState({legal_entities: prunedLegalEntities})

    } else if(record.full_name) {
      let prunedNaturalPersons = this.state.natural_persons.filter((natural_person) => {
        return natural_person.id !== record.id
      })
      this.setState({natural_persons: prunedNaturalPersons})
    }
  }

  populateOwnershipLines = () => {
    let linesArray = [];
    // 
    this.setState({ownership_lines: linesArray})
  }

  populateEmploymentLines = () => {
    let linesArray = [];
    // 
    this.setState({employment_lines: linesArray})
  }

  populateOfficerLines = () => {
    let linesArray = [];
    // 
    this.setState({officer_lines: linesArray})
  }

  populateDirectorLines = () => {
    let linesArray = [];
    // 
    this.setState({director_lines: linesArray})
  }

  getAllLines = () => {
    this.populateOwnershipLines();
    this.populateEmploymentLines();
    this.populateOfficerLines();
    this.populateDirectorLines();
  }

  componentDidMount = () => {
    this.getAllRecords();
    this.getAllLines();
  }

  render() {

    return (
      <AllRecordsContext.Provider
          value={{
            // state entries corresponding with database

            legal_entities: this.state.legal_entities,
            natural_persons: this.state.natural_persons,
            equity_classes: this.state.equity_classes,
            equity_tokens: this.state.equity_tokens,
            employment_relations: this.state.employment_relations,
            officer_relations: this.state.officer_relations,
            director_relations: this.state.director_relations,
            getAllRecords: this.getAllRecords,

            // state entry for NavPanel shown record

            shown_record: this.state.shown_record,
            updateShownRecord: (record) => this.updateShownRecord(record),

            // state entries for lines rendering
            ownership_lines: this.state.ownership_lines,
            employment_lines: this.state.employment_lines,
            officer_lines: this.state.officer_lines,
            director_lines: this.state.director_lines,
            populateOwnershipLines: () => this.populateOwnershipLines(),
            populateEmploymentLines: () => this.populateEmploymentLines(),
            populateOfficerLines: () => this.populateOfficerLines(),
            populateDirectorLines: () => this.populateDirectorLines(),
          }}
          >
          <div className="App">
            <NavPanel
              handleAddRecord={this.handleAddRecord}
              handleUpdateRecord={this.handleUpdateRecord}
              handleDeleteRecord={this.handleDeleteRecord}
              updateShownRecord={this.updateShownRecord}
              clearShownRecord={this.clearShownRecord}
            />
            <Sandbox/>
          </div>
      </AllRecordsContext.Provider>
    )
  }
}

export default App;
