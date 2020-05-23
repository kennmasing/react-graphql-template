import gql from 'graphql-tag'

//--------------U S E R S----------------
const GET_ALL_USERS = gql`
	{
		users{
			_id
			firstName
			lastName
			username
			email
			password
			roleId
			isArchived
			createdAt
			updatedAt
		}
	}
`
const GET_USERS_BY_ROLE_ID = gql`
	query(
		$limit: Int
		$skip: Int
		$roleId: Int
		$isArchived: Boolean
	){
		usersByRoleId(
			limit: $limit
			skip: $skip
			roleId: $roleId
			isArchived: $isArchived
		){
			total
			 _id
			firstName
			lastName
			username
			email
			password
			roleId
			isArchived
			createdAt
			updatedAt
		}
	}
`
const GET_USER = gql`
	query(
		$_id: ID!
	){
		user(
			_id: $_id
		){
			_id
			firstName
			lastName
			username
			email
			password
			roleId
			isArchived
			createdAt
			updatedAt
		}
	}
`
export {
	//--------------U S E R S----------------
	GET_ALL_USERS,
	GET_USERS_BY_ROLE_ID,
	GET_USER
}