const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const cors = require('cors')
const Op = Sequelize.Op

const sequelize = new Sequelize('examen','root','paroladb',{
    dialect : 'mysql',
	define:{
        timestamps:false
    }

})
const Movie  = sequelize.define('movie',{
    id : {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        allowNull: false
        },
    titlu : {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            len: [3,20]
        }
    },
    categorie : {
        type: Sequelize.STRING,
        allowNull:false,
		

    },
    dataPublicare : {
        type:Sequelize.DATE
    }

})
const CrewMember = sequelize.define('crewmember',{
   id : { type : Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    allowNull:false ,
    operatorsAliases: false
},
    nume : {
        type: Sequelize.STRING,
        allowNull:false,
        operatorsAliases: false,
        validate:{
            len: [5,20]
        }
    },
    rol : {
        type: Sequelize.ENUM("DIRECTOR","WRITER"),
        allowNull:false,
		defaultValue:"DIRECTOR",
        operatorsAliases: false
        
    }

})
Movie.hasMany(CrewMember)
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.get('/create', async (req, res) => {
	try{
		await sequelize.sync({force : true})
		res.status(201).json({message : 'created'})
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/movies', async (req, res) => {
	try{
		let pageSize = 10
		let params = {
			where : {},
			order : [['id', 'DESC'], ['titlu', 'DESC']]
		}
	    if (req.query){
	    	if (req.query.filter){
	    		params.where.id = {
                	[Op.like] : `%${req.query.filter}%`
                }
	    	}
	    	if (req.query.pageSize){
	    		pageSize = parseInt(req.query.pageSize)
	    	}
	    	if (req.query.pageNo){
	    		params.offset = parseInt(req.query.pageNo) * pageSize
	    		params.limit = pageSize
	    	}
	    }
		let movies= await Movie.findAll(params)
		res.status(200).json(movies)
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.post('/movies', async (req, res) => {
	try{
		if (req.query.bulk && req.query.bulk == 'on'){
			await Movie.bulkCreate(req.body)
			res.status(201).json({message : 'created'})
		}
		else{
			await Movie.create(req.body)
			res.status(201).json({message : 'created'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/movies/:id', async (req, res) => {
	try{
		let movie = await Movie.findById(req.params.id)
		if (movie){
			res.status(200).json(movie)
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.put('/movies/:id', async (req, res) => {
	try{
		let movie = await Movie.findById(req.params.id)
		if (movie){
			await movie.update(req.body)
			res.status(202).json({message : 'accepted'})
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.delete('/movies/:id', async (req, res) => {
	try{
		let movie = await Movie.findById(req.params.id)
		if (movie){
			await movie.destroy()
			res.status(202).json({message : 'accepted'})
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/movies/:bid/crewmembers', async (req, res) => {
	try{
		let movie = await Movie.findByPk(req.params.bid)
		if (movie){
			let crewmembers = await movie.getCrewmembers()
			res.status(200).json(crewmembers)
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/movies/:bid/crewmembers/:cid', async (req, res) => {
	try{
		let movie = await Movie.findById(req.params.bid)
		if (movie){
			let crewmembers = await movie.getCrewmembers({where : {id : req.params.cid}})
			res.status(200).json(crewmembers.shift())
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.post('/movies/:bid/crewmembers', async (req, res) => {
	try{
		let movie = await Movie.findById(req.params.bid)
		if (movie){
			let crewmember = req.body
			crewmember.movieId = movie.id
			await CrewMember.create(crewmember)
			res.status(201).json({message : 'created'})
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.put('/movies/:bid/crewmembers/:cid', async (req, res) => {
	try{
		let movie = await Movie.findById(req.params.bid)
		if (movie){
			let crewmembers = await movie.getCrewmembers({where : {id : req.params.cid}})
			let crewmember = crewmembers.shift()
			if (crewmember){
				await crewmember.update(req.body)
				res.status(202).json({message : 'accepted'})
			}
			else{
				res.status(404).json({message : 'not found'})
			}
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.delete('/movies/:bid/crewmembers/:cid', async (req, res) => {
	try{
		let movie = await Movie.findById(req.params.bid)
		if (movie){
			let crewmembers = await movie.getCrewmembers({where : {id : req.params.cid}})
			let crewmember = crewmembers.shift()
			if (crewmember){
				await crewmember.destroy(req.body)
				res.status(202).json({message : 'accepted'})
			}
			else{
				res.status(404).json({message : 'not found'})
			}
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.listen(8080)
