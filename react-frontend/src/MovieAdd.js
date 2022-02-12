import React from 'react';
import {Component} from 'react';
import MovieList from './MovieList'

class MovieAdd extends Component {
    constructor(props){
        super(props)
        this.state = {
            id : '',
            titlu : '',
            categorie: '',
            dataPublicare: ''
        }
        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name] : evt.target.value
            })
        }
    }
    render(){
        return <div>
            
            <input type="text" placeholder="titlu" minLength={3} onChange={this.handleChange} name="titlu" />
            <input type="text" placeholder="categorie" onChange={this.handleChange} name="categorie" />
            <input type="date"  onChange={this.handleChange} name="dataPublicare" />
            <input type="button" value="add" onClick={() => this.props.onAdd({
                 id: this.state.id,
                 titlu : this.state.titlu,
                 categorie : this.state.categorie,
                 dataPublicare: this.state.dataPublicare
            })} name="content" />
        </div>
    }
}

export default MovieAdd;
