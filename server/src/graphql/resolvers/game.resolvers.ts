import { PubSub } from "apollo-server";

const pubsub = new PubSub();

let SCORE = 0;
let LOADING = false;

const TEST_UPDATE = "TEST_UPDATE";
const TEST_UPDATING = "TEST_UPDATING";

export default {
  Query: {
    gameScore(parent: any, args: any, context: any) {
      return {
        score: SCORE
      };
    },

    gameUpdating(parent: any, args: any, context: any) {
      return {
        loading: LOADING
      };
    }
  },

  Subscription: {
    testUpdate: {
      subscribe: (root: any, args: any, context: any) => {
        return pubsub.asyncIterator(TEST_UPDATE);
      }
    },

    testUpdating: {
      subscribe: (root: any, args: any, context: any) => {
        return pubsub.asyncIterator(TEST_UPDATING);
      }
    }
  },

  Mutation: {
    updateScoreTest: async (parent: any, args: any, context: any) => {
      LOADING = true;

      pubsub.publish(TEST_UPDATING, {
        testUpdating: {
          loading: LOADING
        }
      });

      await new Promise(res => setTimeout(() => res(), 2000));

      pubsub.publish(TEST_UPDATE, {
        testUpdate: {
          newScore: ++SCORE
        }
      });

      LOADING = false;

      pubsub.publish(TEST_UPDATING, {
        testUpdating: {
          loading: LOADING
        }
      });

      return {
        score: SCORE
      };
    }
  }
};
