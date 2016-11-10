import React, {Component} from 'react';
import './square.css'
class Square extends Component {
  render() {
    return (
      <div className={`game-square${this.props.hightColor ? ' game-squareHight' : ''}`} onClick={this.props.clickHandler}>{this.props.cnt}</div>
    );
  }
}

export default Square
