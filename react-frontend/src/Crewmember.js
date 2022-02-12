import React,{Component} from 'react'

class Crewmember extends Component{
    constructor(props){
        super(props)
        this.state = {
            isEditing : false,
            id : this.props.item.id,
            nume: this.props.item.nume,
            rol : this.props.item.rol,
        
        }
        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name] : evt.target.value
            })
        }
        this.save = () => {
            this.props.onSave(this.props.item.id, {
                id : this.state.id,
                nume: this.state.nume,
                rol: this.state.rol
             
            })
            this.setState({
                isEditing : false
            })
        }
    }
    render(){
        if (this.state.isEditing){
            return <div>
                <h3>
                <input type="text" name="nume" minLength={5} onChange={this.handleChange} value={this.state.nume} />
                </h3>
                <h5>
                <select name="rol" onChange={this.handleChange} value={this.state.rol}>
                <option value="DIRECTOR">DIRECTOR</option>
                <option value="WRITER">WRITER</option>
                </select>
                </h5>
                <div>
                <input type="button" value="cancel" onClick={() => this.setState({
                    isEditing : false
                })} />
                <input type="button" value="save" onClick={this.save} />
            </div> 

            </div>
        }
        else{
            return <div>
                <table>  
                    <thead>    
                    <tr>
                        <th>Id membru</th>
                        <th>Nume</th>
                        <th>Rol</th>
                        </tr>
                        </thead>   
                        <tbody>  
                            <tr>    
                     <td>{this.props.item.id}</td>
                    <td>{this.props.item.nume}</td>
                    <td>{this.props.item.rol}</td>
                    </tr>
                    </tbody>
                    </table>

                <div>
                    <input type="button" value="edit" onClick={() => this.setState({
                        isEditing : true
                    })} />
                    <input type="button" value="delete" onClick={() => this.props.onDelete(this.props.item.id)} />
                </div> 
            </div>
        }
    }

}

export default Crewmember