//DECLARE DEPENDENCIES
const bcrypt = require('bcrypt');
const auth = require('./jwt-auth');
const graphql = require("graphql");
const moment = require('moment')

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean,
	GraphQLNonNull,
	GraphQLList,
	GraphQLSchema
} = graphql;
const graphQLISODate = require("graphql-iso-date");
const { GraphQLDateTime } = graphQLISODate;

//DECLARE THE MODELS
const User = require("./models/users");

// CREATE TYPES
//--------------------------U S E R S--------------------------
const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		limit: {type: GraphQLInt},
		skip: {type: GraphQLInt},
		total: {type: GraphQLInt},
		_id: { type: GraphQLID },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		username: { type: GraphQLString },
		email: { type: GraphQLString },
		password: { type: GraphQLString },
		roleId: { type: GraphQLInt },
		isArchived: { type: GraphQLBoolean },
		token: { type: GraphQLString },
		tokens: { type: GraphQLString },
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime }
	})
})

// CREATE ROOTQUERY
const RootQuery = new GraphQLObjectType({
	name: "Query",
	fields: {
	//--------------------------U S E R S--------------------------	
		users: {
			type: new GraphQLList(UserType),
			args: {
				_id: { type: GraphQLID },
				firstName: { type: GraphQLString },
				lastName: { type: GraphQLString },
				username: { type: GraphQLString },
				email: { type: GraphQLString },
				password: { type: GraphQLString },
				roleId: { type: GraphQLInt },
				isArchived: { type: GraphQLBoolean },
				tokens: { type: GraphQLString },
				createdAt: { type: GraphQLDateTime },
				updatedAt: { type: GraphQLDateTime }				
			},
			resolve: (parent, args) => {
				return User.find()
			}
		},
		usersByRoleId: {
			type: new GraphQLList(UserType),
			args: {
				limit: { type: GraphQLInt },
				skip: { type: GraphQLInt },
				total: { type:  GraphQLInt },
				isArchived: { type: GraphQLBoolean},
				roleId: { type: GraphQLInt }
			},
			resolve: async (parent, args) => {
				let where = {}
				let limit = 0
				let skip = 0

				if(args.roleId != null && args.isArchived == true){
					where = {
						roleId: args.roleId,
						isArchived: true
					}
				} else if(args.roleId != null && args.isArchived == false){
					where = {
						roleId: args.roleId,
						isArchived: false
					}
				} else if(args.roleId){
					where = {
						roleId: args.roleId
					}
				}

				if(args.limit){
					limit = parseInt(args.limit)
				}

				if(args.skip){
					skip = parseInt(args.skip)
				}

				const usersLength = await User.find(where)

				const users = await User.find(where)
					.limit(limit)
					.skip(skip)

				const total = parseInt(usersLength.length)

				args.total = total

				users.map(user => {
					user.total = args.total
				})

				return users
			}
		},
		user: {
			type: UserType,
			args: {
				_id: { type: GraphQLID }
			},
			resolve: (parent, args) => {
				return User.findById(args._id)
			}
		}
	}
})

//CREATE MUTATIONS
const Mutations = new GraphQLObjectType({
	name: "Mutations",
	fields: {
	//--------------------------U S E R S--------------------------	
		login: {
			type: UserType,
			args: {
				username: { type: GraphQLString },
				email: { type: GraphQLString },
				password: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve: (parent, args) => {
				
				let query = ""
				if(args.username.indexOf('@') === -1){
 					query = User.findOne({ username: args.username })
				} else {
 					query = User.findOne({ email: args.username })
				}

				return query.then(user => user).then(user => {
					if(user == null) {return null}

					let isPasswordMatched = bcrypt.compareSync(args.password, user.password)

					if(isPasswordMatched){
						user.token = auth.createToken(user.toObject())
						return user
					} else {
						return null
					}
				})
			}
		},
		createUser: {
			type: UserType,
			args: {
				firstName: { type: GraphQLString },
				lastName: { type: GraphQLString },
				username: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
				roleId: { type: GraphQLInt },
				isArchived: { type: GraphQLBoolean }
			},
			resolve: (parent, args) => {
				let user = new User({...args})
				return user.save()
			}			
		},
		updateUser: {
			type: UserType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) },
				firstName: { type: GraphQLString },
				lastName: { type: GraphQLString },
				username: { type: GraphQLString },
				email: { type:GraphQLString },
				password: { type: GraphQLString },
				roleId: { type: GraphQLInt },
				isArchived: { type: GraphQLBoolean },
				updatedAt: { type: GraphQLDateTime }
			},
			resolve: (parent, args) => {
				return User.findByIdAndUpdate(
					{ _id: args._id },
					{ ...args },
					{ new: true }
				)
			}
		},
		archiveUser: {
			type: UserType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) },
				isArchived: { type: GraphQLBoolean },
				updatedAt: { type: GraphQLDateTime }
			},
			resolve: async (parent, args) => {

				const tasks = await Task.find({ user: args._id })
				const taskIds = tasks.map(task => task._id)

				await Task.deleteMany({
					_id: {
						$in: taskIds
					}
				})

				return User.findByIdAndUpdate(
					{ _id: args._id },
					{ isArchived: args.isArchived },
					{ new: true }
				)
			}
		},		
		deleteUser: {
			type: UserType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve: async (parent, args) => {

				const tasks = await Task.find({ user: args._id })
				const taskIds = tasks.map(task => task._id)

				await Task.deleteMany({
					_id: {
						$in: taskIds
					}
				})

				return User.findByIdAndRemove({_id: args._id})
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutations
})