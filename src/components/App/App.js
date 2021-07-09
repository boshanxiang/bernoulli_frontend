import {Component} from 'react';
import Sandbox from '../Sandbox/Sandbox'
import NavPanel from '../NavPanel/NavPanel'
import { AllRecordsContext } from '../Context/RecordsContext';
import GetAllRecords from '../GetAllRecords/GetAllRecords';
import '../styles.css'

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
      shown_record: {}
    }
  }

  getLegalEntities = () => {
    fetch(baseURL + 'legalentities')
      .then(data => {return data.json()}, err => console.log(err))
      .then(parsedData =>
          this.setState({legal_entities: parsedData}), err => console.log(err))
      .catch((e) => console.log(e.message))
  }

  getNaturalPersons = () => {
  fetch(baseURL + 'naturalpersons')
      .then(data => {return data.json()}, err => console.log(err))
      .then(parsedData =>
          this.setState({natural_persons: parsedData}), err => console.log(err))
      .catch((e) => console.log(e.message))
  }

  getEquityClasses = () => {
  fetch(baseURL + 'equityclasses')
      .then(data => {return data.json()}, err => console.log(err))
      .then(parsedData =>
          this.setState({equity_classes: parsedData}), err => console.log(err))
      .catch((e) => console.log(e.message))
  }

  getEquityTokens = () => {
  fetch(baseURL + 'equitytokens')
      .then(data => {return data.json()}, err => console.log(err))
      .then(parsedData =>
          this.setState({equity_tokens: parsedData}), err => console.log(err))
      .catch((e) => console.log(e.message))
  }

  getEmploymentRelations = () => {
  fetch(baseURL + 'employmentrelations')
      .then(data => {return data.json()}, err => console.log(err))
      .then(parsedData =>
          this.setState({employment_relations: parsedData}), err => console.log(err))
      .catch((e) => console.log(e.message))
  }

  getOfficerRelations = () => {
  fetch(baseURL + 'directorrelations')
      .then(data => {return data.json()}, err => console.log(err))
      .then(parsedData =>
          this.setState({officer_relations: parsedData}), err => console.log(err))
      .catch((e) => console.log(e.message))
  }

  getDirectorRelations = () => {
  fetch(baseURL + 'employmentrelations')
      .then(data => {return data.json()}, err => console.log(err))
      .then(parsedData =>
          this.setState({director_relations: parsedData}), err => console.log(err))
      .catch((e) => console.log(e.message))
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

  updateShownRecord = (record) => {
    this.setState({shown_record: record})
  }

  componentDidMount = () => {
    this.getAllRecords();
  }

  render() {

    return (
      <AllRecordsContext.Provider
          value={{
            legal_entities: this.state.legal_entities,
            natural_persons: this.state.natural_persons,
            equity_classes: this.state.equity_classes,
            equity_tokens: this.state.equity_tokens,
            employment_relations: this.state.employment_relations,
            officer_relations: this.state.officer_relations,
            director_relations: this.state.director_relations,
            shown_record: this.state.shown_record,
            getAllRecords: this.getAllRecords,
            updateShownRecord: (record) => this.updateShownRecord(record),
          }}>
          <div className="App">
            <NavPanel/>
            <Sandbox/>
          </div>
      </AllRecordsContext.Provider>
    )
  }
}

export default App;
