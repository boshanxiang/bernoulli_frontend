import {Component} from 'react';

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
      director_relations: []

      
    }

    this.getLegalEntities = this.getLegalEntities.bind(this)
    this.getNaturalPersons = this.getNaturalPersons.bind(this)
  }

  getLegalEntities() {
    fetch(baseURL + 'legalentities')
      .then(data => {return data.json()}, err => console.log(err))
      .then(parsedData => {this.setState({legal_entities: parsedData})}, err => console.log(err))
      .catch((e) => console.log(e.message))
  }

  getNaturalPersons() {
    fetch(baseURL + 'naturalpersons')
      .then(data => {return data.json()}, err => console.log(err))
      .then(parsedData => {this.setState({natural_persons: parsedData})}, err => console.log(err))
      .catch((e) => console.log(e.message))
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            1
          </li>
          <li>
            2
          </li>
          <li>
            3
          </li>
        </ul>

      </div>
    )
  }
}

export default App;
