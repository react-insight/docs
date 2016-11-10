import React, { Component }from 'react';
import Board from '../board';
import GameHistory from '../history';
import './game.css';
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      squares: Array(9).fill(''),
      xIsNext: false,
      winPos: [],
      winner: ''
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.clickHistoryHandler = this.clickHistoryHandler.bind(this);
  }
  calculateWinner (squares) {
    let xPos = [];
    let oPos = [];
    let allWiner = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
    squares.forEach((s,index) => {
      if (s === 'X') {
        xPos.push(index+1);
      } else if (s === 'O') {
        oPos.push(index+1);
      }
    });
    xPos = xPos.sort();
    oPos = oPos.sort();
    let L = allWiner.length-1;
    while(L>0) {
      let aw = allWiner[L];
      if(aw.every(as => xPos.indexOf(as)>-1)) {
        this.setState({
          winPos: aw,
          winner: 'X'
        });
        return 'X';
      }
      if (aw.every(as => oPos.indexOf(as)>-1)) {
        this.setState({
          winPos: aw,
          winner: 'O'
        });
        return 'O'
      }
      L--;
    }
    return void 0;
  }
  clickHistoryHandler(i) {
    let history = null;
    if (typeof i === 'number' && i>=0 && i<=this.state.history.length-1) {
      history = this.state.history[i];
      this.setState({
        squares: history
      });
    } else {
      history = Array(9).fill('');
      this.setState({
        squares: history,
        history: [],
        xIsNext: false,
        winPos: [],
        winner: ''
      });
    }
    arguments[1].stopPropagation();
    arguments[1].preventDefault();
  }
  clickHandler(i) {
    let xIsNext = this.state.xIsNext;
    let squares = this.state.squares.slice();
    let history = this.state.history.slice();
    if (squares[i] || this.calculateWinner(squares)) {
      return;
    }
    squares[i] = xIsNext ? 'O' : 'X';
    history.push(squares);
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      history: history
    });
    this.calculateWinner(squares);
  }
  render() {
    let status = `Winner:${this.state.winner}`;
    return (
      <div className="game-container">
        <div className="game-info">
          <a href="https://facebook.github.io/react/tutorial/tutorial.html" target="_blank" title="React Tutorial">React Tutorial</a>
        </div>
        <div className="game-main">
          <Board squares={this.state.squares} clickHandler={this.clickHandler} winPos={this.state.winPos}/>
          <GameHistory clickHistoryHandler={this.clickHistoryHandler} historyInfo={this.state.history} xIsNext={this.state.xIsNext} status={status}/>
        </div>
       </div>
     )
  }
}

export default Game;
