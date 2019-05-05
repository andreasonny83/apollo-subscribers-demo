import React from 'react';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { WebSocketLink } from 'apollo-link-ws';
import Game from './GameContainer';
import './App.css';

const httpUri = 'http://localhost:8888/graphql';
const wsUri = 'ws://localhost:8888/graphql';

const httpLink = createHttpLink({
  uri: httpUri,
});

const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true,
  },
});

const terminatingLink = split(
  // split based on operation type
  ({ query }) => {
    const response = getMainDefinition(query);
    return response.kind === 'OperationDefinition' && response.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const link = ApolloLink.from([terminatingLink]);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="App">
        <Game />
      </div>
    </ApolloProvider>
  );
}

export default App;
