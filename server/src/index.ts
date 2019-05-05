import { server } from './server';
import { app } from './app';

const PORT = process.env.port || 8888;
const httpServer = server.init(app.appInstance, `${PORT}`);

app.getApolloServer().then((apolloServer) => {
  apolloServer.installSubscriptionHandlers(httpServer);
  server.start(apolloServer);
});
