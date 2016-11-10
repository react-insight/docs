# 教程: 介绍React

## 我们要开发什么

今天，我们将构建一个交互式井字游戏。假定你已经熟悉html和javascript或者即使你之前从未使用过他们，但是按照下面的教程能够完成这个教程。

如果你想直接看最后的结果，你可以点击这个[演示地址](https://s.codepen.io/ericnakagawa/debug/ALxakj)来尝试玩这个游戏。你也可以点击游戏页面右侧链接，将游戏状态重置到某一刻，看移动之后，面板发生了什么。

## React是什么

React是一个用来构建用户界面的javascript框架，它使用声明式的语法，灵活且高效。

React中存在不同类型的组件，但是我们将从React.Component这个类开始说起：

```javascript
class ShoppingList extends React.Component {
    render() {
        return (
            <div className="shopping-list">
              <h1>Shopping list for {this.props.name}</h1>
            <ul>
             <li>Instagram</li>
             <li>WhatsApp</li>
             <li>Oculus</li>
            </ul>
            </div>
        );
    }
}
//使用方法： <ShoppingList name="Mark"/>
```

我们将在第二部分了解这些有趣的类xml标签。组件告诉React你想渲染什么－然后当数据变化时，react负责高效更新和渲染对应的组件。

上面的代码中，ShoppingList是一个React Component类，或者React Component 类型。一个组件获取props作为参数，然后通过render方法返回一个视图。

render方法返回你想渲染什么的描述，然后React使用这个描述并且渲染它到屏幕上。实际上，React返回一个React Element（一个轻量级的描述渲染什么的对象）。因为使用JSX可以很容易地编写react元素，所以大多数react开发者使用这种方式。

代码构建时，像<**div/**>将被转化为React.createElement('div')。上面的代码示例等同于下面：

```javascript
return React.createElement('div',{className: 'shopping-list'},
 React.createElement('h1',...),
 React.createElement('ul',...)
);
```

你可以在JSX中包裹任何javascript表达式。每一个React元素都是一个真正的javascript对象。你可以在你的程序中存储和引用他们。

这个ShoppingList组件仅渲染了dom元素。但是你可以很容易地组合自定义的React元素，如<**ShoppingList**/>这样.每一个组件是松散独立的，可以被单独执行。这些特性有助于你通过组合简单组件来构建复杂用户界面。

## 入门

从[Starter Code](facebook.github.io/react)这个例子开始。

它包含你现在开发所用的脚本。我们也提供了样式，你只需要关心javascript。

事实上，我们有三个组件：

+ Square
+ Board
+ Game

这个Square组件渲染一个<**div**>,这个Board组件渲染9个Square，然后这个Game组件渲染一个
Board组件和一些我们稍后添加的提示信息。此刻，所有组件都不能交互。（js文件最后也定义了一个叫calculateWinner的函数，我们稍后会使用它）

## 通过props传递数据

我们来简单尝试下，让我们从Board组件传递一些数据给Square组件。改变Board的renderSquare方法中，让其返回<**Square value={i}/>
然后通过用{this.props.value}取代{/**\*TODO\*/}改变Square的渲染方法

之前：

![](https://facebook.github.io/react/img/tutorial/tictac-empty.png)

之后，你已经看到在每一个方格上的输出结果。

 ![](https://facebook.github.io/react/img/tutorial/tictac-numbers.png)

##  交互组件

我们当鼠标点击Square组件时，Square组件会填充'X'。尝试改变Square函数中的render方法返回的标签：
```javascript
<button className="square" onClick={() => alert('click)}>
```
上面代码使用了新的es6箭头语法。你现在点击任何一个方格，浏览器都会给你一个弹窗。

React组件通过在构造函数中设置this.state可以拥有自己的私有状态。我们在状态中储存方格当前的值，当方格被点击后改变。
首先我们在类的构造函数中初始化这个状态：

```javascript
class Square extends React.Component {
    constructor() {
        super();
        this.state = {
            value: null
        }
    }
}
```
在类中，你需要调用super方法，super指的是父类的构造函数。

现在将render方法中的this.props.value改为this.state.value,并且改变事件处理方法为（）＝> this.setState({
    value: 'X'
}),而不是原来的alert。

```javascript
<button className="square" onClick={() => this.setState({value: 'X'}) }>{this.state.value}</button>
```

当this.setState被调用的时，组件更新被调用，同时更新和重新渲染它的所有后代。当组件重新渲染时，this.state.value将会变成'x'，你将在格子里面看到一个x.

你点击任何方格，X将会展示其上面。

## 开发者工具

[Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)和[Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)的React开发工具扩展让你能够在浏览器开发者界面来审查React组件树
![](https://facebook.github.io/react/img/tutorial/devtools.png)

使用它开发者能够审查React组件树的任何属性和状态。

由于[CodePen](codepen.io)有多个frame窗口，所以react开发者工具并不能工作。但是如果你已经登陆codepen并且确认了邮件，你可以去点击Change View切换到Debug并在新的页签中打开你的代码，然后开发者工具将会起作用。如果你现在不去做这个，那也没有问题，但是知道这种方法可行，也是不错的。

## 提升状态

我们现在为井字游戏构建了基本的块。但是现在状态分散在每个方格组件中。一个可用的游戏，需要轮流显示X和O在方格中，来检查你一个玩家是否赢得了比赛。
为了检查是否有人已经赢得了游戏，我们需要将9个方格中的值放到一个地方，而不是把它们分散放到各个方格组件中。

你也许认为可以让Board组件去查询每一个Square组件里面当前值是多少，虽然技术上这样是可行的，但是这样不被鼓励，因为它会使你的代码更难阅读，不健壮，也很难被重构。

相反，最好的方法是储存状态在Board组件中而不是Square组件中。Board组件可以告诉Square组件要显示什么，就像之前我们让每一个方格显示它的索引一样。

当你希望聚合来自多个孩子的数据或有两个子组件之间进行互相通信时，移动状态到父组件中。父组件可以通过props传递状态到子组件，因此子组件总是可以和父组件中的数据保持同步。

提升状态到上层组件是重构React组件时的常用的模式，让我们尝试一下。在Board组件中增加一个长度为9，值都为空的数组，来对应这9个方格。

```javascript
class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: Array(9).fill(null)
        }
    }
}
```
我们将稍后填充它。面板将变成下面这样：
```javascript
[
 'O',null,'X',
 'X','X','O',
 'O',null,null
]
```
将值向下传递给每个方格：
```javascript
renderSquare(i) {
    return <Square value={this.state.squares[i]}/>
}
```

改变Square，再次使用this.props.value。现在我们需要当Square被点击时，我们可以改变它的值。Board组件现在存储每个Square被填充的值。这意味着我们需要一些方法来让Square来更新Board的值。因为组件的状态是私有的，我们不能够让Square
直接更新Board的状态。常用的模式是让Board传递一个回调给Square。当Square被点击时，这个回调被调用，来改变Board中的状态。
再次修改renderSquare方法：
```javascript
return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>
```
现在我们从Board组件中传递value和onClick两个属性给Square。后者是Square可以调用的函数。改变Square中的render方法来实现：
```javascript
<button className="square" onClick={() => this.props.onClick()}>
```

这意味着当方格被点击时，它会调用父组件传进来的onClick函数。在这里onClick函数没有什么特殊的含义。一般事件处理props都会以on和handle来命名。尝试点击一个方格，你应该会看到一个错误，因为我们没有定义handleClick函数。向面板组件中增加这个方法：
```javascript
handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({
        squares: squares
    });
}
```
我们调用slice方法来拷贝squares而不是直接操作已存在的数组。跳到[下一部分](https://facebook.github.io/react/tutorial/tutorial.html#why-immutability-is-important)去了解为什么不可改变的重要性。

现在你应该能够点击方格再次填充它们，但是这个状态是被存在Board组件中而不是每一个Square组件中，让我们来继续构建这个游戏。注意无论面板状态何时改变，这些方格组件都会自动渲染。

Square组件不再保留自己的状态，它会从它的父组件Board中获取自己的值并且当被点击时通知父组件执行相应的回调。我们叫这些组件为受控组件。


## 为什么不可变是重要的