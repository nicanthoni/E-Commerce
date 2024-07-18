import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../src/assets/global.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Contexts
import { AuthContextProvider } from './contexts/AuthContext.jsx';
import { CategoryContextProvider } from './contexts/CategoryContext.jsx';
import { SortProductsContextProvider } from './contexts/SortContext.jsx';


// Apollo Client
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SortProductsContextProvider>
        <CategoryContextProvider>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </CategoryContextProvider>
      </SortProductsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
