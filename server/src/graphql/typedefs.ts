import { mergeTypes } from 'merge-graphql-schemas';
import gameType from './typedefs/game';

const types = [gameType];

// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
export const typeDefs = mergeTypes(types, { all: true });
