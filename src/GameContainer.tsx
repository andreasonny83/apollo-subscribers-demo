import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

import { Game } from "./Game";

const TEST_UPDATE = gql`
  subscription TestUpdate {
    testUpdate {
      newScore
    }
  }
`;

const TEST_UPDATING = gql`
  subscription TestUpdating {
    testUpdating {
      loading
    }
  }
`;

const UPDATE_SCORE = gql`
  mutation UpdateScoreTest {
    updateScoreTest {
      score
    }
  }
`;

const GAME_SCORE = gql`
  query GameScore {
    gameScore {
      score
    }

    gameUpdating {
      loading
    }
  }
`;

const withGame = compose(
  // graphql(TEST_UPDATE),
  graphql(TEST_UPDATING),
  graphql(GAME_SCORE),
  graphql(UPDATE_SCORE),
)


export function onGameUpdated(subscribeToMore: any) {
  return subscribeToMore(
    {
      document: TEST_UPDATE,

      updateQuery: (prev: any, { subscriptionData }: any) => {
        const data = subscriptionData.data;

        if (!data) {
          return prev;
        }

        console.log('TEST_UPDATE', data);

        return {
          ...prev,
          gameScore: {
            ...prev.gameScore,
            score: data.testUpdate.newScore,
          },
        };
      },
    },
  )
};

export function onGameUpdating(subscribeToMore: any) {
  return subscribeToMore(
    {
      document: TEST_UPDATING,

      updateQuery: (prev: any, { subscriptionData }: any) => {
        const data = subscriptionData.data;

        if (!data) {
          return prev;
        }

        console.log('TEST_UPDATING', data);

        return {
          ...prev,
          gameUpdating: {
            ...prev.gameUpdating,
            loading: data.testUpdating.loading
          }
        };
      },
    },
  );
}

export default withGame(Game);
