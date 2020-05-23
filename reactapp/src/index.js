//APOLLO DEPENDENCIES
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

//(1) IMPORT DEPENDENCIES
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//APOLLO SET-UP
const httpLink =  createHttpLink({
	uri: 'http://localhost:8000/graphql'
})

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token')

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		}
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
})

//(2) DEFINE THE ROOT
const root = document.querySelector('#root');


//(3) CREATE A COMPONENT
const pageComponent = <App/>

//(4) RENDER THE COMPONENT
ReactDOM.render(pageComponent, root)