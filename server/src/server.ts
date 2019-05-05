import http from 'http';
import { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';

class Server {
  public serverInstance?: http.Server;
  private portNumber?: string;

  public init(expressApp: Application, portNumber: string): http.Server {
    if (this.serverInstance) {
      console.error(`The server is already running on port ${this.portNumber}`);
      return this.serverInstance;
    }

    this.portNumber = portNumber;
    this.serverInstance = http.createServer(expressApp);

    return this.serverInstance;
  }

  public start(apolloServerApp: ApolloServer) {
    if (!this.serverInstance) {
      console.error(`No server has been initialized`);
      return;
    }

    this.serverInstance.listen(this.portNumber, () => {
      const addressInfo: any = this.serverInstance && this.serverInstance.address();
      const port: number = 'port' in addressInfo ? addressInfo.port : null;
      const address: string =
        'address' in addressInfo
          ? addressInfo.address === '::'
            ? 'http://localhost:'
            : addressInfo.address
          : '';

      console.log(`🚀  Server listening on ${address}${port}`);
      console.log(`🚀  GraphQL playground listening on ${address}${port}${apolloServerApp.graphqlPath}`);
      console.log(`🚀  Subscriptions ready at ws://localhost:${port}${apolloServerApp.subscriptionsPath}`)
    });
  }
}

export const server: Server = new Server();
