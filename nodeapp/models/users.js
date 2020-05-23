const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//DEFINE SCHEMA
const userSchema = new Schema(
	{
		firstName: {
			type: String,
			trim: true,
			default: "User"
		},
		lastName: {
			type: String,
			trim: true,
			default: "User"
		},
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		roleId: {
			type: Number,
			default: 2
		},
		isArchived: {
			type: Boolean,
			default: false
		},
		tokens: [
			{
				token: {
					type: String,
					required: true
				}
			}
		]
	},
	{
		timestamps: true
	}
)

//HASH PASSWORD WHEN CREATING AND UPDATING USER
userSchema.pre("save", async function(next) {
	const user = this

	if(user.isModified('password')) {
		//SALT
		const salt = await bcrypt.genSalt(10);
		//HASH
		user.password = await bcrypt.hash(user.password, salt);
	}
	next();
});

//FIND BY CREDENTIALS USING STATICS
userSchema.statics.findByCredentials = async (email, username, password) => {
	

	//CHECK IF EMAIL EXISTS
	const user = await User.findOne({ email } || { username });
		console.log(user);
		function myError(message) {
		this.message = message
		}

  		myError.prototype = new Error();
		
		if(!user) {
			throw new myError("Email or username is wrong!") //FOR NOW
		}

	//COMPARING REQUEST PASSWORD VD DATABASE PASSWORD
	const isMatch = await bcrypt.compare(password, user.password);

		if(!isMatch) {
			throw new myError("Wrong password!")//FOR NOW
		}

		return user
};

//GENERATE TOKENS
userSchema.methods.generateAuthToken = async function() {
	const user = this
	
	const token = jwt.sign({_id: user._id.toString()}, "batch40", { expiresIn: '14 days'});

	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;

};

//(OPTIONAL) SET RELATIONSHIP
userSchema.virtual("tasks", {
	ref: "Task",
	localField: "_id",
	foreignField: "user"
});

//EXPORT MODEL
const User = mongoose.model("User", userSchema);
module.exports = User;