
import React from 'react';
import {Component} from 'react';
import MovieStore from './MovieStore'
import MovieAdd from './MovieAdd';
import Movie from './Movie'
import CrewmemberList from './CrewmemberList';


class MovieList extends Component {
    constructor(){
        super()
        this.state = {
            movies : [],
            showCrewmembersFor: -1,
            selectedMovie : null
          
           
        }
        this.delete = (id) => {
            this.store.deleteOne(id)
        }

        this.store = new MovieStore()

        this.add = (movie) => {
            this.store.addOne(movie)
        }
        this.save = (id, movie) => {
            this.store.saveOne(id, movie)
        }
       
        this.select = (id) => {
            let selected = this.state.movies.find((e) => e.id === id)
            this.setState({
                showCrewmembersFor : id,
                selectedMovie : selected
            })
        }
        this.cancel = (id) => {
            this.setState({
                showCrewmembersFor : -1,
            })
        }
       
       

    }

    componentDidMount(){
        this.store.getAll()
        this.store.emitter.addListener('GET_MOVIES_SUCCESS', () => {
            this.setState({
                movies : this.store.movies
            })
        })
    }

    render(){
        if(this.state.showCrewmembersFor === -1){
            return <div>
                {
                    this.state.movies.map((e, i) => <Movie key={i} item={e} onDelete={this.delete} onSave={this.save} onSelect={this.select}/>)
                }
                <MovieAdd onAdd={this.add} />
            </div>
        }
        else{
            return <CrewmemberList item={this.state.selectedMovie} onCancel = {this.cancel}/>
        }
        
    }
}

export default MovieList
