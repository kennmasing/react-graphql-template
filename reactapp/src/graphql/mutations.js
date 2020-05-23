import gql from 'graphql-tag'

const LOGIN_MUTATION = gql`
	mutation(
		$username: String
		$email: String
		$password: String!
	){
		login(
			username: $username
			email: $email
			password: $password
		){
			_id
			firstName
			lastName
			username
			email
			roleId
			token
			isArchived
			createdAt
			updatedAt
		}
	}
`
// //--------------U S E R S----------------
const CREATE_USER = gql`
	mutation(
		$firstName: String!
		$lastName: String!
		$username: String!
		$email: String!
		$password: String!
		$roleId: Int
	){
		createUser(
			firstName: $firstName
			lastName: $lastName
			username: $username
			email: $email
			password: $password
			roleId: $roleId
		){
			_id
			firstName
			lastName
			username
			email
			password
			isArchived
			createdAt
			updatedAt
		}
	}
`
const UPDATE_USER = gql`
	mutation(
		$_id: ID!
		$firstName: String
		$lastName: String
		$username: String
		$email: String
		$password: String
		$isArchived: Boolean
	){
		updateUser(
			_id: $_id
			firstName: $firstName
			lastName: $lastName
			username: $username
			email: $email
			password: $password
			isArchived: $isArchived
		){
			_id
			firstName
			lastName
			username
			email
			password
			isArchived
			updatedAt
		}
	}
`
const ARCHIVE_USER = gql`
	mutation(
		$_id: ID!
		$isArchived: Boolean
	){
		archiveUser(
	 		_id: $_id
	 		isArchived: $isArchived
		){
			_id
			firstName
			lastName
			username
			password
			isArchived
			updatedAt
		}
	}
`
const DELETE_USER = gql`
	mutation(
		$_id: ID!
	){
		deleteUser(
			_id: $_id
		){
			_id
			firstName
			lastName
			username
			email
			password
			isArchived
			createdAt
			updatedAt
		}
	}
`
export {
	// //--------------U S E R S----------------
	LOGIN_MUTATION,
	CREATE_USER,
	UPDATE_USER,
	ARCHIVE_USER,
	DELETE_USER,
}