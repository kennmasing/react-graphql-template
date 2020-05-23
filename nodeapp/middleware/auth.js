const jwt = require("jsonwebtoken");
const User = require("../models/users");

const auth = async (req, res, next) => {
	try {
		//(1) ACCESS HEADER
		//(2) GET JWT OUT OF THE HEADER
		const token = req.header("Authorization").replace("Bearer ", "");

		//(3) MAKE SURE THAT TOKEN IS VALID
		const decoded = jwt.verify(token, "batch40");		
		
		//(4) FIND THE MEMBER IN DB
		//(5) CHECK IF TOKEN IS PART OF member.tokens
		const user = await User.findOne({
			_id: decoded._id,
			"tokens.token": token
		})

		//(6) CHECK IF MEMBER DOESN'T EXIST
		if(!user) {
			throw new Error("Member doesn't exist!")
		}

		//(7) GIVE ROUTE ACCESS TO MEMBER
		req.user = user

		//(8) GIVE ROUTE ACCESS TO TOKEN
		req.token = token

		//(9) CALL NEXT FUNCTION
		next()

	} catch(e) {
		//UNAUTHORIZED
		// res.status(401).send({ "message": "Please authenticate!"});
		res.status(401).send("Please authenticate!");
	}
}

module.exports = auth;