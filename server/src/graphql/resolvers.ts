import { mergeResolvers } from 'merge-graphql-schemas';
import gameResolvers from './resolvers/game.resolvers';

const resolversArray = [gameResolvers];

export const resolvers = mergeResolvers(resolversArray);
