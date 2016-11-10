import React, { PureComponent }from 'react';
import Square from '../square';
import './board.css';
class Board extends PureComponent {
  isHightColor(pos) {
    return this.props.winPos.length === 3 && this.props.winPos.indexOf(pos)>-1;
  }
  genSquares() {
    return this.props.squares.map((sq,index) => { return (<Square hightColor={this.isHightColor(index+1)} clickHandler={this.props.clickHandler.bind(this,index)} key={index} cnt={sq}/>)});
  }
  render() {
    return (<div className="game-board">
    {this.genSquares()}
    </div>)
  }
}

export default Board;
