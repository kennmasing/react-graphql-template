const express = require('express')
const app = express()
const mongoose = require('mongoose')
const graphqlHTTP = require('express-graphql')
const graphQLSchema = require('./gql-schema')
const cors = require('cors')
const connectToRemoteDB = require("./config/db");
const auth = require('./jwt-auth')

// mongoose.connect('mongodb://localhost:27017/template-app', {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useFindAndModify: false,
// 	useCreateIndex: true	
// })
// mongoose.connection.once('open', ()=> {
// 	console.log("Now connected to local MongoDB")
// })

connectToRemoteDB()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cors())

//ERROR HANDLER
const errorHandler = (err, req, res, next) => {
	if (res.headerSent) {
		return next(err)
	}
	const { status } = err
	res.status(status).json(err)
}
app.use(errorHandler)


app.use('/graphql', graphqlHTTP((req, res) => ({
	schema: graphQLSchema,
	graphiql: true,
	context: {
		request: req,
		currentUser: auth.verify(req.headers.authorization)
	}
})))

const port = process.env.PORT || 8000
app.listen(port, () => {
	console.log(`Now listening to port ${port} TEMPLATE-APP`)
})


