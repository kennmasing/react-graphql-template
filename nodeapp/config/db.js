//CONNECT TO DATABASE
const mongoose = require("mongoose"); 

//INSTALLED PACKAGE npm i config // allows usage of global variables across applications
const config = require("config"); 

//OBJECT FROM default.json
const remoteDB = config.get("mongoURI"); 

//FUNCTION THAT CONNECTS TO DATABASE
const connectToRemoteDB = async() => {
	try{
		await mongoose.connect(remoteDB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		})
		console.log("MongoDB Atlas is connected")
	}catch(e){
		console.log(e.message)
	}
}

//EXPORT
module.exports = connectToRemoteDB;