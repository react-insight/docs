import React, { PureComponent } from 'react';
import './history.css';
class GameHistory extends PureComponent {
  render() {
    return (
      <div className="game-historyInfo">
        <h1>History Info</h1>
        <h1>{this.props.status}</h1>
        <h1>Next player:{this.props.xIsNext ? 'O' : 'X'}</h1>
        <ul>
         {this.props.historyInfo.map((hs,index) => {
           return <li key={index}><a key={index} href="#" onClick={this.props.clickHistoryHandler.bind(this,index)}>{`move#${index+1}`}</a></li>
         })}
         {this.props.historyInfo.length>0 ? <li key={`gameKey`}><a key={`gameKey`} href="#" onClick={this.props.clickHistoryHandler.bind(this,-1)}>{`play again`}</a></li> : null}
        </ul>
       </div>
     )
  }
}

export default GameHistory;
