import {Component} from 'react';
import Interactable from './components/interactables'

const baseURL = 'http://localhost:8000/'

const draggableOptions = {
  onmove: event => {
    const target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform =
      "translate(" + x + "px, " + y + "px)";

    // update the posiion attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }
};


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

      droppedItems: []

    }

    this.getLegalEntities = this.getLegalEntities.bind(this)
    this.getNaturalPersons = this.getNaturalPersons.bind(this)
    this.getEquityClasses = this.getEquityClasses.bind(this)
    this.getEquityTokens = this.getEquityTokens.bind(this)
    this.getEmploymentRelations = this.getEmploymentRelations.bind(this)
    this.getOfficerRelations = this.getOfficerRelations.bind(this)
    this.getDirectorRelations = this.getDirectorRelations.bind(this)

    this.handleDrop = this.handleDrop.bind(this);

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

  getEquityClasses() {
    fetch(baseURL + 'equityclasses')
      .then(data => {return data.json()}, err => console.log(err))
      .then(parsedData => {this.setState({equity_classes: parsedData})}, err => console.log(err))
      .catch((e) => console.log(e.message))
  }


  getEquityTokens() {
    fetch(baseURL + 'equitytokens')
      .then(data => {return data.json()}, err => console.log(err))
      .then(parsedData => {this.setState({equity_tokens: parsedData})}, err => console.log(err))
      .catch((e) => console.log(e.message))
  }


  getEmploymentRelations() {
    fetch(baseURL + 'employmentrelations')
      .then(data => {return data.json()}, err => console.log(err))
      .then(parsedData => {this.setState({employment_relations: parsedData})}, err => console.log(err))
      .catch((e) => console.log(e.message))
  }

  getOfficerRelations() {
    fetch(baseURL + 'directorrelations')
      .then(data => {return data.json()}, err => console.log(err))
      .then(parsedData => {this.setState({director_relations: parsedData})}, err => console.log(err))
      .catch((e) => console.log(e.message))
  }

  getDirectorRelations() {
    fetch(baseURL + 'employmentrelations')
      .then(data => {return data.json()}, err => console.log(err))
      .then(parsedData => {this.setState({employment_relations: parsedData})}, err => console.log(err))
      .catch((e) => console.log(e.message))
  }

  componentDidMount() {
    this.getLegalEntities()
    this.getNaturalPersons()
    this.getEquityClasses()
    this.getEquityTokens()
    this.getEmploymentRelations()
    this.getOfficerRelations()
    this.getDirectorRelations()
  }

  handleDrop(event) {
    console.log("DROP", event);
  }

  render() {

    const that = this;

    return (
      <div>
        
        <Interactable draggable={true} draggableOptions={draggableOptions}>
          <div className="draggable drag-item">
            <p>Drag Item 1</p>
          </div>
        </Interactable>
      </div>
    )
  }
}

export default App;
