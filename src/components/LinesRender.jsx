import {Component} from 'react';
import {SteppedLineTo} from 'react-lineto'; //https://github.com/kdeloach/react-lineto/blob/master/README.md#steppedlineto

class LinesRender extends Component {
 
    constructor(props) {
        super(props)

        this.ownership_lines_KeyCount = 0;
        this.employment_lines_KeyCount = 0;
        this.officer_lines_KeyCount = 0;
        this.director_lines_KeyCount = 0;
    }

    getSteppedLineKey(stringprefix){
        switch(stringprefix) {
          case 'ownership_line':
            return `${stringprefix}${this.ownership_lines_KeyCount++}`
          case 'employment_line': 
            return `${stringprefix}${this.emplyoment_lines_KeyCount++}`
          case 'officer_line':
            return `${stringprefix}${this.officer_lines_KeyCount++}`
          case 'director_line':
            return `${stringprefix}${this.director_lines_KeyCount++}`
          default:
            console.log('Stepped Line Key Error');
        }
    }

    render() {
        
        let borderColor;
        let borderStyle;
        let fromAnchor;
        let toAnchor;

        switch (this.props.stringprefix) {
            case 'ownership_line':
                borderColor = 'black';
                borderStyle = 'solid';
                fromAnchor='bottom center'
                toAnchor='top center'
                break
            case 'employment_line':
                borderColor = 'green';
                borderStyle = 'dashed';
                fromAnchor='left';
                toAnchor='right';
                break
            case 'officer_line':
                borderColor = 'blue';
                borderStyle = 'dotted';
                fromAnchor='left';
                toAnchor='right';
                break
            case 'director_line':
                borderColor = 'red';
                borderStyle = 'dotted';
                fromAnchor='left';
                toAnchor='right';
                break
            default:
                borderColor = 'grey';
                borderStyle = 'solid';
        }

        const steppedLineStyle = {
            delay: true,
            borderColor: borderColor,
            borderStyle: borderStyle,
            borderWidth: 3,
          }; 

          // Style const is for stepped lines

        return(
            <div>
                {this.props.elements
                    .map(
                        (element) => {
                            console.log(`SteppedLine from ${element.from} to ${element.to}`)
                            return(
                            <SteppedLineTo
                                key={this.getSteppedLineKey(this.props.stringprefix)}

                                from={element.from}
                                to={element.to}

                                zindex={-1}

                                fromAnchor={fromAnchor}
                                toAnchor={toAnchor}

                                {...steppedLineStyle}
                            />
                            )
                        }
                    )
                }
            </div>
        )
    }
}

export default LinesRender