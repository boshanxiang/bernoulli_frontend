import {Component} from 'react';
import SteppedLine from 'react-lineto'; //https://github.com/kdeloach/react-lineto/blob/master/README.md#steppedlineto

class Lines extends Component {

    render() {
        return (
            <SteppedLine from={this.props.from} to={this.props.to} orientation='v'/>
        )
    }
}

export default Lines;

