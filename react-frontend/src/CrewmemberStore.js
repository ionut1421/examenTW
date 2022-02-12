import {EventEmitter} from 'fbemitter'
const SERVER = 'http://localhost:8080'

class CrewmemberStore{
    constructor(){
        this.crewmembers = []
        this.emitter = new EventEmitter()
    }

    async getAll(movieId){
        try{
            let response = await fetch(`${SERVER}/movies/${movieId}/crewmembers`)
            let data = await response.json()
            this.crewmembers = data
            this.emitter.emit('GET_CREWMEMBERS_SUCCESS')
        }
        catch(err){
            console.warn(err)
            this.emitter.emit('GET_CREWMEMBERS_ERROR')
        }
    }

    async addOne(movieId, crewmember){
        try{
            await fetch(`${SERVER}/movies/${movieId}/crewmembers`, {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(crewmember)           
            })
            this.getAll(movieId) 
        }
        catch(err){
            console.warn(err)
            this.emitter.emit('ADD_CREWMEMBER_ERROR')
        }
    } 
    async deleteOne(movieId, crewmemberId){
        try{
            await fetch(`${SERVER}/movies/${movieId}/crewmembers/${crewmemberId}`, {
                method : 'delete',
            })
            this.getAll(movieId) 
        }
        catch(err){
            console.warn(err)
            this.emitter.emit('DELETE_CREWMEMBER_ERROR')
        }
    }
    async saveOne(movieId, crewmemberId, crewmember){
        try{
            await fetch(`${SERVER}/movies/${movieId}/crewmembers/${crewmemberId}`, {
                method : 'put',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(crewmember)           
            })
            this.getAll(movieId) 
        }
        catch(err){
            console.warn(err)
            this.emitter.emit('SAVE_CREWMEMBER_ERROR')
        }
    }
}

export default CrewmemberStore