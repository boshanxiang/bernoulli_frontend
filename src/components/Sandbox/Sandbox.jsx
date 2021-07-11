import {Component} from 'react';
import Interactable from '../Interactables/Interactables';
import {draggableOptions, resizableOptions, dropzoneOptions} from '../Interactables/Interactables';

import { AllRecordsContext } from '../Context/RecordsContext';
import GetAllRecords from '../GetAllRecords/GetAllRecords';

import {SteppedLineTo} from 'react-lineto'; //https://github.com/kdeloach/react-lineto/blob/master/README.md#steppedlineto
import PropTypes from 'prop-types'

// import "../styles.css";

class Sandbox extends Component {

  static contextType = AllRecordsContext

  constructor(props) {
    super(props)
    this.state = {
      lines: [],
    }

    this.steppedLineKeyCount = 0;

    this.getSteppedLineKey = this.getSteppedLineKey.bind(this);
    this.drawLines = this.drawLines.bind(this);
    this.loadRelationalRecord = this.loadRelationalRecord.bind(this);
  }
 
  getSteppedLineKey(){
    return `SteppedLine${this.keyCount++}`
  }

  drawLines(dropzoneElementID, draggableElementID) {
    let findIndex = this.state.lines.findIndex((line) => {
      return ((line.from === dropzoneElementID) && (line.to === draggableElementID))
    })
    if(findIndex < 0) {
      let copyLines = this.state.lines;
      let revisedLines = [...copyLines, {'from': dropzoneElementID, 'to': draggableElementID}]
      // console.log(`revisedLines: ${revisedLines}`)
      this.setState({lines: revisedLines});
    }
  }

  loadRelationalRecord(dropzoneRecord, draggableRecord) {
    return
  }

  render() {

    const steppedLineStyle = {
      delay: true,
      borderColor: 'black',
      borderStyle: 'solid',
      borderWidth: 3,
    }; 
    // Style const is for stepped lines
    
    return (
      <div className="sandbox">
        <GetAllRecords/>
        {this.state.lines
                .map(
                    (line) => {
                        console.log(`SteppedLine from ${line.from} to ${line.to}`)
                        return(
                          <SteppedLineTo
                              key={this.getSteppedLineKey()}

                              from={line.from}
                              to={line.to}

                              zindex={-1}

                              fromAnchor='bottom center'
                              toAnchor='top center'

                              {...steppedLineStyle}

                          />
                        )
                    }
                )
            }
          <h3>Legal Entities</h3>
          {this.context.legal_entities.map((legal_entity) => {
              return(
              <Interactable
                key={'legal_entity' + legal_entity.id}  
                
                draggable={true}
                draggableOptions={draggableOptions}
                resizable={true}
                resizableOptions={resizableOptions}
                dropzone={true}
                dropzoneOptions={dropzoneOptions}

                record={legal_entity}
                // inscribeDraggableRecord = {this.inscribeDraggableRecord}
                // inscribeDropzoneRecord = {this.inscribeDropzoneRecord}
                
                drawLines={this.drawLines}
                loadRelationalRecord={this.loadRelationalRecord}

                // style={{zIndex:1}}
              >
                  <div
                    className={`draggable drag-item legal_entity${legal_entity.id}`}
                    onClick={(event) => this.context.updateShownRecord(legal_entity)}
                    id={'legal_entity' + legal_entity.id}
                    style={{zIndex:1}}
                  >
                  <h2>{legal_entity.entity_name}</h2>
                  <p> Entity Type: {legal_entity.entity_type}</p>
                  <p> State of Formation: {legal_entity.state_of_formation}</p>
                  </div>
              </Interactable>
              )
          })}
          <br/>
          <h3>Natural Persons</h3>
          {this.context.natural_persons.map((natural_person) => {
              return(
              <Interactable
  
                key={'natural_person' + natural_person.id}

                draggable={true}
                draggableOptions={draggableOptions}
                resizable={true}
                resizableOptions={resizableOptions}
                dropzone={true}
                dropzoneOptions={dropzoneOptions}
    
                record={natural_person}
                // inscribeDraggableRecord = {this.inscribeDraggableRecord}
                // inscribeDropzoneRecord = {this.inscribeDropzoneRecord}

                drawLines={this.drawLines}
                loadRelationalRecord={this.loadRelationalRecord}

                // style={{zIndex:1}}
              >
                  <div
                    className={`draggable drag-item natural_person${natural_person.id}`}
                    onClick={(event) => this.context.updateShownRecord(natural_person)}
                    id={'natural_person' + natural_person.id}
                    style={{zIndex:1}}
                  >
                  <h2>{natural_person.full_name}</h2>
                  <p> State of Residence: {natural_person.residency_state}</p>
                  </div>
              </Interactable>
              )
          })}
      </div>
    )
  }
}

export default Sandbox;
