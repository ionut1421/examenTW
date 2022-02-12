import React,{Component} from 'react'
import './style.css'
class Movie extends Component{
    constructor(props){
        super(props)
        this.state = {
            isEditing : false,
            id:this.props.item.id,
            titlu : this.props.item.titlu,
            categorie: this.props.item.categorie,
            dataPublicare: this.props.item.dataPublicare


        }
        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name] : evt.target.value
            })
        }
        this.save = () => {
            this.props.onSave(this.props.item.id, {
                id : this.state.id,
                titlu : this.state.titlu,
                categorie: this.state.categorie,
                dataPublicare: this.state.dataPublicare

            })

        this.setState({
            isEditing : false
        })
    }
}
    render(){
        if (this.state.isEditing){
            return <div>
                
                <h5>
                    <input type="text" name="titlu" minLength={3} onChange={this.handleChange} value={this.state.titlu} />
                </h5>
                <h6>
                <input type="text" name="categorie" onChange={this.handleChange} value={this.state.categorie} />
                </h6>
                <h7>
                <input type="date" name="dataPublicare" onChange={this.handleChange} value={this.state.dataPublicare} />

                </h7>
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
                    <th>
                        ID film
                    </th>
                    <th>
                        Titlu
                    </th>
                    <th>
                        Categorie
                    </th>
                    <th>
                        Data publicare
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        {this.props.item.id}

                        </td>
                        <td>
                        {this.props.item.titlu}
                        </td>
                        <td>
                        {this.props.item.categorie}

                        </td>
                        <td>
                        {this.props.item.dataPublicare}
                        </td>
                    </tr>
                </tbody>

                </table>

                
                
                <div>
                    <input type="button" value="edit" onClick={() => this.setState({
                        isEditing : true
                    })} />
                <input type="button" id="btnDelete"value="delete" onClick={() => this.props.onDelete(this.props.item.id)} />
                <input type="button" value="details" onClick={() => this.props.onSelect(this.props.item.id)} />
                   
               
                   
                </div> 
            </div>
        }
        }
    }



export default Movie