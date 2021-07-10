import {Component} from 'react';
import Interactable from '../Interactables/Interactables';
import {draggableOptions, resizableOptions} from '../Interactables/Interactables';
import { AllRecordsContext } from '../Context/RecordsContext';
import GetAllRecords from '../GetAllRecords/GetAllRecords';
import Lines from '../Lines/Lines';

// import "../styles.css";

class Sandbox extends Component {

  static contextType = AllRecordsContext

  constructor(props) {
    super(props)
    this.state = {
      lines: [],
      droppedItems: [],
    }

    this.handleDrop = this.handleDrop.bind(this);
    this.drawLines = this.drawLines.bind(this);
  }

  handleDrop(event) {
    console.log("DROP", event);
  }

  drawLines(dropzoneElement, draggedElement) {
    let copyLines = this.state.lines
    copyLines.push({from: dropzoneElement, to: draggedElement})
    this.setState({lines: copyLines})
  }

  render() {
    
    return (
      <div className="sandbox">
        <GetAllRecords/>
        <Lines lines={this.state.lines} />
        <div>
          {this.context.legal_entities.map((legal_entity) => {
              return(
              <Interactable
                draggable={true}
                draggableOptions={draggableOptions}
                resizable={true}
                resizableOptions={resizableOptions}
                dropzone={true}
                key={'legal_entity' + legal_entity.id}
                drawLines = {this.drawLines}
              >
                  <div
                    className="draggable drag-item"
                    onClick={(event) => this.context.updateShownRecord(legal_entity)
                    }
                    id={'legal_entity' + legal_entity.id}
                  >
                  <h2>{legal_entity.entity_name}</h2>
                  <p> Entity Type: {legal_entity.entity_type}</p>
                  <p> State of Formation: {legal_entity.state_of_formation}</p>
                  </div>
              </Interactable>
              )
          })}
          <hr/>
          {this.context.natural_persons.map((natural_person) => {
              return(
              <Interactable
                draggable={true}
                draggableOptions={draggableOptions}
                resizable={true}
                resizableOptions={resizableOptions}
                dropzone={true}
                key={'natural_person' + natural_person.id}
                drawLines = {this.drawLines}
              >
                  <div
                    className="draggable drag-item"
                    onClick={(event) => this.context.updateShownRecord(natural_person)}
                    id={'natural_person' + natural_person.id}
                  >
                  <h2>{natural_person.full_name}</h2>
                  <p> State of Residence: {natural_person.residency_state}</p>
                  </div>
              </Interactable>
              )
          })}
        </div>
      </div>
    )
  }
}

export default Sandbox;
