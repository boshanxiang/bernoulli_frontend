import {Component} from 'react';
import SteppedLineTo from 'react-lineto'; //https://github.com/kdeloach/react-lineto/blob/master/README.md#steppedlineto

class Lines extends Component {
    constructor(props) {
        super(props)

        this.keyCount = 0;
        this.getKey = this.getKey.bind(this);

    }

    getKey(){
        return `SteppedLine${this.keyCount++}`
    }

    render() {
        return (
            <div>
            {this.props.lines
                .map(
                    (line) => {
                        console.log(`SteppedLine from ${line.from} to ${line.to}`)
                        return(
                                <SteppedLineTo
                                    key={this.getKey()}
                                    className='stepped_line'

                                    from={line.from}
                                    to={line.to}

                                    zindex={-1}
                                    orientation='v'

                                    fromAnchor='bottom center'
                                    toAnchor='top center'
                                    
                                />
                        )
                    }
                )
            }
            </div>
           
        )
    }
}

export default Lines;

