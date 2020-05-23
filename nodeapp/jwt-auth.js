const jwt = require ('jsonwebtoken')
const secret = 'time-tracker-app'

module.exports.createToken = (user) => {
	let data = {
		_id: user._id,
		email: user.email
	}
	return jwt.sign(data, secret)
}

module.exports.verify = (authToken) => {
	if(typeof authToken !== 'undefined'){
		authToken = authToken.slice(7, authToken.length)

		return jwt.verify(authToken, secret, (err, data) => {
			if(err){
				return null
			} else {
				return jwt.decode(authToken, { complete: true }).payload
			}
		})
	} else {
		return null
	}
}

module.exports.getId = (authToken) => {
	getPayLoad(authToken)._id
}

getPayload = (authToken) => {
	return jwt.decode(authToken, { complete: true }).payload
}