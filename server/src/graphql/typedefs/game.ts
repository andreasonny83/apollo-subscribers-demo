export default `
  type GameUpdated {
    updating: Boolean
  }

  type TestUpdate {
    newScore: Int
  }

  type TestUpdating {
    loading: Boolean
  }

  type TestGame {
    score: Int
  }

  type Mutation {
    updateScoreTest: TestGame
  }

  type Query {
    gameScore: TestGame
    gameUpdating: TestUpdating
  }

  type Subscription {
    testUpdate: TestUpdate
    testUpdating: TestUpdating
  }
`;
