import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../src/assets/global.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


// Contexts
import { AuthContextProvider } from './contexts/AuthContext.jsx';

// Apollo Client
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <AuthContextProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
