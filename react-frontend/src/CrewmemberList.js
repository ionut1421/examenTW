import React,{Component} from 'react'
import CrewmemberStore from './CrewmemberStore'
import Crewmember from './Crewmember'
import CrewmemberAdd from './CrewmemberAdd'

class CrewmemberList extends Component{
    constructor(props){
        super(props)

        this.state= {
            crewmebers : []
        }
        this.store = new CrewmemberStore()

        this.add = (crewmember) => {
            this.store.addOne(this.props.item.id, crewmember)
        }

        this.delete = (crewmemberId) => {
            this.store.deleteOne(this.props.item.id, crewmemberId)
        }

        this.save = (crewmemberId, crewmember) => {
            this.store.saveOne(this.props.item.id, crewmemberId, crewmember)
        }

    }
    componentDidMount(){
        this.store.getAll(this.props.item.id)
        this.store.emitter.addListener('GET_CREWMEMBERS_SUCCESS', () => {
            this.setState({
                crewmebers : this.store.crewmembers
            })
        })
    }
    render(){
        return <div>
            <h3>
                Membrii ai filmului cu id-ul:  {this.props.item.id} 
            </h3>
            <div>
                {
                    this.state.crewmebers.map((e, i) => <Crewmember key={i} item={e} onDelete={this.delete} onSave={this.save} />)
                }
            </div>
            <div>
                <CrewmemberAdd onAdd={this.add} />
            </div>
            <input type="button" value="back" onClick={() => this.props.onCancel()} />
        </div>
    }
}

export default CrewmemberList