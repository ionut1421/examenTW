import React from 'react';
import {Component} from 'react';

class CrewmemberAdd extends Component {
    constructor(props){
        super(props)
        this.state = {
            id : '',
            nume : ''
          
        }
        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name] : evt.target.value
            })
        }
    }
    render(){
        return <div>
            
            <input type="text" placeholder="nume" minLength={5} onChange={this.handleChange} name="nume" />
            <select name="rol" onChange={this.handleChange}>
                <option value="DIRECTOR" selected>DIRECTOR</option>
                <option value="WRITER">WRITER</option>
            </select>
            <input type="button" value="add" onClick={() => this.props.onAdd({
                id : this.state.id,
                nume : this.state.nume,
                rol : this.state.rol

            })} name="content" />
        </div>
    }
}

export default CrewmemberAdd