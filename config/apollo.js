import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from 'apollo-link-context'
import fetch from 'node-fetch'

const httpLink = createHttpLink({
  uri: 'https://frozen-refuge-73101.herokuapp.com/',
  fetch
})
const authLink = setContext((_, { headers }) => {
  // Obtener token de autenticación
  const token = sessionStorage.getItem('token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})
export default client
