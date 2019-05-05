import React, { PureComponent } from "react";
import { onGameUpdated, onGameUpdating } from "./GameContainer";

export class Game extends PureComponent<any, any> {
  public state = {
    dataUpdated: false,
    dataUpdating: false
  };
  private unsubscribeGameUpdated: any;
  private unsubscribeGameUpdating: any;

  public componentWillMount() {
    const { data: { subscribeToMore } } = this.props;

    this.unsubscribeGameUpdated = onGameUpdated(subscribeToMore);
    this.unsubscribeGameUpdating = onGameUpdating(subscribeToMore);
  }

  public componentWillUnmount() {
    this.unsubscribeGameUpdated();
    this.unsubscribeGameUpdating();
  }

  public componentDidUpdate() {
    this.checkScoreUpdated();
  }

  render() {
    const { data } = this.props;
    const { dataUpdated } = this.state;

    return (
      <div className="Game">
        Game
        <h2>
          Game score: {`${data && data.gameScore && data.gameScore.score}`}
        </h2>
        <h3>
          Game updating:{" "}
          {`${data && data.gameUpdating && data.gameUpdating.loading}`}
        </h3>
        <button onClick={this.update}>Update Score</button>

        <div id="gameUpdated" className={dataUpdated ? 'show' : ''}>Game Updated</div>
      </div>
    );
  }

  update = () => {
    const { mutate } = this.props;

    mutate();
  };

  checkScoreUpdated = () => {
    const { data } = this.props;
    const { dataUpdated, dataUpdating } = this.state;

    if (!dataUpdating && data.gameUpdating.loading) {
      this.setState({
        dataUpdating: true,
        dataUpdated: false,
      });
    }

    if (dataUpdating && !data.gameUpdating.loading) {
      this.setState({
        dataUpdating: false,
        dataUpdated: true,
      });
    }

    if (!dataUpdating && dataUpdated) {
      setTimeout(() => {
        this.setState({
          dataUpdating: false,
          dataUpdated: false,
        });
      }, 2000);
    }
  }
}
