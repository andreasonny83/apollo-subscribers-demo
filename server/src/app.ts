import express, { Application } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import morgan from 'morgan';
import cors from 'cors';
import * as bodyParser from 'body-parser';

import { typeDefs } from './graphql/typedefs';
import { resolvers } from './graphql/resolvers';

class App {
  public appInstance: Application;

  constructor() {
    this.appInstance = express();
  }

  public getApolloServer(): Promise<ApolloServer> {
    return this.config();
  }

  private async config(): Promise<ApolloServer> {
    this.appInstance.use(morgan('dev'));
    this.appInstance.disable('x-powered-by');
    this.appInstance.use(cors());

    // Support application/json type post data
    this.appInstance.use(bodyParser.json());

    // Support application/x-www-form-urlencoded post data
    this.appInstance.use(bodyParser.urlencoded({ extended: false }));

    return this.applyMiddlewares(this.appInstance);
  }

  private async applyMiddlewares(expressApp: Application): Promise<ApolloServer> {
    const apolloServer: ApolloServer = await new ApolloServer({
      typeDefs: gql`
        ${typeDefs}
      `,
      resolvers,
      introspection: true,
      playground: true,
      subscriptions: {
        onConnect: () => console.log('Connected to websocket'),
      },
      tracing: true,
    });

    await apolloServer.applyMiddleware({
      app: expressApp,
      path: '/graphql',
    });

    return apolloServer;
  }
}

export const app = new App();
