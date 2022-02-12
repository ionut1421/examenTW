import {EventEmitter} from 'fbemitter'
const SERVER = 'http://localhost:8080'

class MovieStore{
    constructor(){
        this.movies = []
        this.emitter = new EventEmitter()
    }

    async getAll(){
        try{
            let response = await fetch(`${SERVER}/movies`)
            let data = await response.json()
            this.movies = data
            this.emitter.emit('GET_MOVIES_SUCCESS')
        }
        catch(err){
            console.warn(err)
            this.emitter.emit('GET_MOVIES_ERROR')
        }
    }

    async addOne(movie){
        try{
            await fetch(`${SERVER}/movies`, {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(movie)           
            })
            this.getAll() 
        }
        catch(err){
            console.warn(err)
            this.emitter.emit('ADD_MOVIES_ERROR')
        }
    } 
    async deleteOne(id){
        try{
            await fetch(`${SERVER}/movies/${id}`, {
                method : 'delete',
            })
            this.getAll() 
        }
        catch(err){
            console.warn(err)
            this.emitter.emit('DELETE_MOVIES_ERROR')
        }
    }
    async saveOne(id, movie){
        try{
            await fetch(`${SERVER}/movies/${id}`, {
                method : 'put',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(movie)           
            })
            this.getAll() 
        }
        catch(err){
            console.warn(err)
            this.emitter.emit('SAVE_VIRTUALS_ERROR')
        }
    }
}

export default MovieStore